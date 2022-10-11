import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import {
  Card,
  Box,
  Button,
  CardContent,
  CardHeader,
  TextField,
  CircularProgress,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoadingButton from '@mui/lab/LoadingButton';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '60vh',
    maxHeight: '60vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px',
  width: '45%',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  margin: '20px 0 20px 0',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

function AddBillCategory({
  open,
  handleClose,
  handleSubmit,
  loading,
  getRootProps,
  getInputProps,
  file,
}: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const renderImage = () => {
    if (file.length > 0) {
      return (
        <>
          {file.map((item) => (
            <img src={item.preview} width={50} height={50} />
          ))}
        </>
      );
    } else {
      return <p style={{ color: '#bdbdbd' }}>No Icon added</p>;
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Add Bill Category</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              onChange={(e: any) => {
                setFormData(e.target.value);
              }}
            />
          </FormControl>
          <br />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={baseStyle} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Click here to select Icon</p>
            </div>
            <div style={{ marginLeft: 20 }}>{renderImage()}</div>
          </div>
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
            <LoadingButton
              loading={isLoading}
              disabled={formData == ''}
              onClick={() => {
                handleSubmit(formData);
              }}>
              Add
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddBillCategory;
