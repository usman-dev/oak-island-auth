import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { TextField, Box, CircularProgress, Grid } from '@mui/material';
import { voucherValidate } from 'src/helpers/validations';
import useForm from 'src/@core/hooks/useForm';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

function EditVoucher({ open, handleClose, onSubmit, data, loading }: any) {
  const classes = useStyles();
  const [focusFrom, setFocusedFrom] = useState(false);
  const [focusTo, setFocusedTo] = useState(false);
  const [formData, setFormData] = React.useState<any>({});
  const onFocusFrom = () => setFocusedFrom(true);
  const onBlurFrom = () => setFocusedTo(false);
  const onFocusTo = () => setFocusedTo(true);
  const onBlurTo = () => setFocusedTo(false);

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  const submit = () => {
    const editData = Object.assign({}, data, values);
    onSubmit(editData);
  };

  const {values, errors, handleChange, handleSubmitEdit, onCancel} = useForm(
    submit,
    voucherValidate,
    data
  );

  const handleCancel = () => {
    onCancel();
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Edit Voucher</DialogTitle>
        <DialogContent>
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Campaign Name"
              variant="outlined"
              name="campaignName"
              defaultValue={data.campaignName}
              required
              onChange={handleChange}
              error={errors.campaignName?true:false}
              helperText={errors.campaignName && errors.campaignName}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Campaign Code"
              variant="outlined"
              name="campaignCode"
              defaultValue={data.campaignCode}
              required
              onChange={handleChange}
              error={errors.campaignCode?true:false}
              helperText={errors.campaignCode && errors.campaignCode}
            />
          </FormControl>
          <br />
          <br />
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Voucher Valid From"
                  name="campaignStartDate"
                  type={focusFrom ? 'date' : 'text'}
                  defaultValue={new Date(
                    data.campaignStartDate,
                  ).toLocaleDateString('en-CA')}
                  onFocus={onFocusFrom}
                  onBlur={onBlurFrom}
                  required
                  onChange={handleChange}
                  error={errors.campaignStartDate?true:false}
                  helperText={errors.campaignStartDate && errors.campaignStartDate}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Voucher Valid To"
                  name="campaignEndDate"
                  variant="outlined"
                  type={focusTo ? 'date' : 'text'}
                  defaultValue={new Date(
                    data.campaignEndDate,
                  ).toLocaleDateString('en-CA')}
                  onFocus={onFocusTo}
                  onBlur={onBlurTo}
                  required
                  onChange={handleChange}
                  error={errors.campaignEndDate?true:false}
                  helperText={errors.campaignEndDate && errors.campaignEndDate}
                />
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Bonus Amount"
              type="number"
              variant="outlined"
              name="bonusAmount"
              defaultValue={data.bonusAmount}
              required
              onChange={handleChange}
              error={errors.bonusAmount?true:false}
              helperText={errors.bonusAmount && errors.bonusAmount}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Budget Amount"
              type="number"
              variant="outlined"
              name="campaignTotalBudget"
              defaultValue={data.campaignTotalBudget}
              required
              onChange={handleChange}
              error={errors.campaignTotalBudget?true:false}
              helperText={errors.campaignTotalBudget && errors.campaignTotalBudget}
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

export default EditVoucher;
