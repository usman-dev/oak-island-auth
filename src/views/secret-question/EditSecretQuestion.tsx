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
import { secretQuesValidate } from 'src/helpers/validations';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '40vh',
    maxHeight: '40vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

function EditSecretQuestion({ open, handleClose, onSubmit, data, loading }: any) {
  const classes = useStyles();
  // const [formData, setFormData] = React.useState<any>({});

  // const onChange = (field: any, value: any) => {
  //   let updatedValue = {};
  //   updatedValue = { [field]: value };
  //   setFormData((formData: any) => ({
  //     ...formData,
  //     ...updatedValue,
  //   }));
  // };

  const submit = () => onSubmit(values);

  const {values, errors, handleChange, handleSubmitEdit, onCancel} = useForm(
    submit,
    secretQuesValidate,
    data
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
        <DialogTitle>Edit Secret Question</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Question"
              variant="outlined"
              defaultValue={data.question}
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
            <Button onClick={handleSubmitEdit}>
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditSecretQuestion;
