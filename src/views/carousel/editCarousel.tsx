import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { carouselValidate } from 'src/helpers/validations';
import useForm from 'src/@core/hooks/useForm';

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

function EditCarousel({
  open,
  handleClose,
  onSubmit,
  data,
  loading,
  getRootProps,
  getInputProps,
  file,
}: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>({
    title: '',
    subtitle: '',
  });

  React.useEffect(() => {
    setFormData({
      title: data.title,
      subtitle: data.subtitle,
      image: data.image,
      key: data.key,
    });
  }, [data.title]);

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
    } else if (file.length === 0 && data.image) {
      return <img src={data.image} width={50} height={50} />;
    } else {
      return <p style={{ color: '#bdbdbd' }}>No Icon added</p>;
    }
  };

  const submit = () => {
    const editData = Object.assign({}, data, values);
    onSubmit(editData);
  };

  const { values, errors, handleChange, handleSubmitEdit, onCancel } = useForm(
    submit,
    carouselValidate,
    data,
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
        <DialogTitle>Add Carousel</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              name="title"
              label="Title"
              variant="outlined"
              defaultValue={data.title}
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
              defaultValue={data.subtitle}
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
              defaultValue={data.position}
              required
              onChange={handleChange}
              error={errors.position ? true : false}
              helperText={errors.position && errors.position}
            />
          </FormControl> */}
          <br />
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
              onClick={handleSubmitEdit}>
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCarousel;
