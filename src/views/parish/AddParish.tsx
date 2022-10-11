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

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '95vh',
    maxHeight: '95vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

function AddParish({ open, handleClose, handleSubmit, loading }: any) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<any>('');
  const [towns, setTowns] = React.useState<any>(null);

  const changeTowns = (index: number, value: any) => {
    value = value.trim();
    const newArr = [...towns];
    newArr[index] = { townName: value };
    setTowns(newArr);
  };

  const remove = async (index: number) => {
    const newArr = [...towns];
    newArr.splice(index, 1);
    setTowns(newArr);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Add Parish</DialogTitle>
        <br />
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Parish Name"
              variant="outlined"
              onChange={(e: any) => {
                setFormData(e.target.value.trim());
              }}
            />
          </FormControl>
          <br />
          <br />
          <Card sx={{ position: 'relative' }}>
            <Box sx={{ width: '100%' }}>
              <CardHeader
                title="Add Towns"
                sx={{
                  pt: 5.5,
                  alignItems: 'center',
                  '& .MuiCardHeader-action': { mt: 0.6 },
                }}
                action={
                  <Button
                    onClick={() => {
                      // setInputCount(inputCount + 1)
                      towns === null
                        ? setTowns([{ townName: '' }])
                        : setTowns([...towns, { townName: '' }]);
                    }}>
                    Add Field
                  </Button>
                }
                titleTypographyProps={{
                  variant: 'h6',
                  sx: {
                    lineHeight: '1.6 !important',
                    letterSpacing: '0.15px !important',
                  },
                }}
              />
            </Box>
            <CardContent>
              <form
                style={{
                  overflow: 'auto',
                  height: '210px',
                  paddingTop: '5px',
                }}>
                <div>
                  {towns?.map((item: any, index: number) => {
                    return (
                      <div key={index} style={{ display: 'flex' }}>
                        <TextField
                          fullWidth
                          label="Enter Towns"
                          value={item.townName}
                          onChange={(e) => changeTowns(index, e.target.value)}
                          sx={{ paddingBottom: '20px', paddingRight: '10px' }}
                          // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />

                        <DeleteOutlineIcon
                          sx={{
                            cursor: 'pointer',
                            fontSize: '40px',
                            paddingTop: '10px',
                          }}
                          onClick={() => remove(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              </form>
            </CardContent>
          </Card>
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
                towns === null || towns?.length < 1
                  ? handleSubmit(formData)
                  : handleSubmit(formData, towns);
              }}>
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddParish;
