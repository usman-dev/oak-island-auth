import React, { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Authenticated from 'src/@core/components/Authenticated';
import termsConditionsService from 'src/services/termsConditions.service';
import { Card, Grid, Tabs, Tab, Typography, Box } from '@mui/material';
import TextEditor from 'src/@core/components/text-editor/TextEditor';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const TermsCondition = ({ data, getTermsConditions }) => {
  const [editorData, setEditorData] = useState<any>([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [response, setResponse] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState<any>(0);

  useEffect(() => {
    setResponse([...data]);
  }, [data]);

  const handleSubmit = async (type, e: any) => {
    setLoading(true);
    e.preventDefault();
    const data = await termsConditionsService.editTermsCondition({
      condition: editorData,
      type,
    });

    setLoading(false);

    if (data) {
      getTermsConditions();
    }
  };

  const getData = (type) => {
    const data = response?.find?.((item) => item.type === type);
    return data?.condition;
  };

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
    setBtnDisabled(true);
  };

  const setEditorContent = (data) => {
    setEditorData(data);
    setBtnDisabled(false);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 4 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
              <Tab label="General" {...a11yProps(0)} />
              <Tab label="Top Up" {...a11yProps(1)} />
              <Tab label="Remittances" {...a11yProps(2)} />
              <Tab label="Pay Bills" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <form onSubmit={(e) => handleSubmit('General', e)}>
                <TextEditor
                  title="Terms And Conditions:"
                  setEditorData={setEditorContent}
                  data={getData('General')}
                />
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={loading}
                  disabled={btnDisabled}
                  sx={{ marginBottom: 7 }}
                  type="submit">
                  Submit
                </LoadingButton>
              </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <form onSubmit={(e) => handleSubmit('Top Up', e)}>
                <TextEditor
                  title="Terms And Conditions:"
                  setEditorData={setEditorContent}
                  data={getData('Top Up')}
                />
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={loading}
                  disabled={btnDisabled}
                  sx={{ marginBottom: 7 }}
                  type="submit">
                  Submit
                </LoadingButton>
              </form>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <form onSubmit={(e) => handleSubmit('Remittances', e)}>
                <TextEditor
                  title="Terms And Conditions:"
                  setEditorData={setEditorContent}
                  data={getData('Remittances')}
                />
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={loading}
                  disabled={btnDisabled}
                  sx={{ marginBottom: 7 }}
                  type="submit">
                  Submit
                </LoadingButton>
              </form>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <form onSubmit={(e) => handleSubmit('Pay Bills', e)}>
                <TextEditor
                  title="Terms And Conditions:"
                  setEditorData={setEditorContent}
                  data={getData('Pay Bills')}
                />
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={loading}
                  disabled={btnDisabled}
                  sx={{ marginBottom: 7 }}
                  type="submit">
                  Submit
                </LoadingButton>
              </form>
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TermsCondition;
// export default TermsCondition;
