import { useState, useEffect } from 'react';
import {
  Card,
  Box,
  Button,
  CardContent,
  CardHeader,
  TextField,
  Chip,
  Stack,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Amounts = ({ amount, setAmount, tag, handleSubmit, loading, errors }) => {
  const changeAmount = (index: number, value: any) => {
    const newArr = [...amount];
    newArr[index] = { value, disabled: false };
    setAmount(newArr);
  };

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <Box sx={{ width: '100%' }}>
          <CardHeader
            title="Add Amount"
            sx={{
              pt: 5.5,
              alignItems: 'center',
              '& .MuiCardHeader-action': { mt: 0.6 },
            }}
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
            style={{ overflow: 'auto', height: '210px', paddingTop: '5px' }}>
            <div>
              {amount.map((item: any, index: number) => {
                return (
                  <div key={index} style={{ display: 'flex' }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Enter Amount"
                      value={item.value}
                      onChange={(e) => changeAmount(index, e.target.value)}
                      sx={{ paddingBottom: '20px', paddingRight: '10px' }}
                      error={Object.keys(errors).length > 0 ? true : false}
                      helperText={errors && errors[`error${index}`]}
                    />
                  </div>
                );
              })}
            </div>
          </form>
          <Stack direction="row" spacing={1} sx={{ paddingTop: '20px' }}>
            {tag &&
              tag?.map((item: any, index: number) => (
                <div key={index}>
                  <Chip label={item.value} />
                </div>
              ))}
          </Stack>
          <br />

          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            loading={loading}>
            Save
          </LoadingButton>
        </CardContent>
      </Card>
    </>
  );
};

export default Amounts;
