// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { faqTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { Button, CircularProgress, Box } from '@mui/material';
import AddFaq from 'src/views/faq/faqContent/AddFaq';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditFaq from 'src/views/faq/faqContent/EditFaq';
import faqService from 'src/services/faq.service';
import Authenticated from 'src/@core/components/Authenticated';
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

const Faq = () => {
  const [addFaqModal, setAddFaqModal] = useState(false);
  const [editFaqModal, setEditFaqModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allFaqs, setAllFaqs] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [modalLoading, setModalLoading] = useState<any>(false);
  const router = useRouter();
  const categoryId = router.query.id;

  useEffect(() => {
    if (categoryId) {
      getFaq(categoryId);
    }
  }, [categoryId]);

  const getFaq = async (categoryId: any) => {
    if (!loading) setLoading(true);
    const data: any = await faqService.getFaqs(categoryId);
    if (data) {
      setAllFaqs([...data]);
    }
    setLoading(false);
  };

  const editAction = (type: any, value: any, meta: any) => {
    setSelectedRow({ ...allFaqs?.[meta?.rowIndex] });

    let data1 = {
      id: allFaqs?.[meta?.rowIndex]?.id,
      visible: value,
    };

    if (type === 'show') {
      editToggleFaq(data1);
    } else {
      setEditFaqModal(true);
    }
  };

  const editCategory = async (faq: any) => {
    setModalLoading(true);
    let data = faq;
    data.id = selectedRow?.id || faq?.id;
    const setDataForPost = Object.assign({}, selectedRow, data);
    const res: any = await faqService.editFaq(setDataForPost);
    if (res) {
      setEditFaqModal(false);
      getFaq(categoryId);
    }
    setModalLoading(false);
  };

  const editToggleFaq = async (data: any) => {
    setModalLoading(true);
    let data1 = { id: selectedRow.id, ...data };
    const res: any = await faqService.editFaq({
      ...data1,
    });
    if (res) {
      setEditFaqModal(false);
      getFaq(categoryId);
    }
    setModalLoading(false);
  };

  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allFaqs?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await faqService.deleteFaq(selectedRow?.id);

    if (data) {
      setConfirmModal(false);
      getFaq(categoryId);
    }
    setModalLoading(false);
  };

  const submitAddFaq = async (faq: any) => {
    // let data = { categoryName: faqName };
    setModalLoading(true);
    faq.category = categoryId;

    const res = await faqService.addFaq(faq);

    if (res) {
      setAddFaqModal(false);
      getFaq(categoryId);
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
                  onClick={() => router.push('/faq')}
                  style={backIconStyling}>
                  <span>
                    <ArrowBackIcon fontSize="small" />
                  </span>
                  <span style={{ margin: 7 }}>Back</span>
                </div>
                <Button
                  variant="contained"
                  onClick={() => setAddFaqModal(true)}>
                  Add FAQ
                </Button>
              </div>
              <br />
              <br />
              <TableStickyHeader
                columns={faqTableColumns({
                  editAction,
                  deleteAction,
                })}
                rows={allFaqs}
                options={{
                  selectableRows: false,
                }}
                title="Frequently Asked Questions"
              />
            </Card>
          </Grid>
          <AddFaq
            open={addFaqModal}
            handleClose={() => setAddFaqModal(false)}
            onSubmit={submitAddFaq}
            loading={modalLoading}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content={`Are you sure?`}
            loading={modalLoading}
          />
          <EditFaq
            open={editFaqModal}
            handleClose={() => setEditFaqModal(false)}
            onSubmit={editCategory}
            data={selectedRow}
            loading={modalLoading}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(Faq);
