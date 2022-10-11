import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { TextField, Box, CircularProgress } from '@mui/material';
import useForm from 'src/@core/hooks/useForm';
import { countryValidate } from 'src/helpers/validations';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px',
  width: '45%',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  margin: '20px 0 20px 0',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

function EditCountry({
  open,
  handleClose,
  onSubmit,
  data,
  getRootProps,
  getInputProps,
  file,
  loading,
}: any) {
  const classes = useStyles();

  const [formData, setFormData] = React.useState<any>({});

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  const renderImage = () => {
    if (file.length > 0) {
      return (
        <>
          {file.map((item) => (
            <img src={item.preview} width={50} height={50} />
          ))}
        </>
      );
    } else if (file.length === 0 && data.flag) {
      return <img src={data.flag} width={50} height={50} />;
    } else {
      return <p style={{ color: '#bdbdbd' }}>No Flag Icon added</p>;
    }
  };

  const submit = () => {
    onSubmit(values);
  }

  const {values, errors, handleChange, handleSubmitEdit, onCancel} = useForm(
    submit,
    countryValidate,
    data
  );

  const handleCancel = () => {
    onCancel()
    handleClose()
  }
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Edit Country</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Country Name"
              variant="outlined"
              name="countryName"
              defaultValue={data?.countryName}
              required
              error={errors.countryName ? true : false}
              helperText={errors.countryName && errors.countryName}
              onChange={handleChange}
              // onChange={(e: any) => onChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Country Code"
              variant="outlined"
              name="countryCode"
              defaultValue={data?.countryCode}
              required
              error={errors.countryCode ? true : false}
              helperText={errors.countryCode && errors.countryCode}
              onChange={handleChange}
              // onChange={(e: any) => onChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={baseStyle} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Click here to select Flag</p>
            </div>
            <div style={{ marginLeft: 20 }}>{renderImage()}</div>
          </div>
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Phone Prefix"
              variant="outlined"
              name="phonePrefix"
              defaultValue={data?.phonePrefix}
              required
              error={errors.phonePrefix ? true : false}
              helperText={errors.phonePrefix && errors.phonePrefix}
              onChange={handleChange}
              // onChange={(e: any) => o
              // onChange={(e: any) => onChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Currency"
              variant="outlined"
              name="currency"
              defaultValue={data?.currency}
              required
              error={errors.currency ? true : false}
              helperText={errors.currency && errors.currency}
              onChange={handleChange}
              // onChange={(e: any) => onChange(e.target.name, e.target.value)}
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
}

export default EditCountry;
