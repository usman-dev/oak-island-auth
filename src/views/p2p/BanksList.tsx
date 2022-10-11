import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { bankTableColumns } from 'src/helpers/constants';
import { Button, Grid, Card, Box, CircularProgress } from '@mui/material';
import productService from '../../services/product.service';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditBank from 'src/views/bank/EditBank';

const BankList = ({ banksData, getBank }) => {
  const router = useRouter();
  const [editBankModal, setEditBankModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});

  // useEffect(() => {}, []);

  const editAction = (value: any, meta: any) => {
    setEditBankModal(true);
    setSelectedRow({ ...banksData?.[meta?.rowIndex] });
  };

  const editBank = async (data: any, editorData: any) => {
    setEditBankModal(false);
    data.id = selectedRow.id;
    const res: any = await productService.editBank(data, editorData);
    if (res) {
      getBank('bank');
    }
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...banksData?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setConfirmModal(false);
    const data: any = await productService.deleteBank(selectedRow?.id);

    if (data) {
      getBank('bank');
    }
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 4 }}>
            <Button
              variant="contained"
              onClick={() => {
                router.push('/banks/add');
              }}>
              Add Bank
            </Button>
            <br />
            <br />
            <TableStickyHeader
              columns={bankTableColumns({ editAction, deleteAction })}
              rows={banksData}
              options={{
                selectableRows: false,
              }}
              title="Banks"
            />
          </Card>
        </Grid>
        <ConfirmDialog
          open={isConfirmModal}
          handleClose={() => setConfirmModal(false)}
          handleSubmit={handleConfirmDelete}
          content={`Are you sure?`}
        />
        <EditBank
          open={editBankModal}
          handleClose={() => setEditBankModal(false)}
          handleSubmit={editBank}
          data={selectedRow}
        />
      </Grid>
    </>
  );
};

export default BankList;
