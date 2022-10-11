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
import { feedbackValidate } from 'src/helpers/validations';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

function EditFeedback({ open, handleClose, handleSubmit, data, loading }: any) {
  
  const classes = useStyles();
  // const [formData, setFormData] = React.useState<any>(data);
  
  // const onChange = (field: any, value: any) => {
  //   let updatedValue = {};
  //   updatedValue = { [field]: value };
  //   setFormData((formData: any) => ({
  //     ...formData,
  //     ...updatedValue,
  //   }));
  // };

  const submit = () => {
    handleSubmit(Object.assign({}, data, values))
  }

  const {values, errors, handleChange, handleSubmitEdit, onCancel} = useForm(
      submit,
      feedbackValidate,
      data
  )

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
        <DialogTitle>Edit Category</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              defaultValue={data.title}
              // onChange={(e: any) => onChange('title', e.target.value)}
              name="title"
              required
              onChange={handleChange}
              error={errors.title ? true : false}
              helperText={errors.title && errors.title}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              defaultValue={data.email}
              name="email"
              required
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email}
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

export default EditFeedback;
