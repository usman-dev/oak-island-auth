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

const useStyle = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

const EditBank = ({
  open,
  handleClose,
  handleSubmit,
  data,
}: any): JSX.Element => {
  const classes = useStyle();
  const [formData, setFormData] = React.useState<any>({
    bankName: data.bankName,
    bankCode: data.bankCode,
    bankSwiftCode: data.bankSwiftCode,
    institutionId: data.institutionId,
    hintText: data.hintText,
    accountNumberLength: data.accountNumberLength,
  });
  const [editorData, setEditorData] = React.useState<any>(
    data.accountMessageFormat,
  );

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
        <DialogTitle>Edit Bank</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Bank Name"
              variant="outlined"
              name="bankName"
              required
              defaultValue={data.bankName}
              onChange={(e: any) => onChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <br />
          <br />

          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Bank Code"
              variant="outlined"
              name="bankCode"
              required
              defaultValue={data.bankCode}
              onChange={(e: any) => onChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Bank Swift Code"
              variant="outlined"
              name="bankSwiftCode"
              required
              defaultValue={data.bankSwiftCode}
              onChange={(e: any) => onChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Institution ID"
              variant="outlined"
              name="institutionId"
              required
              defaultValue={data.institutionId}
              onChange={(e: any) => onChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Hint Text"
              variant="outlined"
              name="hintText"
              required
              defaultValue={data.hintText}
              onChange={(e: any) => onChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Account# Length"
              variant="outlined"
              name="accountNumberLength"
              required
              defaultValue={data.accountNumberLength}
              onChange={(e: any) => onChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextEditor
              title="Account Message Format:"
              setEditorData={setEditorData}
              data={data.accountMessageFormat}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(formData, editorData)}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditBank;
