import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { Button, TextField, Box, CircularProgress } from '@mui/material';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '95vh',
    maxHeight: '95vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

function AddBanner({
  open,
  handleClose,
  handleSubmit,
  getRootProps,
  getInputProps,
  files,
  inValid,
  onChangeHandler,
  loading,
  errors,
}: any) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Add Banners</DialogTitle>
        <DialogContent>
          <div>
            <div style={baseStyle} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <br />
            <p style={{ fontSize: 12 }}>
              Minimum Image Size : 640 x 306 <br /> Supported Image Formats :
              .jpg, .jpeg, .png
            </p>
            {errors && (
              <p style={{ color: 'red', textAlign: 'center' }}>{errors}</p>
            )}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}>
              {files.map((file, index) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  key={index}>
                  <img
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      objectFit: 'contain',
                    }}
                    src={file.preview}
                    width="300"
                    height="200"
                  />
                  {/* <FormControl>
                    <TextField
                      style={{ width: 300 }}
                      size="small"
                      label="Position"
                      onChange={(e: any) => onChangeHandler(index, e)}
                    />
                  </FormControl> */}
                </div>
              ))}
            </div>
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
            <Button disabled={inValid} onClick={() => handleSubmit()}>
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddBanner;
