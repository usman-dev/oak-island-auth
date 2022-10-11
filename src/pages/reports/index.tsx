// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { registerReportTableColumns, accStatus } from 'src/helpers/constants';
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
  CardHeader,
  IconButton,
  Collapse,
  CardContent,
} from '@mui/material';
import reportService from 'src/services/reports.service';
import Authenticated from '../../@core/components/Authenticated';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RegistrationReports from 'src/views/reports/RegistrationReports';
import ReferralReports from 'src/views/reports/ReferralReports';

const currentDate = new Date();

const Reports = () => {
  const [regOpen, setRegOpen] = useState(false);
  const [refOpen, setRefOpen] = useState(false);
  // const [data, setData] = useState([]);
  // const [formData, setFormData] = useState<any>({
  //   phoneNumber: '',
  //   accountStatus: '',
  //   startDate: '',
  //   endDate: '',
  // });
  // const [users, setAllUsers] = useState<any>({});
  // const [loading, setLoading] = useState<any>(true);

  // const val =
  //   formData.phoneNumber === '' || formData.phoneNumber
  //     ? formData.phoneNumber
  //     : '';

  // useEffect(() => {
  //   getReports();
  // }, []);

  // const getReports = async () => {
  //   if (!loading) setLoading(true);

  //   const data: any = await reportService.getRegistationReports();

  //   if (data) {
  //     setAllUsers({ ...data });
  //     setData(data.users);
  //   }
  //   setLoading(false);
  // };

  // const onApplyFilter = async () => {
  //   setLoading(true);
  //   const setDataForPost: any = {};
  //   setDataForPost.fromDate = formData.startDate;
  //   setDataForPost.toDate = formData.endDate;
  //   if (formData.phoneNumber) {
  //     setDataForPost.phoneNumber = formData.phoneNumber;
  //   }
  //   if (formData.accountStatus) {
  //     setDataForPost.accountStatus = formData.accountStatus;
  //   }
  //   const data: any = await reportService.getRegistationReports(setDataForPost);
  //   if (data) {
  //     setData(data.users);
  //   }
  //   setLoading(false);
  // };

  // const onClearFilter = async () => {
  //   setLoading(true);
  //   setFormData({
  //     phoneNumber: '',
  //     accountStatus: '',
  //     startDate: '',
  //     endDate: '',
  //   });
  //   const data: any = await reportService.getRegistationReports();
  //   if (data) {
  //     setData(data.users);
  //   }

  //   setLoading(false);
  // };

  // const onChange = (field: any, value: any) => {
  //   let updatedValue = {};
  //   updatedValue = { [field]: value };
  //   setFormData((formData: any) => ({
  //     ...formData,
  //     ...updatedValue,
  //   }));
  // };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 1 }}>
            <CardHeader
              title="Registration Report"
              action={
                <IconButton
                  onClick={() => setRegOpen(!regOpen)}
                  aria-label="expand"
                  size="small">
                  {regOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              }></CardHeader>
            <Collapse in={regOpen} unmountOnExit>
              <RegistrationReports />
            </Collapse>
          </Card>
          <br />
          <Card sx={{ p: 1 }}>
            <CardHeader
              title="Referral Report"
              action={
                <IconButton
                  onClick={() => setRefOpen(!refOpen)}
                  aria-label="expand"
                  size="small">
                  {refOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              }></CardHeader>
            <Collapse in={refOpen} unmountOnExit>
              <ReferralReports />
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Authenticated(Reports);
// export default Faq;
