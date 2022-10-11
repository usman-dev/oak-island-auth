import * as React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Button,
  // TextField,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Box,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { categoryService } from 'src/services';
import useForm from 'src/@core/hooks/useForm';
import { menuCardCategoryValidate } from 'src/helpers/validations';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '60vh',
    maxHeight: '60vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

function AddCardCategory({ open, handleClose, onSubmit, loading }: any) {
  const classes = useStyles();

  const [categoryName, setCategoryName] = React.useState<string[]>([]);
  const [categoryArr, setCategoryArr] = React.useState<any>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);

  const [formData, setFormData] = React.useState<any>({
    categoryName: '',
    // categoryStatus: '',
    // visible: true,
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

  const onChange = (field: any, value: any) => {
    let updatedValue: any = {};
    if (field === 'category') {
      updatedValue.categoryName = value.categoryName;
      updatedValue.category = value.id;
      // updatedValue.categoryEnum = value.categoryEnum;
    } else {
      updatedValue = { [field]: value };
    }

    setFormData({ ...updatedValue });
  };

  const submit = () => {
    const postData = Object.assign({}, values, formData);
    onSubmit(postData);
  };

  const { values, errors, handleChange, handleSubmit, onCancel } = useForm(
    submit,
    menuCardCategoryValidate,
    formData,
  );

  const handleCancel = () => {
    setFormData({});
    onCancel();
    handleClose();
  };

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
              // value={personName}
              onChange={(event: any) =>
                onChange('category', event?.target?.value)
              }
              name="categoryName"
              // onChange={handleChange}
              required
              error={errors.categoryName ? true : false}
              input={<OutlinedInput label="Select Category" />}
              // MenuProps={MenuProps}
            >
              {categoryArr.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  // style={getStyles(name, personName, theme)}
                >
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryName && (
              <FormHelperText error={errors.categoryName ? true : false}>
                {errors.categoryName}
              </FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <br />
            <FormLabel id="demo-controlled-radio-buttons-group">
              Status
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="categoryStatus"
              onChange={handleChange}
              // value={widgetStatus}
              // onChange={(e: any) => {
              //   onChange('categoryStatus', e.target.value);
              // }}
            >
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel value="old" control={<Radio />} label="Old" />
            </RadioGroup>
            {errors.categoryStatus && (
              <FormHelperText error={errors.categoryStatus ? true : false}>
                {errors.categoryStatus}
              </FormHelperText>
            )}
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

export default AddCardCategory;
