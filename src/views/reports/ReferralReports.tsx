// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { referralReportTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import {
  CircularProgress,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { reportService } from 'src/services';

const currentDate = new Date();

const ReferralReports = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState<any>({
    phoneNumber: '',
    referralCode: '',
    startDate: '',
    endDate: '',
  });
  const [records, setAllRecords] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

  const val =
    formData.phoneNumber === '' || formData.phoneNumber
      ? formData.phoneNumber
      : '';

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    if (!loading) setLoading(true);

    const data: any = await reportService.getReferralReports();

    if (data) {
      setAllRecords({ ...data });
      setData(data.orderedRecords);
    }
    setLoading(false);
  };

  const onApplyFilter = async () => {
    setLoading(true);
    const setDataForPost: any = {};
    setDataForPost.fromDate = formData.startDate;
    setDataForPost.toDate = formData.endDate;
    if (formData.phoneNumber) {
      setDataForPost.phoneNumber = formData.phoneNumber;
    }
    if (formData.referralCode) {
      setDataForPost.referralCode = formData.referralCode;
    }
    const data: any = await reportService.getReferralReports(setDataForPost);

    if (data) {
      setAllRecords({ ...data });
      setData(data.orderedRecords);
    }
    setLoading(false);
  };

  const onClearFilter = async () => {
    setLoading(true);
    setFormData({
      phoneNumber: '',
      referralCode: '',
      startDate: '',
      endDate: '',
    });
    const data: any = await reportService.getReferralReports();
    if (data) {
      setAllRecords({ ...data });
      setData(data.orderedRecords);
    }

    setLoading(false);
  };

  const onChange = (field: any, value: any) => {
    let updatedValue = {};
    updatedValue = { [field]: value };
    setFormData((formData: any) => ({
      ...formData,
      ...updatedValue,
    }));
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 10,
            }}>
            {/* <TextField
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              style={{ margin: 10 }}
              className="date"
              onChange={(e) => onChange('startDate', e.target.value)}
              value={formData.startDate}
            />
            <TextField
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              className="date"
              style={{ margin: 10 }}
              variant="outlined"
              onChange={(e) => onChange('endDate', e.target.value)}
              value={formData.endDate}
            /> */}
            <TextField
              type="number"
              label="From MSISDN"
              variant="outlined"
              value={val}
              style={{ margin: 10 }}
              onChange={(e) => onChange('phoneNumber', e.target.value)}
            />
            <FormControl style={{ width: '20%' }}>
              <TextField
                label="Referral Code"
                variant="outlined"
                value={formData.referralCode}
                style={{ margin: 10 }}
                onChange={(e) => onChange('referralCode', e.target.value)}
              />
            </FormControl>
            <Button
              disabled={loading}
              variant="contained"
              style={{ margin: 10 }}
              onClick={onApplyFilter}>
              Filter
            </Button>
            <Button
              disabled={loading}
              style={{ margin: 10 }}
              onClick={onClearFilter}>
              clear
            </Button>
          </div>
          {!loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Typography>
                <b>Accepted Invites:</b> {records && records.acceptedInvites}{' '}
              </Typography>
              <Typography style={{ marginLeft: 20 }}>
                <b>Pending Invites:</b> {records && records.pendingInvites}
              </Typography>
            </div>
          ) : null}
          <br />
          <TableStickyHeader
            columns={referralReportTableColumns()}
            rows={data}
            options={{
              rowsPerPage: 50,
              selectableRows: false,
            }}
            title={
              <Typography variant="h6">
                Registration Report
                {loading && (
                  <CircularProgress
                    size={24}
                    style={{
                      marginLeft: 15,
                      position: 'relative',
                      top: 4,
                    }}
                  />
                )}
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ReferralReports;
// export default Faq;
