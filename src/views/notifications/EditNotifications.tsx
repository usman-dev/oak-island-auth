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
import TextEditor from 'src/@core/components/text-editor/TextEditor';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

function EditNotifications({ open, handleClose, handleSubmit, data }: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>({
    title: data.title,
  });
  const [editorData, setEditorData] = React.useState<any>(data.body);

  React.useEffect(() => {
    setFormData({ title: data.title });
    setEditorData(data.body);
  }, [data]);
  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Edit Notifications</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={formData.title || ''}
              onChange={(e: any) => onChange('title', e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextEditor
              title="Content:"
              setEditorData={setEditorData}
              data={editorData || ''}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(formData, editorData)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditNotifications;
