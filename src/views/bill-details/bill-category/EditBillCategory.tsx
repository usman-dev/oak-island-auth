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
  CircularProgress,
  TextField,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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

function EditParish({
  open,
  handleClose,
  handleSubmit,
  data,
  loading,
  getRootProps,
  getInputProps,
  file,
}: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>({ categoryName: '' });

  React.useEffect(() => {
    setFormData({
      categoryName: data.categoryName,
      image: data.image,
      key: data.key,
    });
  }, [data.categoryName]);

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  const renderImage = () => {
    if (file.length > 0) {
      return (
        <>
          {file.map((item) => (
            <img src={item.preview} width={50} height={50} />
          ))}
        </>
      );
    } else if (file.length === 0 && formData.image) {
      return <img src={formData.image} width={50} height={50} />;
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
        <DialogTitle>Edit Bill Category</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              value={formData.categoryName}
              onChange={(e: any) => {
                onChange('categoryName', e.target.value);
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
            <Button
              disabled={formData == ''}
              onClick={() => {
                handleSubmit(formData, file);
              }}>
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditParish;
