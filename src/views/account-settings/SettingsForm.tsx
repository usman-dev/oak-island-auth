import { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
} from '@mui/material';
import accountSettingService from 'src/services/accountSetting.service';
import useForm from 'src/@core/hooks/useForm';
import { accountSettingsValidate } from '../../helpers/validations';
import LoadingButton from '@mui/lab/LoadingButton';

const SettingsForm = ({ title, data, getSettings }) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  useEffect(() => {
    setFormData({
      accountType: data?.accountType,
      walletBalanceLimit: data?.walletBalanceLimit,
      dailySpendLimit: data?.dailySpendLimit,
    });
  }, [data]);

  const onSubmit = async () => {
    setLoading(true);
    const setDataForPost = Object.assign({}, formData, values);
    const data = await accountSettingService.addAccountSetting(setDataForPost);
    if (data) {
      setLoading(false);
      getSettings(formData.accountType);
    }
  };

  const { values, errors, handleChange, handleSubmitEdit } = useForm(
    onSubmit,
    accountSettingsValidate,
    data,
  );

  return (
    <>
      <Grid>
        <Card
          style={{ maxWidth: '100%', padding: '20px 5px', margin: '0 auto' }}>
          <Box sx={{ width: '100%' }}>
            <CardHeader
              title={title}
              sx={{
                pt: 0.5,
                alignItems: 'center',
                '& .MuiCardHeader-action': { mt: 0.6 },
              }}
              titleTypographyProps={{
                variant: 'h1',
                sx: {
                  lineHeight: '1.6 !important',
                  letterSpacing: '0.15px !important',
                },
              }}
            />
          </Box>
          <CardContent>
            <form onSubmit={handleSubmitEdit}>
              <Grid container spacing={1}>
                <Grid xs={12} item style={{ paddingBottom: '8px' }}>
                  <TextField
                    placeholder="Enter Wallet Balance Limit"
                    label="Wallet Balance Limit"
                    variant="outlined"
                    name="walletBalanceLimit"
                    type="number"
                    defaultValue={data.walletBalanceLimit}
                    error={errors.walletBalanceLimit ? true : false}
                    helperText={
                      errors.walletBalanceLimit && errors.walletBalanceLimit
                    }
                    fullWidth
                    required
                    onChange={handleChange}
                  />
                </Grid>
                <Grid xs={12} item style={{ paddingBottom: '8px' }}>
                  <TextField
                    placeholder="Enter Daily Transfer Limit"
                    label="Daily Transfer Limit"
                    variant="outlined"
                    name="dailySpendLimit"
                    type="number"
                    defaultValue={data.dailySpendLimit}
                    error={errors.dailySpendLimit ? true : false}
                    helperText={
                      errors.dailySpendLimit && errors.dailySpendLimit
                    }
                    fullWidth
                    required
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={2}>
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth>
                    Save
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default SettingsForm;
