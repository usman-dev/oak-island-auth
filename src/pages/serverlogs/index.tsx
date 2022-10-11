// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { logsTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { CircularProgress, Typography, TextField, Button } from '@mui/material';
import logsService from 'src/services/logs.service';
import Authenticated from '../../@core/components/Authenticated';

const limit = 50;
const currentDate = new Date();

const Faq = () => {
  const [formData, setFormData] = useState({
    startDate: currentDate.toLocaleDateString('en-CA'),
    endDate: currentDate.toLocaleDateString('en-CA'),
  });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [allFaqs, setAllFaqs] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    getFaq();
  }, []);

  const getFaq = async () => {
    if (!loading) setLoading(true);
    const setDataForPost = {
      page,
      limit,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    const data: any = await logsService.getLogs(setDataForPost);

    if (data) {
      setAllFaqs({ ...data });
      setData(data.dataItems);
    }
    setLoading(false);
  };

  const onApplyFilter = async () => {
    setLoading(true);
    const setDataForPost = {
      page,
      limit,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    const data: any = await logsService.getLogs(setDataForPost);
    if (data) {
      setPage(0);
      setAllFaqs({ ...data });
      setData(data.dataItems);
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

  const changePage = async (page) => {
    window.scrollTo(0, 0);
    setLoading(true);
    const setDataForPost = {
      page,
      limit,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    const data: any = await logsService.getLogs(setDataForPost);
    if (data) {
      setPage(page);
      setAllFaqs({ ...data });
      setData(data.dataItems);
    }
    setLoading(false);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 4 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <TextField
                type="date"
                label="Start Date"
                variant="outlined"
                style={{ margin: 10 }}
                onChange={(e) => onChange('startDate', e.target.value)}
                defaultValue={formData.startDate}
              />
              <TextField
                type="date"
                label="End Date"
                style={{ margin: 10 }}
                variant="outlined"
                defaultValue={formData.endDate}
              />
              <Button
                disabled={loading}
                variant="contained"
                style={{ margin: 10 }}
                onClick={onApplyFilter}>
                Filter
              </Button>
            </div>
            <br />
            <TableStickyHeader
              columns={logsTableColumns()}
              rows={data}
              options={{
                selectableRows: false,
                serverSide: true,
                rowsPerPage: limit,
                rowsPerPageOptions: [limit],
                page: page,
                count: allFaqs.totalRecords,
                onTableChange: (action, tableState) => {
                  if (action === 'changePage') {
                    changePage(tableState.page);
                  }
                },
              }}
              title={
                <Typography variant="h6">
                  Server Logs
                  {loading && (
                    <CircularProgress
                      size={24}
                      style={{ marginLeft: 15, position: 'relative', top: 4 }}
                    />
                  )}
                </Typography>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Authenticated(Faq);
// export default Faq;
