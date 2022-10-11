import * as React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Button,
  TextField,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import useForm from 'src/@core/hooks/useForm';
import { menuValidate } from 'src/helpers/validations';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '50vh',
    maxHeight: '50vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

function AddMenuCard({ open, handleClose, onSubmit, loading }: any) {
  const classes = useStyles();
  const [type, changeType] = React.useState<string>('');

  const submit = () => {
    values.type = type;
    onSubmit(values);
  };

  const { values, errors, handleChange, handleSubmit, onCancel } = useForm(
    submit,
    menuValidate,
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
        <DialogTitle>Add Menu Card</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Card Name"
              variant="outlined"
              name="cardName"
              onChange={handleChange}
              required
              error={errors.cardName ? true : false}
              helperText={errors.cardName && errors.cardName}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="form-layouts-separator-select-label">
              Type
            </InputLabel>
            <Select
              label="Type"
              defaultValue=""
              id="form-layouts-separator-select"
              labelId="form-layouts-separator-select-label"
              name="type"
              onChange={(e: any) => changeType(e.target.value)}>
              <MenuItem value="Shortcuts">Shortcuts</MenuItem>
              <MenuItem value="TopPicks">TopPicks</MenuItem>
              <MenuItem value="General">General</MenuItem>
            </Select>
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
            <Button onClick={handleSubmit}>Add</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddMenuCard;
