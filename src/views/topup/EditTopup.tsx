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
  FormControlLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormLabel,
} from '@mui/material';

const numberTypes1 = [{ numberType: 'Postpaid' }, { numberType: 'Prepaid' }];
const billTypes1 = [{ billType: 'Topups' }, { billType: 'Plans' }];

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

function EditTopup({
  open,
  handleClose,
  handleSubmit,
  getRootProps,
  getInputProps,
  file,
  loading,
  data,
}: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>({
    operatorName: data.operatorName,
    productId: data.productId,
  });
  const [numberTypes, setNumberTypes] = React.useState<any>(data.numberTypes);
  const [billTypes, setBillTypes] = React.useState<any>(data.billTypes);

  React.useEffect(() => {
    if (data) {
      setFormData({
        operatorName: data.operatorName,
        productId: data.productId,
        postpaid: !!data.numberTypes?.find(
          (dat) => dat.numberType === 'Postpaid',
        ),
        prepaid: !!data.numberTypes?.find(
          (dat) => dat.numberType === 'Prepaid',
        ),
        topups: !!data.billTypes?.find((dat) => dat.billType === 'Topups'),
        plans: !!data.billTypes?.find((dat) => dat.billType === 'Plans'),
      });
      setNumberTypes(data.numberTypes);
      setBillTypes(data.billTypes);
    }
  }, [JSON.stringify(data)]);

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  const submit = () => {
    const setData = {
      ...formData,
    };

    setData.numberTypes = [];
    setData.billTypes = [];

    if (formData.postpaid) {
      setData.numberTypes.push({ numberType: 'Postpaid' });
    }

    if (formData.prepaid) {
      setData.numberTypes.push({ numberType: 'Prepaid' });
    }

    if (formData.topups) {
      setData.billTypes.push({ billType: 'Topups' });
    }

    if (formData.plans) {
      setData.billTypes.push({ billType: 'Plans' });
    }

    handleSubmit(setData);
  };

  const renderImage = () => {
    if (file.length > 0) {
      return (
        <>
          {file.map((item) => (
            <img
              src={item.preview}
              width={100}
              height={100}
              className="imageFit"
            />
          ))}
        </>
      );
    } else if (file.length === 0 && data.image) {
      return (
        <img src={data.image} width={100} height={100} className="imageFit" />
      );
    } else {
      return <p style={{ color: '#bdbdbd' }}>No Topup Icon added</p>;
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Edit Topup</DialogTitle>
        <DialogContent>
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Operator Name"
              variant="outlined"
              name="operatorName"
              defaultValue={data.operatorName}
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
              defaultValue={data.productId}
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
                defaultChecked={
                  !!data.numberTypes?.find(
                    (dat) => dat.numberType === 'Postpaid',
                  )
                }
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
                defaultChecked={
                  !!data.numberTypes?.find(
                    (dat) => dat.numberType === 'Prepaid',
                  )
                }
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
                defaultChecked={
                  !!data.billTypes?.find((dat) => dat.billType === 'Topups')
                }
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
                defaultChecked={
                  !!data.billTypes?.find((dat) => dat.billType === 'Plans')
                }
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
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditTopup;
