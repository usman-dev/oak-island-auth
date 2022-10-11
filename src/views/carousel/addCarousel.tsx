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
  FormHelperText,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useForm from 'src/@core/hooks/useForm';
import { carouselValidate } from 'src/helpers/validations';

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

function AddCarousel({
  open,
  handleClose,
  onSubmit,
  loading,
  getRootProps,
  getInputProps,
  file,
}: any) {
  const classes = useStyles();

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

  const [fileError, setFileError] = React.useState(false);

  const handleCancel = () => {
    setFileError(false);
    onCancel();
    handleClose();
  };

  const submit = () => {
    if (file.length == 0) setFileError(true);
    else {
      setFileError(false);
      onSubmit(values);
    }
  };

  const { values, errors, handleChange, handleSubmit, onCancel } = useForm(
    submit,
    carouselValidate,
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Add Carousel</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              name="title"
              label="Title"
              variant="outlined"
              required
              onChange={handleChange}
              error={errors.title ? true : false}
              helperText={errors.title && errors.title}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              name="subtitle"
              label="Subtitle"
              variant="outlined"
              required
              onChange={handleChange}
              error={errors.subtitle ? true : false}
              helperText={errors.subtitle && errors.subtitle}
            />
          </FormControl>
          {/* <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              name="position"
              label="Position"
              variant="outlined"
              type="number"
              required
              onChange={handleChange}
              error={errors.position ? true : false}
              helperText={errors.position && errors.position}
            />
          </FormControl> */}
          <br />
          <br />
          {fileError && (
            <FormHelperText error={fileError ? true : false}>
              Image is required
            </FormHelperText>
          )}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={baseStyle} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Click here to select Icon</p>
            </div>
            <div style={{ marginLeft: 20 }}>{renderImage()}</div>
          </div>
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
              //   disabled={formData.title}
              onClick={handleSubmit}>
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCarousel;
