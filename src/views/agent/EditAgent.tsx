import * as React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
  Box,
  CircularProgress,
} from '@mui/material';
import parishService from 'src/services/parish.service';
import useForm from 'src/@core/hooks/useForm';
import { agentValidate } from 'src/helpers/validations';
import { clippingParents } from '@popperjs/core';

const useStyle = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

const EditAgent = ({
  open,
  handleClose,
  handleSubmit,
  data,
  loading,
}: any): JSX.Element => {
  const classes = useStyle();

  const [allParishs, setAllParishs] = React.useState<any>([]);
  const [selectedParishTown, setSelectedParishTown] = React.useState<any>([]);

  const [formData, setFormData] = React.useState<any>({});

  React.useEffect(() => {
    setFormData({
      agentName: data?.agentName,
      parish: data?.address?.parish,
      town: data?.address?.town,
      latitude: data?.coordinates?.latitude,
      longitude: data?.coordinates?.longitude,
    });
  }, [data]);

  React.useEffect(() => {
    getParish();
  }, []);

  React.useEffect(() => {
    allParishs?.map?.((item) => {
      if (item?.parishName === data?.address?.parish) {
        setSelectedParishTown([...item.towns]);
      }
    });
  }, [JSON.stringify(allParishs), JSON.stringify(data)]);

  const getParish = async () => {
    const data1 = data;
    const res: any = await parishService.getParishs();
    if (res) {
      setAllParishs([...res]);
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
      setFormData({
        ...formData,
        ...updatedValue,
        town: ''
      })
      allParishs?.map?.((item) => {
        if (item?.parishName === value) {
          setSelectedParishTown([...item.towns]);
        }
      });
    }
  };

  const onEditClick = () => {
    const setDataForPost = Object.assign({}, formData, values);
    handleSubmit(setDataForPost);
  };
  
  const handleCancel = () => {
    onCancel();
    handleClose();
  }
  
  const { values, errors, handleChange, handleSubmitEdit, onCancel } = useForm(
    onEditClick,
    agentValidate,
    formData,
  );


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Edit Agent</DialogTitle>
        <br />
        <DialogContent>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Agent Name"
              variant="outlined"
              defaultValue={data.agentName}
              name="agentName"
              required
              error={errors.agentName ? true : false}
              helperText={errors.agentName && errors.agentName}
              // onChange={(e: any) => onChange('agentName', e.target.value)}
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="form-layouts-separator-select-label">
              Parish Name
            </InputLabel>
            <Select
              label="Parish Name"
              name="parish"
              required
              defaultValue={data?.address?.parish}
              onChange={(event: any) =>
                onChange('parish', event?.target?.value)
              }
              input={<OutlinedInput label="Select Parish" />}>
              {allParishs.map((item, index) => (
                <MenuItem key={index} value={item?.parishName}>
                  {item.parishName}
                </MenuItem>
              ))}
            </Select>
            {errors.parish && (
              <FormHelperText error={errors.parish ? true : false}>
                {errors.parish}
              </FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="form-layouts-separator-select-label">
              Select Town
            </InputLabel>
            <Select
              label="Select Town"
              name="town"
              required
              defaultValue={data?.address?.town}
              onChange={(event: any) => onChange('town', event?.target?.value)}
              input={<OutlinedInput label="Select Town" />}>
              {selectedParishTown.map((item, index) => (
                <MenuItem key={index} value={item?.townName}>
                  {item.townName}
                </MenuItem>
              ))}
            </Select>
            {errors.town && (
              <FormHelperText error={errors.town ? true : false}>
                {errors.town}
              </FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Latitude"
              variant="outlined"
              name="latitude"
              required
              error={errors.latitude ? true : false}
              defaultValue={data.coordinates && data.coordinates.latitude}
              helperText={errors.latitude && errors.latitude}
              onChange={handleChange}
              // onChange={(e: any) => onChange('latitude', e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Longitude"
              variant="outlined"
              name="longitude"
              required
              error={errors.longitude ? true : false}
              defaultValue={data.coordinates && data.coordinates.longitude}
              helperText={errors.longitude && errors.longitude}
              // onChange={(e: any) => onChange('longitude', e.target.value)}
              onChange={handleChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          {loading ? (
            <Box>
              <CircularProgress
                sx={{
                  display: 'flex',
                  margin: '0px 20px 0px 20px',
                }}
                size={20}
              />
            </Box>
          ) : (
            <Button onClick={handleSubmitEdit}>Update</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditAgent;
