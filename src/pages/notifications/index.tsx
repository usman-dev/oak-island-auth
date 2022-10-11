// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { notificationsTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import AddNotifications from 'src/views/notifications/AddNotifications';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditNotifications from 'src/views/notifications/EditNotifications';
import notificationsService from 'src/services/notifications.service';
import Authenticated from '../../@core/components/Authenticated';

const Notifications = () => {
  const [addNotificationsModal, setAddNotificationsModal] = useState(false);
  const [editNotificationsModal, setEditNotificationsModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allNotificationss, setAllNotificationss] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    if (!loading) setLoading(true);
    const data: any = await notificationsService.getNotifications();
    if (data) {
      setAllNotificationss([...data]);
    }
    setLoading(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditNotificationsModal(true);
    setSelectedRow({ ...allNotificationss?.[meta?.rowIndex] });
  };

  const editNotification = async (data: any, editorData: any) => {
    setEditNotificationsModal(false);
    data.id = selectedRow.id;
    data.body = editorData;
    const res: any = await notificationsService.editNotifications(data);
    if (res) {
      getNotifications();
    }
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allNotificationss?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setConfirmModal(false);
    const data: any = await notificationsService.deleteNotifications(
      selectedRow?.id,
    );

    if (data) {
      getNotifications();
    }
  };

  const submitAddNotifications = async (data: any, editorData: any) => {
    setAddNotificationsModal(false);
    data.body = editorData;

    const res: any = await notificationsService.addNotifications(data);

    if (res) {
      getNotifications();
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
                onClick={() => setAddNotificationsModal(true)}>
                Add Notifications
              </Button>
              <br />
              <br />
              <TableStickyHeader
                columns={notificationsTableColumns({
                  editAction,
                  deleteAction,
                })}
                rows={allNotificationss}
                options={{
                  selectableRows: false,
                }}
                title="Notifications"
              />
            </Card>
          </Grid>
          <AddNotifications
            open={addNotificationsModal}
            handleClose={() => setAddNotificationsModal(false)}
            handleSubmit={submitAddNotifications}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content={`Are you sure?`}
          />
          <EditNotifications
            open={editNotificationsModal}
            handleClose={() => setEditNotificationsModal(false)}
            handleSubmit={editNotification}
            data={selectedRow}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(Notifications);
// export default Notifications;
