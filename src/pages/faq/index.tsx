// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { faqCategoryTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import AddFaqCategory from 'src/views/faq/AddFaqCategory';
import { categoryService } from 'src/services';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditFaqCategory from 'src/views/faq/EditFaqCategory';
import faqService from 'src/services/faq.service';
import Authenticated from '../../@core/components/Authenticated';
import { useRouter } from 'next/router';

const FaqCategory = () => {
  const [addFaqCategoryModal, setAddFaqCategoryModal] = useState(false);
  const [editFaqCategoryModal, setEditFaqCategoryModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allFaqCategories, setAllFaqCategories] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [modalLoading, setModalLoading] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    getFaqCategory();
  }, []);

  const getFaqCategory = async () => {
    if (!loading) setLoading(true);
    const data: any = await faqService.getFaqCategories();
    if (data) {
      setAllFaqCategories([...data]);
    }
    setLoading(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditFaqCategoryModal(true);
    setSelectedRow({ ...allFaqCategories?.[meta?.rowIndex] });
  };

  const editCategory = async (data: any) => {
    setModalLoading(true);
    data.id = selectedRow.id;
    const setDataForPost = Object.assign({}, selectedRow, data);
    const res: any = await faqService.editFaqCategory(setDataForPost);
    if (res) {
      setModalLoading(false);
      getFaqCategory();
    }
    setEditFaqCategoryModal(false);
  };

  const redirectAction = (value: any, meta: any) => {
    let categoryId = allFaqCategories?.[meta?.rowIndex]?.id;
    router.push(`/faq/${categoryId}`);
  };

  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allFaqCategories?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setConfirmModal(false);
    const data: any = await faqService.deleteFaqCategory(selectedRow?.id);

    if (data) {
      getFaqCategory();
    }
  };

  const submitAddFaqCategory = async (data: any) => {
    setModalLoading(true);

    const res = await faqService.addFaqCategory(data);

    if (res) {
      setModalLoading(false);
      getFaqCategory();
    }
    setAddFaqCategoryModal(false);
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
                onClick={() => setAddFaqCategoryModal(true)}>
                Add Faq Category
              </Button>
              <br />
              <br />
              <TableStickyHeader
                columns={faqCategoryTableColumns({
                  editAction,
                  deleteAction,
                  redirectAction,
                })}
                rows={allFaqCategories}
                options={{
                  selectableRows: false,
                }}
                title="FAQ Categories"
              />
            </Card>
          </Grid>
          <AddFaqCategory
            open={addFaqCategoryModal}
            handleClose={() => setAddFaqCategoryModal(false)}
            onSubmit={submitAddFaqCategory}
            loading={modalLoading}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content={`Are you sure?`}
          />
          <EditFaqCategory
            open={editFaqCategoryModal}
            handleClose={() => setEditFaqCategoryModal(false)}
            onSubmit={editCategory}
            data={selectedRow}
            loading={modalLoading}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(FaqCategory);
// export default FaqCategory;
