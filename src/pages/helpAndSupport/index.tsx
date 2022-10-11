import { Box, Card, CircularProgress, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Authenticated from 'src/@core/components/Authenticated';
import { privacypolicyService } from 'src/services';
import contactInformationService from 'src/services/contactInformation.service';
import termsConditionsService from 'src/services/termsConditions.service';
import ContactInformation from 'src/views/contact-information';
import PrivacyPolicy from 'src/views/policy';
import TermsCondition from 'src/views/terms-condition';

const HelpAndSupport = () => {
  const [contactData, setContactData] = useState<any>({});
  const [termsData, setTermsData] = useState<any>([]);
  const [policyData, setPolicyData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async (type = '') => {
    let conData: any,
      terData: any,
      polData: any = {};

    switch (type) {
      case 'contact':
        conData = await contactInformationService.getContactInformation();
        if (conData) {
          setContactData(conData);
        }
        break;

      case 'terms':
        terData = await termsConditionsService.getTermsCondition();

        if (terData) {
          setTermsData(terData);
        }
        break;

      case 'policy':
        polData = await privacypolicyService.getPrivacyPolicy();

        if (polData) {
          setPolicyData(polData.policy);
        }
        break;

      default:
        conData = await contactInformationService.getContactInformation();
        if (conData) {
          setContactData(conData);
        }

        terData = await termsConditionsService.getTermsCondition();
        if (terData) {
          setTermsData(terData);
        }

        polData = await privacypolicyService.getPrivacyPolicy();

        if (polData) {
          setPolicyData(polData.policy);
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
          <Grid item xs={12}>
            <Card sx={{ p: 4 }}>
              <ContactInformation
                data={contactData}
                getSettings={getSettings}
              />
              <br />
              <TermsCondition
                data={termsData}
                getTermsConditions={getSettings}
              />
              <br />
              <PrivacyPolicy data={policyData} getPrivacyPolicy={getSettings} />
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Authenticated(HelpAndSupport);
