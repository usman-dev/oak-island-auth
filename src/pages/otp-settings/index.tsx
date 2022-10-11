import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Authenticated from 'src/@core/components/Authenticated';
import OtpTime from 'src/views/otp/OtpTime';
import commonService from 'src/services/common.service';

const OTPSetting = () => {
  const [otpTime, setOtpTime] = useState({
    otpTime: '',
    otpValidityTime: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async (type = '') => {
    setLoading(true);
    let basicData: any,
      maxData: any,
      otpData: any = '';
    switch (type) {
      // case 'otp':
      //   otpData = await commonService.getOtp();
      //   if (otpData) {
      //     setOtpTime(otpData);
      //   }
      //   break;
      case 'otp':
        otpData = await commonService.getOtp();
        if (otpData) {
          setOtpTime(otpData);
        }
        break;
      default:
        otpData = await commonService.getOtp();

        if (otpData) {
          setOtpTime(otpData);
        }
    }

    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Box>
          <CircularProgress
            sx={{
              display: 'flex',
              margin: '200px 50% 200px 50%',
            }}
            size={60}
          />
        </Box>
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <OtpTime
              data={{ otpTime: otpTime?.otpTime }}
              getOtpData={getSettings}
              title="Add OTP Reset Time"
              label="Enter Time in Seconds"
              name="otpTime"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OtpTime
              data={{ otpValidityTime: otpTime?.otpValidityTime }}
              getOtpData={getSettings}
              title="Add OTP Validity Time"
              label="Enter Time in minutes"
              name="otpValidityTime"
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Authenticated(OTPSetting);
