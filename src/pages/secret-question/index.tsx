// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { secretQuestionTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { Button, CircularProgress, Box } from '@mui/material';
import AddSecretQuestion from 'src/views/secret-question/AddSecretQuestion';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditSecretQuestion from 'src/views/secret-question/EditSecretQuestion';
import secretQuestionService from 'src/services/secretQuestion.service';
import Authenticated from 'src/@core/components/Authenticated';

const SecretQuestion = () => {
  const [addSecretQuestionModal, setAddSecretQuestionModal] = useState(false);
  const [editSecretQuestionModal, setEditSecretQuestionModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allSecretQuestions, setAllSecretQuestions] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [modalLoading, setModalLoading] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    getSecretQuestion();
  }, []);

  const getSecretQuestion = async () => {
    if (!loading) setLoading(true);
    const data: any = await secretQuestionService.getSecretQuestions();
    if (data) {
      setAllSecretQuestions([...data]);
    }
    setLoading(false);
  };

  const editAction = (type: any = '', value: any, meta: any) => {
    setSelectedRow({ ...allSecretQuestions?.[meta?.rowIndex] });
    let data1 = {
      id: allSecretQuestions?.[meta?.rowIndex]?.id,
      visible: value,
    };
    if (type === 'show') {
      editCategory(data1);
    } else {
      setEditSecretQuestionModal(true);
    }
  };

  const editCategory = async (secretQuestion: any) => {
    setModalLoading(true);
    // let data = secretQuestion;
    // data.id = selectedRow?.id || secretQuestion?.id;

    let data1 = { id: selectedRow?.id, ...secretQuestion };
    const setDataForPost = Object.assign({}, selectedRow, data1);
    const res: any = await secretQuestionService.editSecretQuestion(
      setDataForPost,
    );
    if (res) {
      setEditSecretQuestionModal(false);
      getSecretQuestion();
    }
    setModalLoading(false);
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allSecretQuestions?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await secretQuestionService.deleteSecretQuestion(
      selectedRow?.id,
    );

    if (data) {
      setConfirmModal(false);
      getSecretQuestion();
    }
    setModalLoading(false);
  };

  const submitAddSecretQuestion = async (secretQuestion: any) => {
    // let data = { categoryName: secretQuestionName };
    setModalLoading(true);

    const res = await secretQuestionService.addSecretQuestion(secretQuestion);

    if (res) {
      setAddSecretQuestionModal(false);
      getSecretQuestion();
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
                onClick={() => setAddSecretQuestionModal(true)}>
                Add Secret Question
              </Button>

              <br />
              <br />
              <TableStickyHeader
                columns={secretQuestionTableColumns({
                  editAction,
                  deleteAction,
                })}
                rows={allSecretQuestions}
                options={{
                  selectableRows: false,
                }}
                title="Secret Questions"
              />
            </Card>
          </Grid>
          <AddSecretQuestion
            open={addSecretQuestionModal}
            handleClose={() => setAddSecretQuestionModal(false)}
            onSubmit={submitAddSecretQuestion}
            loading={modalLoading}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content={`Are you sure?`}
            loading={modalLoading}
          />
          <EditSecretQuestion
            open={editSecretQuestionModal}
            handleClose={() => setEditSecretQuestionModal(false)}
            onSubmit={editCategory}
            data={selectedRow}
            loading={modalLoading}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(SecretQuestion);
