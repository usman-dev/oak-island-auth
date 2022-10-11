import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { usersTableColumns } from 'src/helpers/constants';
import { Button, Grid, Card, Box, CircularProgress } from '@mui/material';
import { usersService } from 'src/services';
// import toast from 'src/@core/components/Toast';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditUser from 'src/views/users/EditUser';
import Authenticated from '../../@core/components/Authenticated';
import { AuthContext } from 'src/context/auth/AuthContext';

const Users = () => {
  const router = useRouter();
  const [editModal, setEditModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [usersData, setUsersData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  user?.role != 'SUPER_ADMIN' && router.back();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    if (!loading) setLoading(true);
    const data: any = await usersService.getUsers();
    if (data) {
      setUsersData([...data]);
    }
    setLoading(false);
  };

  const editAction = async (type: any, value, meta: any) => {
    setSelectedRow({ ...usersData?.[meta?.rowIndex] });
    if (type === 'accountStatus') {
      const res: any = await usersService.editUser({
        id: usersData?.[meta?.rowIndex]?.id,
        accountStatus: value,
      });
      if (res) {
        getUsers();
      }
    } else {
      setEditModal(true);
    }
  };

  const editUser = async (data: any) => {
    setEditModal(false);
    data.id = selectedRow.id;
    const res: any = await usersService.editUser(data);
    if (res) {
      getUsers();
    }
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...usersData?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setConfirmModal(false);
    const data: any = await usersService.deleteUser({
      id: selectedRow?.id,
      userID: selectedRow?.userID,
    });

    if (data) {
      // toast({ type: 'success', message: 'User deleted successfuly!' });
      getUsers();
    }
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
                sx={{ mr: 2 }}
                onClick={() => {
                  router.push('/users/add-user');
                }}>
                Add User
              </Button>
              <br />
              <br />
              <TableStickyHeader
                columns={usersTableColumns({ editAction, deleteAction })}
                rows={usersData}
                options={{
                  selectableRows: false,
                }}
                title="Users"
              />
            </Card>
          </Grid>
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content="Are you sure?"
          />
          <EditUser
            open={editModal}
            handleClose={() => setEditModal(false)}
            onSubmit={editUser}
            data={selectedRow}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(Users);
// export default Users;
