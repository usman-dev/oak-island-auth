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
import { Box, CircularProgress, FormHelperText, TextField } from '@mui/material';
import TextEditor from 'src/@core/components/text-editor/TextEditor';
import useForm from 'src/@core/hooks/useForm';
import { faqValidate } from 'src/helpers/validations';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '95vh',
    maxHeight: '95vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

function AddFaq({ open, handleClose, onSubmit, loading }: any) {
  const classes = useStyles();
  // const [formData, setFormData] = React.useState<any>({
  //   question: '',
  // });
  const [editorData, setEditorData] = React.useState<any>(null);
  // const onChange = (field: any, value: any) => {
  //   let updatedValue = {};
  //   updatedValue = { [field]: value };
  //   setFormData((formData: any) => ({
  //     ...formData,
  //     ...updatedValue,
  //   }));
  // };
  const submit = () => {
    const data = {
      ...values,
      answer: editorData
    }
    onSubmit(data)
  }

  const {values, errors, handleChange, handleSubmit, onCancel} = useForm(
    submit,
    faqValidate,
    {answer : editorData}
  )
  const handleCancel = () => {
    setEditorData(null)
    onCancel()
    handleClose()
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Add FAQ</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Question"
              variant="outlined"
              // onChange={(e: any) => onChange('question', e.target.value)}
              onChange={handleChange}
              name="question"
              required
              error={errors.question ? true : false}
              helperText ={errors.question && errors.question}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextEditor
              title="Answer:"
              setEditorData={setEditorData}
              data={''}
            />
            {
              errors.answer && 
              <FormHelperText error={errors.answer?true:false}>{errors.answer}</FormHelperText>
            }
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
            <Button
            onClick={handleSubmit
            }>
            Add
          </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddFaq;
