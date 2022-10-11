import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  CircularProgress,
  FormHelperText,
  TextField,
} from '@mui/material';
import TextEditor from 'src/@core/components/text-editor/TextEditor';
import useForm from 'src/@core/hooks/useForm';
import { faqValidate } from 'src/helpers/validations';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '95vh',
    maxHeight: '95vh',
    minWidth: '120vh',
    maxWidth: '120vh',
  },
});

function EditFaq({ open, handleClose, onSubmit, data, loading }: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>({});
  const [editorData, setEditorData] = React.useState<any>();
  React.useEffect(() => {
    setEditorData(data.answer);
  }, [data]);
  const submit = () => {
    const data = {
      ...values,
      answer: editorData,
    };
    onSubmit(data);
  };

  const { values, errors, handleChange, handleSubmitEdit, onCancel } = useForm(
    submit,
    faqValidate,
    { question: data.question, answer: editorData },
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
        <DialogTitle>Edit FAQ</DialogTitle>
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
              helperText={errors.question && errors.question}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextEditor
              title="Answer:"
              setEditorData={setEditorData}
              data={data.answer}
            />
            {errors.answer && (
              <FormHelperText error={errors.answer ? true : false}>
                {errors.answer}
              </FormHelperText>
            )}
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

export default EditFaq;
