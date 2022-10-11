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
import { Box, CircularProgress, TextField } from '@mui/material';
import TextEditor from 'src/@core/components/text-editor/TextEditor';
import useForm from 'src/@core/hooks/useForm';
import { categoryValidate } from 'src/helpers/validations';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

function AddFaqCategory({ open, handleClose, onSubmit, loading }: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>({
    categoryName: '',
  });

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  const submit = () => {
    onSubmit(values)
  }

  const {values, errors, handleChange, handleSubmit, onCancel} = useForm(
    submit,
    categoryValidate
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
        <DialogTitle>Add FAQ Category</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              onChange={handleChange}
              name="categoryName"
              required
              error={errors.categoryName ? true : false}
              helperText ={errors.categoryName && errors.categoryName}
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
            <Button onClick={handleSubmit}>Add</Button>
          )}
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddFaqCategory;
