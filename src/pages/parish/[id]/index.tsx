// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { parishTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import AddParish from 'src/views/parish/AddParish';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditParish from 'src/views/parish/EditParish';
import parishService from 'src/services/parish.service';
import Authenticated from '../../../@core/components/Authenticated';
import CsvBulkUpload from 'src/@core/components/CsvBulkUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const backIconStyling = {
  margin: 10,
  border: '0.1em solid grey',
  borderRadius: '10%',
  cursor: 'pointer',
  padding: '0px 5px',
  display: 'flex',
  alignItems: 'center',
};

const Parish = () => {
  const router = useRouter();
  const countryId: any = router.query.id;
  const [addParishModal, setAddParishModal] = useState(false);
  const [editParishModal, setEditParishModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allParishs, setAllParishs] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [modalLoading, setModalLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const [bulk, setBulk] = useState(false);

  useEffect(() => {
    if (countryId) {
      getParish(countryId);
    }
  }, [countryId]);

  const getParish = async (countryId: any) => {
    if (!loading) setLoading(true);
    const data: any = await parishService.getParishs(countryId);

    if (data) {
      setAllParishs([...data]);
    }
    setLoading(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditParishModal(true);
    setSelectedRow({ ...allParishs?.[meta?.rowIndex] });
  };

  const editCategory = async (parishName: any, towns: any = null) => {
    setModalLoading(true);
    let data: any;

    if (towns != null) {
      data = { parishName, towns };
    } else {
      data = { parishName, towns: [] };
    }
    data.id = selectedRow.id;

    const res: any = await parishService.editParish(data);

    if (res) {
      setEditParishModal(false);
      getParish(countryId);
    }
    setModalLoading(false);
  };

  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allParishs?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await parishService.deleteParish(selectedRow?.id);

    if (data) {
      setConfirmModal(false);
      getParish(countryId);
    }
    setModalLoading(false);
  };

  const submitAddParish = async (parishName: any, towns: any = null) => {
    setModalLoading(true);

    let data: any;
    if (towns != null) {
      data = { parishName, towns };
    } else {
      data = { parishName };
    }
    data.countryId = countryId;
    const res = await parishService.addParish(data);

    if (res) {
      setAddParishModal(false);
      getParish(countryId);
    }
    setModalLoading(false);
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  onClick={() => router.push('/parish')}
                  style={backIconStyling}>
                  <span>
                    <ArrowBackIcon fontSize="small" />
                  </span>
                  <span style={{ margin: 7 }}>Back</span>
                </div>
                <Button
                  variant="contained"
                  onClick={() => setAddParishModal(true)}>
                  Add Parish
                </Button>
              </div>
              <br />
              <br />
              <TableStickyHeader
                setBulk={setBulk}
                columns={parishTableColumns({ editAction, deleteAction })}
                rows={allParishs}
                options={{
                  selectableRows: false,
                  expandableRows: true,
                  renderExpandableRow: (rowData: any, rowMeta: any) => {
                    return (
                      <>
                        <tr>
                          <td colSpan={6}>
                            <TableContainer component={Paper}>
                              <Table
                                style={{ minWidth: '650' }}
                                aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Towns</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {allParishs[rowMeta.rowIndex]?.towns?.map(
                                    (town: any, index: any) =>
                                      town.townName !== '' && (
                                        <TableRow key={town.townName}>
                                          <TableCell component="th" scope="row">
                                            {index + 1}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                            {town.townName}
                                          </TableCell>
                                        </TableRow>
                                      ),
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </td>
                        </tr>
                      </>
                    );
                  },
                }}
                title="Parish and Towns"
                bulkButton={true}
              />
            </Card>
          </Grid>
          <AddParish
            open={addParishModal}
            handleClose={() => setAddParishModal(false)}
            handleSubmit={submitAddParish}
            loading={modalLoading}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content={`Are you sure?`}
            loading={modalLoading}
          />
          <EditParish
            open={editParishModal}
            handleClose={() => setEditParishModal(false)}
            handleSubmit={editCategory}
            data={selectedRow}
            loading={modalLoading}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(Parish);
// export default Parish;
