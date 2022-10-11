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
import commonService from 'src/services/common.service';

const Dashboard = () => {
  const [otp, setOtp] = useState<any>(null);

  useEffect(() => {
    getOtpData();
  }, []);

  const getOtpData = async () => {
    const data = await commonService.getOtp();

    if (data?.otpTime) {
      setOtp(data.otpTime);
    }
  };

  const handleSubmit = async () => {
    const data = await commonService.addOtp({ otpTime: otp });
    if (data) {
      getOtpData();
    }
  };
  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <Box sx={{ width: '100%' }}>
          <CardHeader
            title="Add OTP Reset Time"
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
              label="Enter Time in Seconds"
              name="otp"
              value={otp || ''}
              onChange={(e) => setOtp(e.target.value)}
            />
          </form>
          <br />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default Authenticated(Dashboard);
