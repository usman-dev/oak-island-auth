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
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 50,
  height: 200,
  borderWidth: 2,
  width: '50%',
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

function EditBanner({
  open,
  handleClose,
  handleSubmit,
  getRootProps,
  getInputProps,
  file,
  data,
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
        <DialogTitle>Edit Banner</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <div>
              {file.length > 0 ? (
                <img
                  style={{
                    marginRight: 20,
                    marginBottom: 20,
                    objectFit: 'contain',
                  }}
                  src={file[0].preview}
                  width="300"
                  height="200"
                />
              ) : (
                <img
                  style={{
                    marginRight: 20,
                    marginBottom: 20,
                    objectFit: 'contain',
                  }}
                  src={data.image}
                  width="300"
                  height="200"
                />
              )}
            </div>
            <div style={baseStyle} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop or click to Edit Image</p>
            </div>
          </div>
          {/* <FormControl>
            <TextField
              style={{ width: 300 }}
              size="small"
              label="Position"
              defaultValue={data.position}
              onChange={(e: any) => onChangeHandler(e)}
            />
          </FormControl> */}
          {errors && (
            <p style={{ color: 'red', textAlign: 'center' }}>{errors}</p>
          )}
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
            <Button onClick={() => handleSubmit()}>Update</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditBanner;
