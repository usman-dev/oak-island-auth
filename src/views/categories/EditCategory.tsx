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

const useStyle = makeStyles({
  dialogPaper: {
    minHeight: '70vh',
    maxHeight: '70vh',
    minWidth: '80vh',
    maxWidth: '80vh',
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

const EditCategory = ({
  open,
  handleClose,
  handleSubmit,
  data,
  getRootProps,
  getInputProps,
  getRootActiveProps,
  getInputActiveProps,
  file,
  activeFile,
  loading,
}: any): JSX.Element => {
  const classes = useStyle();
  const [formData, setFormData] = React.useState<any>({
    country: '',
    categoryName: '',
    categoryEnum: '',
    categoryIcon: '',
  });

  React.useEffect(() => {
    setFormData({
      country: data.country,
      categoryName: data.categoryName,
      categoryEnum: data.categoryEnum,
      categoryIcon: data.categoryIcon,
      categoryIconKey: data.categoryIconKey,
      activeCategoryIcon: data.activeCategoryIcon,
    });
  }, [data]);

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
            <img
              src={item.preview}
              width={50}
              height={50}
              className="imageFit"
            />
          ))}
        </>
      );
    } else if (file.length === 0 && formData.categoryIcon) {
      return (
        <img
          src={formData.categoryIcon}
          width={50}
          height={50}
          className="imageFit"
        />
      );
    }
    return <p style={{ color: '#bdbdbd' }}>No Icon added</p>;
  };

  const renderActiveIcon = () => {
    if (activeFile.length > 0) {
      return (
        <>
          {activeFile.map((item) => (
            <img
              src={item.preview}
              width={50}
              height={50}
              className="imageFit"
            />
          ))}
        </>
      );
    } else if (activeFile.length === 0 && formData.activeCategoryIcon) {
      return (
        <img
          src={formData.activeCategoryIcon}
          width={50}
          height={50}
          className="imageFit"
        />
      );
    }
    return <p style={{ color: '#bdbdbd' }}>No Active Icon added</p>;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Edit Feature</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="form-layouts-separator-select-label">
              Country
            </InputLabel>
            <Select
              label="Country"
              value={data.country}
              disabled={true}
              id="form-layouts-separator-select"
              labelId="form-layouts-separator-select-label"
              onChange={(e: any) => onChange('country', e.target.value)}>
              <MenuItem value="Jamaica">Jamaica</MenuItem>
              <MenuItem value="pakistan">Pakistan</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Feature Name"
              variant="outlined"
              defaultValue={data.categoryName}
              onChange={(e: any) => onChange('categoryName', e.target.value)}
            />
          </FormControl>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={baseStyle} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Click here to select Icon</p>
            </div>
            <div style={{ marginLeft: 20 }}>{renderImage()}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={baseStyle} {...getRootActiveProps()}>
              <input {...getInputActiveProps()} />
              <p>Click here to select Active Icon</p>
            </div>
            <div style={{ marginLeft: 20 }}>{renderActiveIcon()}</div>
          </div>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Feature Enum"
              disabled={true}
              variant="outlined"
              defaultValue={data.categoryEnum}
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
            <Button onClick={() => handleSubmit(formData, file)}>Edit</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCategory;
