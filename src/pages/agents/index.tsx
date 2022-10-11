import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { agentTableColumns } from 'src/helpers/constants';
import { Button, Grid, Card, Box, Tooltip } from '@mui/material';
import CsvBulkUpload from 'src/@core/components/CsvBulkUpload';
import { agentService } from 'src/services';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditAgent from 'src/views/agent/EditAgent';
import Authenticated from '../../@core/components/Authenticated';
import CircularProgress from '@mui/material/CircularProgress';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Agents = () => {
  const router = useRouter();
  const [editAgentModal, setEditAgentModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [agentsData, setAgentsData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  useEffect(() => {
    getAgent();
  }, []);

  const getAgent = async () => {
    if (!loading) setLoading(true);
    const data: any = await agentService.getAgents();
    if (data) {
      setAgentsData([...data]);
    }
    setLoading(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditAgentModal(true);
    setSelectedRow({ ...agentsData?.[meta?.rowIndex] });
  };

  const editAgent = async (data: any) => {
    setModalLoading(true);
    data.id = selectedRow.id;
    const setDataForPost = Object.assign({}, selectedRow, data);
    delete setDataForPost.address;
    delete setDataForPost.coordinates;
    const res: any = await agentService.editAgent(setDataForPost);
    if (res) {
      setEditAgentModal(false);
      getAgent();
    }
    setModalLoading(false);
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...agentsData?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await agentService.deleteAgent(selectedRow?.id);

    if (data) {
      setConfirmModal(false);
      getAgent();
    }
    setModalLoading(false);
  };

  const importCSV = async (result) => {
    const data = result.data;
    let allAgents = new Array();
    data.map((dataItem) => {
      delete Object.assign(dataItem, {
        ['parish']: dataItem['Parish'],
      })['Parish'];
      delete Object.assign(dataItem, {
        ['town']: dataItem['Community'],
      })['Community'];
      delete Object.assign(dataItem, {
        ['latitude']: dataItem['Latitude'],
      })['Latitude'];
      delete Object.assign(dataItem, {
        ['longitude']: dataItem['Longitude'],
      })['Longitude'];
      delete Object.assign(dataItem, {
        ['agentName']: dataItem['Location Name'],
      })['Location Name'];
    });

    const data1: any = await agentService.agentBulkUpload({ agents: data });

    if (data1) {
      getAgent();
    }
  };

  const [bulk, setBulk] = useState(false);
  // console.warn('bulk:', bulk);
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => {
                      router.push('/agents/add-agent');
                    }}>
                    Add Agent
                  </Button>
                </Box>
              </Box>

              <br />
              <br />
              <TableStickyHeader
                setBulk={setBulk}
                columns={agentTableColumns({ editAction, deleteAction })}
                rows={agentsData}
                options={{
                  selectableRows: false,
                  customToolbar: () => (
                    <>
                      <CsvBulkUpload
                        title="Bulk Upload"
                        uploadAction={importCSV}
                      />
                      <Tooltip title="Download Excel Template">
                        <Button
                          href="https://digicel-image.s3.amazonaws.com/templates/MyCash+Agent+Location+with+Communities+Template.xlsx"
                          target="_blank"
                          download>
                          <FileDownloadIcon />
                        </Button>
                      </Tooltip>
                    </>
                  ),
                }}
                title="Agents"
                bulkButton={true}
              />
            </Card>
          </Grid>
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content="Are you sure?"
            loading={modalLoading}
          />
          <EditAgent
            open={editAgentModal}
            handleClose={() => setEditAgentModal(false)}
            handleSubmit={editAgent}
            data={selectedRow}
            loading={modalLoading}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(Agents);
