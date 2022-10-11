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
import { TextField, Box, CircularProgress } from '@mui/material';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vh',
    maxWidth: '80vh',
  },
});

function AddCategory({ open, handleClose, handleSubmit, loading }: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>({
    country: '',
    categoryName: '',
    categoryEnum: '',
  });
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
        <DialogTitle>Add Category</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="form-layouts-separator-select-label">
              Country
            </InputLabel>
            <Select
              label="Country"
              defaultValue=""
              id="form-layouts-separator-select"
              labelId="form-layouts-separator-select-label"
              onChange={(e: any) => onChange('country', e.target.value)}>
              <MenuItem value="Jamaica">Jamaica</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Category"
              variant="outlined"
              onChange={(e: any) => onChange('categoryName', e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Category Enum"
              variant="outlined"
              onChange={(e: any) => onChange('categoryEnum', e.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
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
            <Button onClick={() => handleSubmit(formData)}>Add</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCategory;
