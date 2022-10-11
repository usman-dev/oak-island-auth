import LoadingButton from '@mui/lab/LoadingButton';
import {
  Card,
  TextField,
  Button,
  CardContent,
  CardHeader,
  Box,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Authenticated from 'src/@core/components/Authenticated';
import useForm from 'src/@core/hooks/useForm';
import commonService from 'src/services/common.service';
import { accountSettingsValidate } from '../../helpers/validations';

const OtpTime = ({ data, getOtpData, title = '', label = '', name = '' }) => {
  const [otp, setOtp] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOtp(data);
  }, [data]);

  const onSubmit = async () => {
    setIsLoading(true);
    const setDataForPost = Object.assign({}, otp, values);
    const data = await commonService.addOtp(setDataForPost);

    if (data) {
      getOtpData('otp');
    }
    setIsLoading(false);
  };

  const { values, errors, handleChange, handleSubmitEdit } = useForm(
    onSubmit,
    accountSettingsValidate,
    otp,
  );
  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <Box sx={{ width: '100%' }}>
          <CardHeader
            title={title}
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
          <form>
            <TextField
              fullWidth
              type="number"
              label={label}
              name={name}
              defaultValue={data.otpTime ? data.otpTime : data.otpValidityTime}
              onChange={handleChange}
              error={errors.otpTime || errors.otpValidityTime ? true : false}
              helperText={
                errors.otpTime ? errors.otpTime : errors.otpValidityTime
              }
            />
          </form>
          <br />
          <LoadingButton
            variant="contained"
            onClick={handleSubmitEdit}
            loading={isLoading}>
            Save
          </LoadingButton>
        </CardContent>
      </Card>
    </>
  );
};

export default OtpTime;
