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
  FormControlLabel,
  FormLabel,
  Checkbox,
} from '@mui/material';

// const numberTypes1 = [{ numberType: 'Postpaid' }, { numberType: 'Prepaid' }];
// const billTypes1 = [{ billType: 'Topups' }, { billType: 'Plans' }];

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

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '95vh',
    maxHeight: '95vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

function AddTopup({
  open,
  handleClose,
  handleSubmit,
  getRootProps,
  getInputProps,
  file,
  loading,
}: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>({
    operatorName: '',
    productId: '',
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
    } else if (file.length === 0 && formData.categoryIcon) {
      return <img src={formData.categoryIcon} width={50} height={50} />;
    } else {
      return <p style={{ color: '#bdbdbd' }}>No Topup Icon added</p>;
    }
  };

  const submit = () => {
    const data = {
      ...formData,
    };

    data.numberTypes = [];
    data.billTypes = [];

    if (formData.postpaid) {
      data.numberTypes.push({ numberType: 'Postpaid' });
    }

    if (formData.prepaid) {
      data.numberTypes.push({ numberType: 'Prepaid' });
    }

    if (formData.topups) {
      data.billTypes.push({ numberType: 'Topups' });
    }

    if (formData.plans) {
      data.billTypes.push({ numberType: 'Plans' });
    }

    handleSubmit(data);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Add Topup</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Operator Name"
              variant="outlined"
              name="operatorName"
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
              label="product ID"
              variant="outlined"
              name="productId"
              onChange={(e: any) => {
                onChange(e.target.name, e.target.value);
              }}
            />
          </FormControl>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={baseStyle} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Click here to select Icon</p>
            </div>
            <div style={{ marginLeft: 20 }}>{renderImage()}</div>
          </div>
          <br />
          <div>
            <FormLabel>Number Types</FormLabel>
          </div>
          <FormControlLabel
            value="PostPaid"
            control={
              <Checkbox
                onChange={(e: any) => {
                  onChange('postpaid', e.target.checked);
                }}
                name="PostPaid"
              />
            }
            label="Postpaid"
            labelPlacement="end"
          />
          <FormControlLabel
            value="Prepaid"
            control={
              <Checkbox
                onChange={(e: any) => {
                  onChange('prepaid', e.target.checked);
                }}
                name="Prepaid"
              />
            }
            label="Prepaid"
            labelPlacement="end"
          />
          <br />
          <br />
          <div>
            <FormLabel>Bill Types</FormLabel>
          </div>
          <FormControlLabel
            value="Topups"
            control={
              <Checkbox
                onChange={(e: any) => {
                  onChange('topups', e.target.checked);
                }}
                name="Topups"
              />
            }
            label="Topups"
            labelPlacement="end"
          />
          <FormControlLabel
            value="Plans"
            control={
              <Checkbox
                onChange={(e: any) => {
                  onChange('plans', e.target.checked);
                }}
                name="Plans"
              />
            }
            label="Plans"
            labelPlacement="end"
          />
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
              onClick={submit}>
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTopup;
