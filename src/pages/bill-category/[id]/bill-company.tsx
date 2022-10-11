// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { billCompanyTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { Button, CircularProgress, Box } from '@mui/material';
import AddBillCompany from 'src/views/bill-details/bill-company/AddBillCompany';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditBillCompany from 'src/views/bill-details/bill-company/EditBillCompany';
import billService from 'src/services/bill.service';
import Authenticated from 'src/@core/components/Authenticated';
import { useDropzone } from 'react-dropzone';

const BillCompany = () => {
  const [addBillCompanyModal, setAddBillCompanyModal] = useState(false);
  const [editBillCompanyModal, setEditBillCompanyModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allBillCompanies, setAllBillCompanies] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [file, setFile] = useState<any>([]);
  const [modalLoading, setModalLoading] = useState<any>(false);
  const router = useRouter();
  const categoryId = router.query.id;

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
    if (categoryId) {
      getBillCompany(categoryId);
    }
  }, [categoryId]);

  const getBillCompany = async (categoryId: any) => {
    if (!loading) setLoading(true);
    const data: any = await billService.getBillCompanies(categoryId);
    if (data) {
      setAllBillCompanies([...data]);
    }
    setLoading(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditBillCompanyModal(true);
    setSelectedRow({ ...allBillCompanies?.[meta?.rowIndex] });
  };

  const editCategory = async (billCompany: any) => {
    setModalLoading(true);
    let data = billCompany;
    data.id = selectedRow?.id;
    const res: any = await billService.editBillCompany(data, file);
    if (res) {
      setEditBillCompanyModal(false);
      setFile([]);
      getBillCompany(categoryId);
    }
    setModalLoading(false);
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allBillCompanies?.[meta?.rowIndex] });
  };

  const handleAddModalClose = () => {
    setAddBillCompanyModal(false);
    setFile([]);
  };

  const handleEditModalClose = () => {
    setEditBillCompanyModal(false);
    setFile([]);
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await billService.deleteBillCompany(selectedRow?.id);

    if (data) {
      setConfirmModal(false);
      getBillCompany(categoryId);
    }
    setModalLoading(false);
  };

  const submitAddBillCompany = async (billCompany: any) => {
    // let data = { categoryName: billCompanyName };
    setModalLoading(true);
    billCompany.billCategory = categoryId;

    const res = await billService.addBillCompany(billCompany, file);

    if (res) {
      setAddBillCompanyModal(false);
      setFile([]);
      getBillCompany(categoryId);
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
              <Button
                variant="contained"
                onClick={() => setAddBillCompanyModal(true)}>
                Add Bill Company
              </Button>

              <Button
                variant="contained"
                sx={{ marginLeft: '4px' }}
                color="secondary"
                onClick={() => router.push('/bill-category')}>
                Bill Categories
              </Button>
              <br />
              <br />
              <TableStickyHeader
                columns={billCompanyTableColumns({
                  editAction,
                  deleteAction,
                })}
                rows={allBillCompanies}
                title="Bill Companies"
                options={{
                  selectableRows: false,
                }}
              />
            </Card>
          </Grid>
          <AddBillCompany
            open={addBillCompanyModal}
            handleClose={handleAddModalClose}
            handleSubmit={submitAddBillCompany}
            loading={modalLoading}
            getRootProps={getRootfileProps}
            getInputProps={getInputfileProps}
            file={file}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content={`Are you sure?`}
            loading={modalLoading}
          />
          <EditBillCompany
            open={editBillCompanyModal}
            handleClose={handleEditModalClose}
            handleSubmit={editCategory}
            data={selectedRow}
            loading={modalLoading}
            getRootProps={getRootfileProps}
            getInputProps={getInputfileProps}
            file={file}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(BillCompany);
