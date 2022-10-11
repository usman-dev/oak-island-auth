// ** MUI Imports
import { Grid, Card, Button, Box, CircularProgress } from '@mui/material';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { topupColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import Authenticated from 'src/@core/components/Authenticated';
import { topupService } from 'src/services';
import AddTopup from 'src/views/topup/AddTopup';
import EditTopup from 'src/views/topup/EditTopup';
import AddTopUpAmountInfo from 'src/views/topup/AddTopUpAmountInfo';
import { useDropzone } from 'react-dropzone';

const Topup = () => {
  const [addTopupModal, setAddTopupModal] = useState(false);
  const [editTopup, setEditTopup] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allTopups, setAllTopups] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [file, setFile] = useState<any>([]);
  const [modalLoading, setModalLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const { getRootProps: getRootfileProps, getInputProps: getInputfileProps } =
    useDropzone({
      accept: {
        'image/jpeg': ['.jpeg', '.png'],
      },
      multiple: true,
      onDrop: async (acceptedFiles, rejectedFiles) => {
        const acceptfiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );
        setFile(acceptfiles);
      },
    });

  useEffect(() => {
    getTopup();
  }, []);

  const getTopup = async () => {
    setLoading(true);
    const data: any = await topupService.getTopups();
    if (data) {
      setAllTopups([...data]);
    }
    setLoading(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditTopup(true);
    setSelectedRow({ ...allTopups?.[meta?.rowIndex] });
  };

  const editTopupAction = async (topup: any) => {
    setModalLoading(true);
    let data = topup;
    data.id = selectedRow?.id;
    const res: any = await topupService.editTopup(data, file);
    if (res) {
      setEditTopup(false);
      setFile([]);
      getTopup();
    }
    setModalLoading(false);
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allTopups?.[meta?.rowIndex] });
  };

  const handleAddModalClose = () => {
    setAddTopupModal(false);
    setFile([]);
  };

  const handleEditModalClose = () => {
    setEditTopup(false);
    setFile([]);
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await topupService.deleteTopup({ id: selectedRow?.id });

    if (data) {
      setConfirmModal(false);
      getTopup();
    }
    setModalLoading(false);
  };

  const submitAddTopup = async (topup: any) => {
    setModalLoading(true);
    const res = await topupService.addTopup(topup, file);

    if (res) {
      setAddTopupModal(false);
      setFile([]);
      getTopup();
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
        <>
          <AddTopUpAmountInfo />
          <br />
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card sx={{ p: 4 }}>
                <Button
                  variant="contained"
                  onClick={() => setAddTopupModal(true)}>
                  Add Topup
                </Button>
                <br />
                <br />
                <TableStickyHeader
                  columns={topupColumns({
                    editAction,
                    deleteAction,
                  })}
                  rows={allTopups}
                  title="Topups"
                  options={{
                    selectableRows: false,
                  }}
                />
              </Card>
            </Grid>
            <AddTopup
              open={addTopupModal}
              handleClose={handleAddModalClose}
              handleSubmit={submitAddTopup}
              getRootProps={getRootfileProps}
              getInputProps={getInputfileProps}
              file={file}
              loading={modalLoading}
            />
            <ConfirmDialog
              open={isConfirmModal}
              handleClose={() => setConfirmModal(false)}
              handleSubmit={handleConfirmDelete}
              content={`Are you sure?`}
              loading={modalLoading}
            />
            <EditTopup
              open={editTopup}
              handleClose={handleEditModalClose}
              handleSubmit={editTopupAction}
              getRootProps={getRootfileProps}
              getInputProps={getInputfileProps}
              file={file}
              data={selectedRow}
              loading={modalLoading}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Authenticated(Topup);
