// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { billCategoryTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Box } from '@mui/material';
import AddBillCategory from 'src/views/bill-details/bill-category/AddBillCategory';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditBillCategory from 'src/views/bill-details/bill-category/EditBillCategory';
import billService from 'src/services/bill.service';
import Authenticated from 'src/@core/components/Authenticated';
import AddBillAmountInfo from 'src/views/bill-details/AddBillAmountInfo';

const BillCategory = () => {
  const [addBillCategoryModal, setAddBillCategoryModal] = useState(false);
  const [editBillCategoryModal, setEditBillCategoryModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [file, setFile] = useState<any>([]);
  const [allBillCategories, setAllBillCategories] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLodaing] = useState<any>(true);
  const [modalLoading, setModalLoading] = useState<any>(false);
  const router = useRouter();

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
    getBillCategory();
  }, []);

  const getBillCategory = async () => {
    if (!loading) setLodaing(true);
    const data: any = await billService.getBillCategories();
    if (data) {
      setAllBillCategories([...data]);
    }
    setLodaing(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditBillCategoryModal(true);
    setSelectedRow({ ...allBillCategories?.[meta?.rowIndex] });
  };

  const redirectAction = (value: any, meta: any) => {
    let categoryId = allBillCategories?.[meta?.rowIndex]?.id;
    router.push(`/bill-category/${categoryId}/bill-company`);
  };

  const editCategory = async (data: any, file: any) => {
    setModalLoading(true);

    let setDataForPost = {
      id: selectedRow.id,
      categoryName: data.categoryName,
      key: data.key,
      file,
    };

    const res: any = await billService.editBillCategory(setDataForPost);
    if (res) {
      setEditBillCategoryModal(false);
      getBillCategory();
    }
    setModalLoading(false);
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allBillCategories?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await billService.deleteBillCategory(selectedRow?.id);

    if (data) {
      setConfirmModal(false);
      getBillCategory();
    }
    setModalLoading(false);
  };

  const submitAddBillCategory = async (billCategoryName: any) => {
    setModalLoading(true);
    let data = { categoryName: billCategoryName };

    const res = await billService.addBillCategory(data, file);

    if (res) {
      setFile([]);
      setAddBillCategoryModal(false);
      getBillCategory();
    }
    setModalLoading(false);
  };

  const handleAddModal = () => {
    setAddBillCategoryModal(false);
    setFile([]);
  };

  const handleEditModal = () => {
    setEditBillCategoryModal(false);
    setFile([]);
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
          <AddBillAmountInfo />
          <br />
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card sx={{ p: 4 }}>
                <Button
                  variant="contained"
                  onClick={() => setAddBillCategoryModal(true)}>
                  Add Bill Category
                </Button>
                <br />
                <br />
                <TableStickyHeader
                  columns={billCategoryTableColumns({
                    editAction,
                    deleteAction,
                    redirectAction,
                  })}
                  rows={allBillCategories}
                  title="Bill Categories"
                  options={{
                    selectableRows: false,
                  }}
                />
              </Card>
            </Grid>
            <AddBillCategory
              open={addBillCategoryModal}
              handleClose={() => handleAddModal()}
              handleSubmit={submitAddBillCategory}
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
            <EditBillCategory
              open={editBillCategoryModal}
              handleClose={() => handleEditModal()}
              handleSubmit={editCategory}
              data={selectedRow}
              loading={modalLoading}
              getRootProps={getRootfileProps}
              getInputProps={getInputfileProps}
              file={file}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Authenticated(BillCategory);
