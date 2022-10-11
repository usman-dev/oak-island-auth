import * as React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Button,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Box,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import { categoryService } from 'src/services';
import useForm from 'src/@core/hooks/useForm';
import { faetureValidate } from 'src/helpers/validations';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '60vh',
    maxHeight: '60vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

function AddFeature({ open, handleClose, onSubmit, loading }: any) {
  const classes = useStyles();

  const [categoryName, setCategoryName] = React.useState<string[]>([]);
  const [categoryArr, setCategoryArr] = React.useState<any>([]);

  const [formData, setFormData] = React.useState<any>({
    featureId: '',
  });

  React.useEffect(() => {
    getCardCategories();
  }, []);

  const getCardCategories = async () => {
    const categories: any = await categoryService.getCategories();

    if (categories) {
      setCategoryArr([...categories]);
      categories?.map?.((item: any) => {
        categoryName.push(item.categoryName);
      });
      setCategoryName([...categoryName]);
    }
  };

  // const onChange = (field: any, value: any) => {
  //   let updatedValue: any = {};

  //   updatedValue = { [field]: value };

  //   setFormData((formData: any) => ({
  //     ...updatedValue,
  //   }));
  // };

  const submit = () => onSubmit(values)

  const {values, errors, handleChange, handleSubmit, onCancel} = useForm(
    submit,
    faetureValidate,
  );

  const handleCancel = () => {
    onCancel()
    handleClose()
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">
              Select Category
            </InputLabel>
            <Select
            onChange={(e) => {
              handleChange(e)
            }}
              // onChange={(event: any) =>
              //   onChange('featureId', event?.target?.value)
              // }
              name="featureId"
              input={<OutlinedInput label="Select Category" />}>
              {categoryArr.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
            {
              errors.featureId && <FormHelperText error={errors.featureId ? true : false}>
                {errors.featureId}
              </FormHelperText>
            }
          </FormControl>
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
            // disabled={
            //   formData.companyName == '' ||
            //   formData.billAccount == '' ||
            //   formData.paymentType == ''
            // }
            onClick={handleSubmit}>
            Add
          </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddFeature;

