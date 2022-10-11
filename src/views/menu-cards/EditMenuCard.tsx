import * as React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { menuValidate } from 'src/helpers/validations';
import useForm from 'src/@core/hooks/useForm';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '50vh',
    maxHeight: '50vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

function EditMenuCard({ open, handleClose, handleSubmit, data, loading }: any) {
  const classes = useStyles();
  const [type, changeType] = React.useState<string>(data?.type);

  React.useEffect(() => {
    changeType(data?.type);
  }, [data]);

  const submit = () => {
    values.type = type;
    handleSubmit(values);
  };

  const { values, errors, handleChange, handleSubmitEdit, onCancel } = useForm(
    submit,
    menuValidate,
    data,
  );

  const handleCancel = () => {
    onCancel();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Edit Menu Card</DialogTitle>
        <br />
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Card Name"
              variant="outlined"
              name="cardName"
              defaultValue={data.cardName}
              onChange={handleChange}
              required
              error={errors.cardName ? true : false}
              helperText={errors.cardName && errors.cardName}
            />
          </FormControl>
          <br />
          <br />
          {data?.type === 'InviteList' ||
          data?.type === 'BillCategory' ||
          data?.type === 'PaymentList' ||
          data?.type === 'Banners' ||
          data?.type === 'Wallet' ||
          data?.type === 'BillingList' ? (
            ''
          ) : (
            <FormControl fullWidth>
              <InputLabel id="form-layouts-separator-select-label">
                Type
              </InputLabel>
              <Select
                label="Type"
                defaultValue={data?.type}
                id="form-layouts-separator-select"
                labelId="form-layouts-separator-select-label"
                name="type"
                onChange={(e: any) => changeType(e.target.value)}>
                <MenuItem value="Shortcuts">Shortcuts</MenuItem>
                <MenuItem value="TopPicks">TopPicks</MenuItem>
                <MenuItem value="General">General</MenuItem>
              </Select>
            </FormControl>
          )}
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

export default EditMenuCard;
