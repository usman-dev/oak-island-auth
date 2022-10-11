// ** MUI Imports
import {
  Grid,
  Card,
  TextField,
  FormControl,
  DialogActions,
  Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Authenticated from 'src/@core/components/Authenticated';
import { usersService } from 'src/services';
import useForm from '../../@core/hooks/useForm';
import { userValidate } from '../../helpers/validations';
import { AuthContext } from 'src/context/auth/AuthContext';
// import EyeOutline from 'mdi-material-ui/EyeOutline';
// import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
// import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';

const AddAgent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    // password: '',
    // role: '',
  });
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  user?.role != 'SUPER_ADMIN' && router.back();

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  const onSubmit = async () => {
    setLoading(true);
    const data = await usersService.addUser(values);

    if (data) {
      // toast({ type: 'success', message: 'User added successfuly!' });
      router.push('/users');
    }
    setLoading(false);
  };

  const { values, errors, handleChange, handleSubmit, onCancel } = useForm(
    onSubmit,
    userValidate,
  );

  const [showPassword, setShowPassword] = useState(false);

  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleMouseDownPassword = (event: any) => {
  //   event.preventDefault();
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ p: 4 }}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  name="name"
                  variant="outlined"
                  required
                  error={errors.name ? true : false}
                  helperText={errors.name && errors.name}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                required
                error={errors.email ? true : false}
                helperText={errors.email && errors.email}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <br />
          <Grid container spacing={6}>
            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="auth-login-password">Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  required
                  // value={values.password}
                  id="auth-login-password"
                  // onChange={(e) => setPassword(e.target.value)}
                  onChange={(e: any) => onChange('password', e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label="toggle password visibility">
                        {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid> */}
            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="form-layouts-separator-select-label">
                  Role
                </InputLabel>
                <Select
                  label="Rating"
                  defaultValue=""
                  id="form-layouts-separator-select"
                  labelId="form-layouts-separator-select-label"
                  onChange={(e: any) => onChange('role', e.target.value)}>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
          </Grid>
          <br />
          <Grid container spacing={6}>
            <DialogActions>
              <Button
                onClick={() => {
                  onCancel();
                  router.push('/users');
                }}>
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={handleSubmit}>
                Add
              </LoadingButton>
            </DialogActions>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Authenticated(AddAgent);
