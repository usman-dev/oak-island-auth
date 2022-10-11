import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { Box, CircularProgress, TextField } from '@mui/material';
import { secretQuesValidate } from 'src/helpers/validations';
import useForm from 'src/@core/hooks/useForm';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '40vh',
    maxHeight: '40vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

function AddSecretQuestion({ open, handleClose, onSubmit, loading }: any) {
  const classes = useStyles();

  const submit = () => onSubmit(values);

  const {values, errors, handleChange, handleSubmit, onCancel} = useForm(
    submit,
    secretQuesValidate,
  )
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
        <DialogTitle>Add Secret Question</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Question"
              variant="outlined"
              onChange={handleChange}
              name="question"
              required
              error={errors.question ? true : false}
              helperText ={errors.question && errors.question}
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
            <Button onClick={handleSubmit}>
            Add
          </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddSecretQuestion;
