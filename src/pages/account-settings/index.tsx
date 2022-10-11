import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Authenticated from 'src/@core/components/Authenticated';
import accountSettingService from 'src/services/accountSetting.service';
import SettingsForm from 'src/views/account-settings/SettingsForm';
import OtpTime from 'src/views/otp/OtpTime';
import commonService from 'src/services/common.service';

const AccountSetting = () => {
  const [basicSettings, setBasicSettings] = useState<any>({
    accountType: 'basic',
    walletBalanceLimit: '',
  });
  const [maxSettings, setMaxSettings] = useState<any>({
    accountType: 'max',
    walletBalanceLimit: '',
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
      case 'basic':
        basicData = await accountSettingService.getAccountSetting('basic');
        if (basicData) {
          basicData.type = 'basic';
          setBasicSettings(basicData);
        }
        break;
      case 'max':
        maxData = await accountSettingService.getAccountSetting('max');
        if (maxData) {
          maxData.type = 'max';
          setMaxSettings(maxData);
        }
        break;

      default:
        basicData = await accountSettingService.getAccountSetting('basic');
        maxData = await accountSettingService.getAccountSetting('max');

        if (basicData) {
          setBasicSettings(basicData);
        }
        if (maxData) {
          setMaxSettings(maxData);
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
            <SettingsForm
              title="Add Basic Account Settings"
              data={basicSettings}
              getSettings={getSettings}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SettingsForm
              title="Add Max Account Settings"
              data={maxSettings}
              getSettings={getSettings}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Authenticated(AccountSetting);
