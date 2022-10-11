// ** MUI Imports
import {
  Grid,
  Card,
  TextField,
  FormControl,
  DialogActions,
  Button,
  Box,
  CircularProgress,
  CardContent,
  CardHeader,
  Tooltip,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import Authenticated from 'src/@core/components/Authenticated';
import { referralService } from 'src/services';
import useForm from '../../@core/hooks/useForm';
import { referrelValidate } from '../../helpers/validations';
import { AuthContext } from 'src/context/auth/AuthContext';
import CsvBulkUpload from 'src/@core/components/CsvBulkUpload';

const Referral = () => {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const router = useRouter();

  user?.role != 'SUPER_ADMIN' && router.back();

  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    senderBonus: 0,
    dailyInviteLimit: 0,
    referralCollectionLimit: 0,
    reminderLimit: 0,
    timeInterval: 0,
    refreeAmount: 0,
  });

  useEffect(() => {
    getReferral();
  }, []);

  const getReferral = async () => {
    if (!loading) setLoading(true);
    const data: any = await referralService.getReferral();

    if (data) {
      setFormData(data);
    }
    setLoading(false);
  };

  const onSubmit = async () => {
    setButtonLoading(true);
    const setDataForPost = Object.assign({}, formData, values);
    const data = await referralService.addReferral(setDataForPost);
    if (data) {
      setButtonLoading(false);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    onSubmit,
    referrelValidate,
  );

  const importCSV = async (result) => {
    const data = result.data;
    data.map((dataItem) => {
      delete Object.assign(dataItem, {
        ['countryName']: dataItem['Country Name'],
      })['Country Name'];
      delete Object.assign(dataItem, {
        ['countryCode']: dataItem['Country Code'],
      })['Country Code'];
      delete Object.assign(dataItem, {
        ['phonePrefix']: dataItem['Phone Prefix'],
      })['Phone Prefix'];
      delete Object.assign(dataItem, {
        ['currency']: dataItem['Currency'],
      })['Currency'];
      delete Object.assign(dataItem, {
        ['flag']: dataItem['Flag Image Url'],
      })['Flag Image Url'];
    });

    console.log(data);

    // const data1: any = await countryService.countryBulkUpload({
    //   countries: data,
    // });

    // if (data1) {
    //   getCountry();
    // }
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
        <>
          <Card sx={{ position: 'relative' }}>
            <CardHeader
              title={'Invite & Earn'}
              // sx={{
              //   pt: 4,
              // }}
              titleTypographyProps={{
                variant: 'h6',
                sx: {
                  lineHeight: '1.6 !important',
                  letterSpacing: '0.15px !important',
                },
              }}
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Sender Bonus"
                      type="number"
                      name="senderBonus"
                      variant="outlined"
                      defaultValue={formData.senderBonus}
                      error={errors.senderBonus ? true : false}
                      helperText={errors.senderBonus && errors.senderBonus}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Receiver Bonus"
                      name="receiverBonus"
                      type="number"
                      variant="outlined"
                      defaultValue={formData.receiverBonus}
                      error={errors.receiverBonus ? true : false}
                      helperText={errors.receiverBonus && errors.receiverBonus}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <br />
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Daily Invite Limit"
                      name="dailyInviteLimit"
                      type="number"
                      variant="outlined"
                      defaultValue={formData.dailyInviteLimit}
                      error={errors.dailyInviteLimit ? true : false}
                      helperText={
                        errors.dailyInviteLimit && errors.dailyInviteLimit
                      }
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Referral Collection Limit"
                      name="referralCollectionLimit"
                      type="number"
                      variant="outlined"
                      defaultValue={formData.referralCollectionLimit}
                      error={errors.referralCollectionLimit ? true : false}
                      helperText={
                        errors.referralCollectionLimit &&
                        errors.referralCollectionLimit
                      }
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Reminder Limit"
                        type="number"
                        name="reminderLimit"
                        variant="outlined"
                        defaultValue={formData.reminderLimit}
                        error={errors.reminderLimit ? true : false}
                        helperText={
                          errors.reminderLimit && errors.reminderLimit
                        }
                        onChange={handleChange}
                      />
                    </FormControl>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Notification Time Interval (In Hours)"
                      variant="outlined"
                      type="number"
                      name="timeInterval"
                      defaultValue={formData.timeInterval}
                      error={errors.timeInterval ? true : false}
                      helperText={errors.timeInterval && errors.timeInterval}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={6}>
                <DialogActions>
                  <LoadingButton
                    loading={buttonLoading}
                    // disabled={isInValid}
                    variant="contained"
                    onClick={handleSubmit}>
                    Save
                  </LoadingButton>
                </DialogActions>
              </Grid>
            </CardContent>
          </Card>
          {/* <br />
          <Card sx={{ position: 'relative' }}>
            <CardHeader
              title={'Special Referral File Upload'}
              // sx={{
              //   pt: 4,
              // }}
              titleTypographyProps={{
                variant: 'h6',
                sx: {
                  lineHeight: '1.6 !important',
                  letterSpacing: '0.15px !important',
                },
              }}
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Tooltip title="Download Excel File">
                    <Button
                      sx={{
                        marginLeft: '40%',
                      }}>
                      <CsvBulkUpload
                        type="referral"
                        title="Upload Excel File"
                        uploadAction={importCSV}
                      />
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
              <br />
            </CardContent>
          </Card> */}
        </>
      )}
    </>
  );
};

export default Authenticated(Referral);
