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
import contactInformationService from 'src/services/contactInformation.service';
import LoadingButton from '@mui/lab/LoadingButton';

const ContactInformation = ({ data, getSettings }) => {
  const [formData, setFormData] = useState<any>({
    contactNumber: data.contactNumber,
    websiteUrl: data.websiteUrl,
    email: data.email,
  });

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
    setFormData(data);
  }, [data]);

  // const getSettings = async () => {
  //   const data = await contactInformationService.getContactInformation();
  //   if (data) {
  //     setFormData(data);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data = await contactInformationService.editContactInformation(
      formData,
    );
    if (data) {
      setLoading(false);
      getSettings('contact');
    }
  };
  return (
    <>
      <Grid>
        <Card
          style={{ maxWidth: '100%', padding: '20px 5px', margin: '0 auto' }}>
          <Box sx={{ width: '100%' }}>
            <CardHeader
              title="Contact Information"
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
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} item style={{ paddingBottom: '8px' }}>
                  <TextField
                    placeholder="Enter Contact Number"
                    label="Contact Number"
                    variant="outlined"
                    name="contactNumber"
                    // type="number"
                    value={formData.contactNumber || ''}
                    fullWidth
                    onChange={(e: any) =>
                      onChange(e.target.name, e.target.value)
                    }
                  />
                </Grid>
                <Grid xs={12} item style={{ paddingBottom: '8px' }}>
                  <TextField
                    placeholder="Enter Website URL"
                    label="Website URL"
                    variant="outlined"
                    name="websiteUrl"
                    // type="number"
                    value={formData.websiteUrl || ''}
                    fullWidth
                    onChange={(e: any) =>
                      onChange(e.target.name, e.target.value)
                    }
                  />
                </Grid>
                <Grid xs={12} item style={{ paddingBottom: '8px' }}>
                  <TextField
                    placeholder="Enter Email Address"
                    label="Email"
                    variant="outlined"
                    name="email"
                    // type="number"
                    value={formData.email || ''}
                    fullWidth
                    onChange={(e: any) =>
                      onChange(e.target.name, e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={1}>
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

export default ContactInformation;
