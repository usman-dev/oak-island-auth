// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { feedbackTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import AddFeedbackCategory from 'src/views/feedbacks/addFeedbackCategory';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditFeedback from 'src/views/feedbacks/editFeedbackCategory';
import feedbackService from 'src/services/feedback.category.service';
import Authenticated from '../../@core/components/Authenticated';

const Feedback = () => {
  const [addFeedbackModal, setAddFeedbackModal] = useState(false);
  const [editFeedbackModal, setEditFeedbackModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const [modalLoading, setModalLoading] = useState<any>(false);

  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = async () => {
    if (!loading) setLoading(true);
    const data: any = await feedbackService.getFeedbackCategory();
    if (data) {
      setAllFeedbacks([...data]);
    }
    setLoading(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditFeedbackModal(true);
    setSelectedRow({ ...allFeedbacks?.[meta?.rowIndex] });
  };

  const editCategory = async (data: any) => {
    setModalLoading(true);
    data.categoryID = selectedRow.id;
    const res: any = await feedbackService.editFeedbackCategory(data);
    if (res) {
      setEditFeedbackModal(false);
      getFeedbacks();
    }
    setModalLoading(false);
  };

  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allFeedbacks?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await feedbackService.deleteFeedbackCategory(
      selectedRow?.id,
    );

    if (data) {
      setConfirmModal(false);
      getFeedbacks();
    }
    setModalLoading(false);
  };

  const submitAddFeedback = async (data: any) => {
    setModalLoading(true);

    const res = await feedbackService.addFeedbackCategory(data);

    if (res) {
      setAddFeedbackModal(false);
      getFeedbacks();
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
                onClick={() => setAddFeedbackModal(true)}>
                Add Category
              </Button>
              <br />
              <br />
              <TableStickyHeader
                columns={feedbackTableColumns({ editAction, deleteAction })}
                rows={allFeedbacks}
                options={{
                  selectableRows: false,
                }}
                title="Feedback Categories"
              />
            </Card>
          </Grid>
          <AddFeedbackCategory
            open={addFeedbackModal}
            handleClose={() => setAddFeedbackModal(false)}
            handleSubmit={submitAddFeedback}
            loading={modalLoading}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content={`Are you sure?`}
            loading={modalLoading}
          />
          <EditFeedback
            open={editFeedbackModal}
            handleClose={() => setEditFeedbackModal(false)}
            handleSubmit={editCategory}
            data={selectedRow}
            loading={modalLoading}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(Feedback);
// export default Faq;
