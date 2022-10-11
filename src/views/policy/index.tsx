import React, { useEffect, useRef, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { privacypolicyService } from 'src/services';
import Toast from 'src/@core/components/Toast';
import Authenticated from '../../@core/components/Authenticated';
import { Card, Grid } from '@mui/material';
import TextEditor from 'src/@core/components/text-editor/TextEditor';

const PrivacyPolicy = ({ data, getPrivacyPolicy }) => {
  const [editorData, setEditorData] = useState<any>(data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getPrivacyPolicy();
    setEditorData(data);
  }, [data]);

  // const getPrivacyPolicy = async () => {
  //   const data: any = await privacypolicyService.getPrivacyPolicy();

  //   if (data) {
  //     setEditorData(data.policy);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const data = await privacypolicyService.editPrivacyPolicy({
      policy: editorData,
    });
    setLoading(false);
    if (data) {
      getPrivacyPolicy('policy');
    }
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <TextEditor
                title="Privacy Policy:"
                setEditorData={setEditorData}
                data={editorData}
              />
              <LoadingButton
                size="large"
                variant="contained"
                loading={loading}
                sx={{ marginBottom: 7 }}
                type="submit">
                Submit
              </LoadingButton>
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

// export default Authenticated(PrivacyPolicy);
export default PrivacyPolicy;
