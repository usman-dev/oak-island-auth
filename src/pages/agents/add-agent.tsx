import { useCallback, useEffect, useState } from 'react';
// ** MUI Imports
import {
  Grid,
  Card,
  TextField,
  FormControl,
  Select,
  InputLabel,
  DialogActions,
  Button,
  OutlinedInput,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';
import Script from 'next/script';
import Authenticated from 'src/@core/components/Authenticated';
import toast from 'src/@core/components/Toast';
import { agentService } from 'src/services';
import parishService from 'src/services/parish.service';
import useForm from 'src/@core/hooks/useForm';
import { agentValidate } from 'src/helpers/validations';

const AddAgent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    // agentId: '',
    agentName: '',
    parish: '',
    town: '',
    latitude: null,
    longitude: null,
  });
  const [allParishs, setAllParishs] = useState<any>([]);
  const [selectedParishTown, setSelectedParishTown] = useState<any>([]);

  const [loading, setLoading] = useState(false);
  // const notify = useCallback((type, message) => {
  //   toast({ type, message });
  // }, []);

  useEffect(() => {
    getParish();
  }, []);

  const getParish = async () => {
    const data: any = await parishService.getParishs();
    if (data) {
      setAllParishs([...data]);
    }
  };

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));

    if (field === 'parish') {
      allParishs?.map?.((item) => {
        if (item?.parishName === value) {
          setSelectedParishTown([...item.towns]);
        }
      });
    }
  };

  const submit = async () => {
    setLoading(true);
    const postData = Object.assign({}, formData, values);
    const data = await agentService.addAgent(postData);

    if (data) {
      // toast({ type: 'success', message: 'Agent added successfuly!' });
      router.push('/agents');
    }
    setLoading(false);
  };

  const { values, errors, handleChange, handleSubmit, onCancel } = useForm(
    submit,
    agentValidate,
    formData
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ p: 4 }}>
          <Grid container spacing={6}>
            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Bank ID"
                  variant="outlined"
                  required
                  onChange={(e: any) => onChange('bankId', e.target.value)}
                />
              </FormControl>
            </Grid> */}
            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Agent ID"
                  variant="outlined"
                  onChange={(e: any) => onChange('agentId', e.target.value)}
                />
              </FormControl>
            </Grid> */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Agent Name"
                  variant="outlined"
                  name="agentName"
                  required
                  error={errors.agentName ? true : false}
                  // onChange={(e: any) => onChange('agentName', e.target.value)}
                  onChange={handleChange}
                  helperText={errors.agentName && errors.agentName}
                />
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="form-layouts-separator-select-label">
                  Parish Name
                </InputLabel>
                <Select
                  label="Parish Name"
                  name="parish"
                  onChange={(event: any) =>
                    onChange('parish', event?.target?.value)
                  }
                  error={errors.parish ? true : false}
                  required
                  // helperText={errors.parish && errors.parish}
                  // onChange={handleChange}
                  input={<OutlinedInput label="Select Parish" />}>
                  {allParishs.map((item, index) => (
                    <MenuItem key={index} value={item?.parishName}>
                      {item.parishName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={errors.parish ? true : false}>
                  {errors.parish && errors.parish}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="form-layouts-separator-select-label">
                  Select Town
                </InputLabel>
                <Select
                  label="Select Town"
                  name="town"
                  onChange={(event: any) =>
                    onChange('town', event?.target?.value)
                  }
                  
                  error={errors.town ? true : false}
                  required
                  // helperText={errors.town && errors.town}
                  // onChange={handleChange}
                  input={<OutlinedInput label="Select Town" />}>
                  {selectedParishTown.map((item, index) => (
                    <MenuItem key={index} value={item?.townName}>
                      {item.townName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={errors.town ? true : false}>
                  {errors.town && errors.town}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <br />
          <Grid container spacing={6}>
            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Full Address"
                  variant="outlined"
                  onChange={(e: any) => onChange('fullAddress', e.target.value)}
                />
              </FormControl>
            </Grid> */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Lat"
                  variant="outlined"
                  name="latitude"
                  type="number"
                  required
                  error={errors.latitude ? true :false}
                  helperText={errors.latitude && errors.latitude}
                  onChange={handleChange}
                  // onChange={(e: any) => onChange('latitude', e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <br />
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Long"
                  name="longitude"
                  variant="outlined"
                  type="number"
                  required
                  error={errors.longitude ? true :false}
                  helperText={errors.longitude && errors.longitude}
                  onChange={handleChange}
                  // onChange={(e: any) => onChange('longitude', e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

          {/* <br />
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Long"
                  variant="outlined"
                  type="number"
                  onChange={(e: any) => onChange('longitude', e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid> */}

          {/* <Grid container spacing={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="form-layouts-separator-select-label">
                  Rating
                </InputLabel>
                <Select
                  label="Rating"
                  defaultValue=""
                  id="form-layouts-separator-select"
                  labelId="form-layouts-separator-select-label"
                  onChange={(e: any) => onChange('rating', e.target.value)}>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid> */}
          <br />
          <Grid container spacing={6}>
            <DialogActions>
              <Button
                onClick={() => {
                  onCancel()
                  router.push('/agents');
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
