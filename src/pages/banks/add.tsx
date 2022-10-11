import { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import TextEditor from 'src/@core/components/text-editor/TextEditor';
import productService from 'src/services/product.service';
import { useRouter } from 'next/router';
import Authenticated from 'src/@core/components/Authenticated';

const AddBank = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    bankName: '',
    bankCode: '',
    bankSwiftCode: '',
    institutionId: '',
    hintText: '',
    accountNumberLength: '',
  });
  const [editorData, setEditorData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    // setFormData((formData: any) => ({
    //   ...formData,
    //   accountMessageFormat: editorData,
    // }));
    const data = await productService.addBank(formData, editorData);
    if (data != null) {
      router.push('/p2p/');
    }
    setLoading(false);
  };
  return (
    <>
      <Typography gutterBottom variant="h3" align="left">
        Add Bank Details
      </Typography>
      <Grid>
        <Card
          style={{ maxWidth: '100%', padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} item style={{ paddingBottom: '8px' }}>
                  <TextField
                    placeholder="Enter Bank's Name"
                    label="Bank's Name"
                    variant="outlined"
                    name="bankName"
                    fullWidth
                    required
                    onChange={(e: any) =>
                      onChange(e.target.name, e.target.value)
                    }
                  />
                </Grid>
                <Grid xs={12} item style={{ paddingBottom: '8px' }}>
                  <TextField
                    placeholder="Enter Bank's Code"
                    label="Bank's Code"
                    variant="outlined"
                    type="text"
                    name="bankCode"
                    fullWidth
                    required
                    onChange={(e: any) =>
                      onChange(e.target.name, e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingBottom: '8px' }}>
                  <TextField
                    placeholder="Enter Bank's swift code"
                    label="Bank's swift code"
                    variant="outlined"
                    name="bankSwiftCode"
                    fullWidth
                    required
                    onChange={(e: any) =>
                      onChange(e.target.name, e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingBottom: '8px' }}>
                  <TextField
                    type="text"
                    placeholder="Enter institution Id"
                    label="Institution ID"
                    name="institutionId"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e: any) =>
                      onChange(e.target.name, e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingBottom: '8px' }}>
                  <TextField
                    label="Hint Text"
                    placeholder="Hint Text"
                    variant="outlined"
                    name="hintText"
                    fullWidth
                    required
                    onChange={(e: any) =>
                      onChange(e.target.name, e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingBottom: '8px' }}>
                  {/* <TextField
                    label="Account Message Format"
                    placeholder="Hint Text"
                    variant="outlined"
                    fullWidth
                    required
                  /> */}
                  <TextEditor
                    title="Account Message Format:"
                    setEditorData={setEditorData}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingBottom: '8px' }}>
                  <TextField
                    type="text"
                    placeholder="Enter Account number length"
                    label="Account number length"
                    name="accountNumberLength"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e: any) =>
                      onChange(e.target.name, e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={1}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                    color="primary"
                    fullWidth>
                    Submit
                  </LoadingButton>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={() => router.push('/p2p')}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Authenticated(AddBank);
