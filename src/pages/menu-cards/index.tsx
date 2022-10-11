import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { menuCardsTableColumns } from 'src/helpers/constants';
import {
  Button,
  Grid,
  Card,
  Box,
  CircularProgress,
  ListItem,
  List as List1,
} from '@mui/material';
import { List, arrayMove } from 'react-movable';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import AddMenuCard from 'src/views/menu-cards/AddMenuCard';
import EditMenuCard from 'src/views/menu-cards/EditMenuCard';
import Authenticated from '../../@core/components/Authenticated';
import { cardCategoryService, menuCardsService } from 'src/services';
import { toast } from 'react-toastify';

const MenuCards = () => {
  const router = useRouter();
  const [addModal, setAddModal] = useState(false);
  const [modalLoading, setmodalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [menuCardsData, setMenuCardsData] = useState<any>([]);

  useEffect(() => {
    getMenuCards();
  }, []);

  const getMenuCards = async () => {
    setLoading(true);
    const data: any = await menuCardsService.getMenuCards();

    if (data) {
      setMenuCardsData([...data]);
    }
    setLoading(false);
  };

  const submitAddMenuCard = async (data: any) => {
    setmodalLoading(true);
    const res: any = await menuCardsService.addMenuCards(data);
    if (res) {
      getMenuCards();
      setmodalLoading(false);
    }

    setmodalLoading(false);
    setAddModal(false);
  };

  const editAction = (type, value: any, meta: any) => {
    setSelectedRow({ ...menuCardsData?.[meta?.rowIndex] });
    let data1 = {
      id: menuCardsData?.[meta?.rowIndex]?.id,
      showOnDashboard: value,
    };
    if (type === 'show') {
      editMenuCard(data1);
    } else {
      setEditModal(true);
    }
  };

  const editMenuCard = async (data: any) => {
    setmodalLoading(true);
    let data1 = { id: selectedRow.id, ...data };
    const res: any = await menuCardsService.editMenuCards(data1);
    if (res) {
      setEditModal(false);
      getMenuCards();
    }
    setmodalLoading(false);
  };

  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...menuCardsData?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setmodalLoading(true);
    const res: any = await menuCardsService.deleteMenuCards(selectedRow.id);
    if (res) {
      setConfirmModal(false);
      getMenuCards();
    }
    setmodalLoading(false);
  };

  const redirectAction = (value: any, meta: any) => {
    let cardId = menuCardsData?.[meta?.rowIndex]?.id;
    let type = menuCardsData?.[meta?.rowIndex]?.type;
    // router.push(`/menu-cards/${cardId}/card-category`);
    router.push(
      {
        pathname: `/menu-cards/${cardId}/card-category`,
        query: { type },
      },
      `/menu-cards/${cardId}/card-category`,
    );
  };

  const changeOrder = async ({ oldIndex, newIndex }) => {
    const array = await arrayMove(menuCardsData, oldIndex, newIndex);
    setMenuCardsData([...array]);
    const arr: any = [];
    array?.map?.((item: any) => {
      arr.push(item?.id);
    });
    const res = await cardCategoryService.changeMenuCardOrder({
      cards: arr,
    });
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
                onClick={() => setAddModal(true)}>
                Add Menu Card
              </Button>
              <br />
              <br />
              <TableStickyHeader
                columns={menuCardsTableColumns({
                  editAction,
                  deleteAction,
                  redirectAction,
                })}
                rows={menuCardsData}
                options={{
                  selectableRows: false,
                }}
                title="Menu Cards"
              />
              <br />
              <br />
              <div>
                <h3>Change Order</h3>
                <List
                  values={menuCardsData}
                  onChange={({ oldIndex, newIndex }) => {
                    if (menuCardsData[oldIndex].type === 'HomeBar') {
                      toast.error(
                        `Cannot Change Order of ${menuCardsData[oldIndex].cardName}`,
                      );
                      return;
                    } else if (menuCardsData[newIndex].type === 'HomeBar') {
                      toast.error(
                        `Cannot Put ${menuCardsData[oldIndex].cardName} Below ${menuCardsData[newIndex].cardName}`,
                      );
                      return;
                    }
                    changeOrder({ oldIndex, newIndex });
                  }}
                  renderList={({ children, props }) => (
                    <List1
                      {...props}
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        // border: '1px solid',
                      }}>
                      {children}
                    </List1>
                  )}
                  renderItem={({ value, props }: any) => (
                    <ListItem
                      sx={{
                        border: '1px solid',
                      }}
                      {...props}>
                      {value?.cardName}
                    </ListItem>
                  )}
                />
              </div>
            </Card>
          </Grid>
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content="Are you sure?"
            loading={modalLoading}
          />
          <AddMenuCard
            open={addModal}
            handleClose={() => setAddModal(false)}
            onSubmit={submitAddMenuCard}
            loading={modalLoading}
          />
          <EditMenuCard
            open={editModal}
            handleClose={() => setEditModal(false)}
            handleSubmit={editMenuCard}
            data={selectedRow}
            loading={modalLoading}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(MenuCards);
// export default MenuCards;
