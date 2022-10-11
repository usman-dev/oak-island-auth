// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';

// ** Next Imports
import { useRouter } from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import LoadingButton from '@mui/lab/LoadingButton';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
// import InputAdornment from '@mui/material/InputAdornment';
// import MuiFormControlLabel, {
//   FormControlLabelProps,
// } from '@mui/material/FormControlLabel';

// // ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline';
// import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Configs
// import themeConfig from 'src/configs/themeConfig';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import userService from 'src/services/user.service';
import useForm from 'src/@core/hooks/useForm';
import { resetPasswordValidate } from 'src/helpers/validations';
import { FormHelperText } from '@mui/material';
// import { toast } from 'react-toastify';
// import { isNullOrUndefined } from 'util';

interface State {
  // code: string;
  // email: string;
  // confirmPassword: string;
  // password: string;
  password: boolean;
  confirmPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
}));

const StyledImage = styled('img')({
  objectFit: 'contain',
  height: '70px',
});

const ResetPassword = () => {
  // ** State
  const [isShow, setIsShow] = useState<State>({
    // code: '',
    // email: '',
    // confirmPassword: '',
    // password: '',
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setLoading] = useState(false);

  // ** Hook
  const router = useRouter();
  // const { email } = router.query;
  // const [matchError, setMatchError] = useState(false);

  // const handleChange =
  //   (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };

  const handleClickShowPassword = () => {
    setIsShow({ ...isShow, password: !isShow.password });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setIsShow({ ...isShow, confirmPassword: !isShow.confirmPassword });
  };

  const resetAction = async () => {
    // if (values.password != values.confirmPassword) {
    //   setMatchError(true);
    // } else {
    // const obj = {
    //   code: values.code,
    //   confirmPassword: values.confirmPassword,
    //   newPassword: values.newPassword,
    //   email,
    // };

    setLoading(true);

    const data = await userService.resetPassword(values);

    if (data) {
      router.push('/login');
    }
    setLoading(false);
    // }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    resetAction,
    resetPasswordValidate,
  );

  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <StyledImage src="https://mycash.ws/template/files/images/logo.png" />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Reset Password
            </Typography>
            <Typography variant="body2">
              {/* Please sign-in to your account and start the adventure */}
            </Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id="otp"
              label="OTP"
              sx={{ marginBottom: 4 }}
              name="code"
              required
              error={errors?.code ? true : false}
              helperText={errors?.code && errors?.code}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              fullWidth
              id="email"
              label="Email"
              sx={{ marginBottom: 4 }}
              name="email"
              required
              error={errors?.email ? true : false}
              helperText={errors?.email && errors?.email}
              onChange={handleChange}
            />
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={values.password}
                id="auth-login-password"
                name="password"
                required
                error={errors?.password ? true : false}
                onChange={handleChange}
                type={isShow.password ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility">
                      {isShow.password ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors?.password && (
                <FormHelperText error={errors?.password ? true : false}>
                  {errors?.password}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor="auth-login-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                label="Confirm Password"
                value={values.confirmPassword}
                id="auth-login-password"
                name="confirmPassword"
                required
                error={errors?.confirmPassword ? true : false}
                onChange={handleChange}
                type={isShow.confirmPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility">
                      {isShow.confirmPassword ? (
                        <EyeOutline />
                      ) : (
                        <EyeOffOutline />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors?.confirmPassword && (
                <FormHelperText error={errors?.confirmPassword ? true : false}>
                  {errors?.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>
            {/* {matchError ? (
              <div style={{ color: 'red', marginBottom: '5px' }}>
                Passwords Must Be Matching
              </div>
            ) : null} */}

            <LoadingButton
              fullWidth
              loading={isLoading}
              size="large"
              variant="contained"
              sx={{ marginBottom: 4 }}
              onClick={handleSubmit}>
              Reset
            </LoadingButton>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 4 }}
              onClick={() => {
                router.push('/login');
              }}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};

ResetPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);

export default ResetPassword;
