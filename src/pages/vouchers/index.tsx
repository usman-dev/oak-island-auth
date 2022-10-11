// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { vouchersTableColumns } from 'src/helpers/constants';
import { useContext, useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { Button, CircularProgress, Box } from '@mui/material';
import AddVoucher from 'src/views/vouchers/addVoucher';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditVoucher from 'src/views/vouchers/editVoucher';
import voucherService from 'src/services/voucher.service';
import Authenticated from 'src/@core/components/Authenticated';
import { AuthContext } from 'src/context/auth/AuthContext';

const Vouchers = () => {
  const [addSecretQuestionModal, setAddSecretQuestionModal] = useState(false);
  const [editSecretQuestionModal, setEditSecretQuestionModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allVouchers, setAllVouchers] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [modalLoading, setModalLoading] = useState<any>(false);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const router = useRouter();

  user?.role != 'SUPER_ADMIN' && router.back();

  useEffect(() => {
    getVouchers();
  }, []);

  const getVouchers = async () => {
    if (!loading) setLoading(true);
    const data: any = await voucherService.getVoucher();
    if (data) {
      setAllVouchers([...data]);
    }
    setLoading(false);
  };

  const editAction = (type: any = '', value: any, meta: any) => {
    setSelectedRow({ ...allVouchers?.[meta?.rowIndex] });
    let data1 = {
      id: allVouchers?.[meta?.rowIndex]?.id,
      isEnabled: value,
    };
    if (type === 'show') {
      editCategory(data1);
    } else {
      setEditSecretQuestionModal(true);
    }
  };

  const editCategory = async (data: any) => {
    setModalLoading(true);

    let data1 = { id: selectedRow?.id, ...data };
    const setDataForPost = Object.assign({}, selectedRow, data1);
    const res: any = await voucherService.editVoucher(setDataForPost);
    if (res) {
      setEditSecretQuestionModal(false);
      getVouchers();
    }
    setModalLoading(false);
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allVouchers?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    selectedRow.isDeleted = true;
    const data: any = await voucherService.editVoucher(selectedRow);

    if (data) {
      setConfirmModal(false);
      getVouchers();
    }
    setModalLoading(false);
  };

  const submitCampaign = async (data: any) => {
    // let data = { categoryName: secretQuestionName };
    setModalLoading(true);

    const res = await voucherService.addVoucher(data);

    if (res) {
      setAddSecretQuestionModal(false);
      getVouchers();
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
                Add Voucher
              </Button>

              <br />
              <br />
              <TableStickyHeader
                columns={vouchersTableColumns({
                  editAction,
                  deleteAction,
                })}
                rows={allVouchers}
                options={{
                  selectableRows: false,
                }}
                title="Vouchers"
              />
            </Card>
          </Grid>
          <AddVoucher
            open={addSecretQuestionModal}
            handleClose={() => setAddSecretQuestionModal(false)}
            onSubmit={submitCampaign}
            loading={modalLoading}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content={`Are you sure?`}
            loading={modalLoading}
          />
          <EditVoucher
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

export default Authenticated(Vouchers);
