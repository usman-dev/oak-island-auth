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
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  CircularProgress,
} from '@mui/material';
import { categoryService } from 'src/services';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '50vh',
    maxHeight: '50vh',
    minWidth: '100vh',
    maxWidth: '100vh',
  },
});

function EditCardCategory({ open, handleClose, handleSubmit, data, loading }: any) {
  const classes = useStyles();
  const [categoryName, setCategoryName] = React.useState<string[]>([]);
  const [categoryArr, setCategoryArr] = React.useState<any>([]);
  const [selectedCat, setSelectedCat] = React.useState<any>({});

  const [formData, setFormData] = React.useState<any>({
    categoryName: data.categoryName,
    categoryStatus: data.categoryStatus,
  });

  React.useEffect(() => {
    getCardCategories();
  }, []);

  React.useEffect(() => {
    for (const cat of categoryArr) {
      if(cat.categoryName === data.categoryName)
        setSelectedCat(cat)
    }
  }, [data]);

  const getCardCategories = async () => {
    const categories: any = await categoryService.getCategories();
    if (categories) {
      setCategoryArr([...categories]);
      categories?.map?.((item: any) => {
        categoryName.push(item.category);
      });
      setCategoryName([...categoryName]);
    }
  };

  const onChange = (field: any, value: any) => {
    let updatedValue: any = {};
    if (field === 'category') {
      updatedValue.categoryName = value.categoryName;
      updatedValue.categoryEnum = value.categoryEnum;
      updatedValue.category = value.id;
    } else {
      updatedValue = { [field]: value };
    }

    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes?.dialogPaper }}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">
              Select Category
            </InputLabel>
            <Select
              defaultValue={selectedCat}
              onChange={(event: any) =>
                onChange('category', event?.target?.value)
              }
              input={<OutlinedInput label="Select Category" />}>
              {categoryArr.map((item) => (
                <MenuItem key={item.categoryName} value={item}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <br />
            <FormLabel id="demo-controlled-radio-buttons-group">
              Status
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={data.categoryStatus}
              name="radio-buttons-group"
              // value={widgetStatus}
              onChange={(e: any) => {
                onChange('categoryStatus', e.target.value);
              }}>
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel value="old" control={<Radio />} label="Old" />
            </RadioGroup>
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
            <Button
            // disabled={
            //   formData.companyName == '' ||
            //   formData.billAccount == '' ||
            //   formData.paymentType == ''
            // }
            onClick={() => {
              handleSubmit(formData);
            }}>
            Update
          </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCardCategory;
