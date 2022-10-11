import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CircularProgress } from '@mui/material';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '20vh',
    maxHeight: '20vh',
    minWidth: '50vh',
    maxWidth: '50vh',
  },
});

function ConfirmDialog({
  open,
  handleClose,
  handleSubmit,
  content,
  loading,
}: any) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>{content}</DialogContent>
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
            <Button onClick={handleSubmit}>Confirm</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog;
