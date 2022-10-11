import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { TextField } from '@mui/material';
import useForm from '../../@core/hooks/useForm';
import { userValidate } from '../../helpers/validations';

const useStyle = makeStyles({
  dialogPaper: {
    minHeight: '40vh',
    maxHeight: '40vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

const EditUser = ({ open, handleClose, onSubmit, data }: any): JSX.Element => {
  const classes = useStyle();
  const [formData, setFormData] = React.useState<any>({
    name: data.name,
    email: data.email,
    // role: data.role,
  });

  const onEditClick = () => {
    const setDataForPost = Object.assign({}, data, values);
    onSubmit(setDataForPost);
  };

  const handleCancel = () => {
    onCancel()
    handleClose()
  }

  const { values, errors, handleChange, handleSubmitEdit, onCancel } = useForm(
    onEditClick,
    userValidate,
    data,
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Edit User</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              required
              error={errors.name ? true : false}
              helperText={errors.name && errors.name}
              defaultValue={data.name}
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmitEdit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditUser;
