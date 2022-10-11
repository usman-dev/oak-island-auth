import * as React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Box,
  CircularProgress,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '95vh',
    maxHeight: '95vh',
    minWidth: '100vh',
    maxWidth: '100vh',
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

function AddBillCompany({
  open,
  handleClose,
  handleSubmit,
  loading,
  getRootProps,
  getInputProps,
  file,
}: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>({
    companyName: '',
    billShortCode: '',
    paymentType: '',
    referenceNumberLength: '',
  });

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
    } else {
      return <p style={{ color: '#bdbdbd' }}>No Icon added</p>;
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Add Bill Company</DialogTitle>
        <br />
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              name="companyName"
              onChange={(e: any) => {
                onChange(e.target.name, e.target.value);
              }}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Short Code"
              variant="outlined"
              name="billShortCode"
              onChange={(e: any) => {
                onChange(e.target.name, e.target.value);
              }}
            />
          </FormControl>
          <br />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={baseStyle} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Click here to select Icon</p>
            </div>
            <div style={{ marginLeft: 20 }}>{renderImage()}</div>
          </div>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Reference Number Length"
              variant="outlined"
              name="referenceNumberLength"
              onChange={(e: any) => {
                onChange(e.target.name, e.target.value);
              }}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="form-layouts-separator-select-label">
              Payment Type
            </InputLabel>
            <Select
              label="Payment Type"
              defaultValue=""
              id="form-layouts-separator-select"
              labelId="form-layouts-separator-select-label"
              name="paymentType"
              onChange={(e: any) => onChange(e.target.name, e.target.value)}>
              <MenuItem value="PARTIAL">Partial</MenuItem>
              <MenuItem value="FULL">Full</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
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
            <Button
              disabled={
                formData.companyName == '' ||
                formData.billShortCode == '' ||
                formData.paymentType == ''
              }
              onClick={() => {
                handleSubmit(formData);
              }}>
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddBillCompany;
