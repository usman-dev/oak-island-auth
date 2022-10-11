import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { hamburgerMenu, menuCardsTableColumns } from 'src/helpers/constants';
import { Button, Grid, Card, Box, CircularProgress } from '@mui/material';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import AddMenuCard from 'src/views/menu-cards/AddMenuCard';
import EditMenuCard from 'src/views/menu-cards/EditMenuCard';
import Authenticated from '../../@core/components/Authenticated';
import { hamburgerMenuService, menuCardsService } from 'src/services';

const HamburgerMenu = () => {
  const router = useRouter();
  const [addModal, setAddModal] = useState(false);
  const [modalLoading, setmodalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [menuCardsData, setMenuCardsData] = useState<any>([]);

  useEffect(() => {
    getHamburgerCards();
  }, []);

  const getHamburgerCards = async () => {
    setLoading(true);
    const data: any = await hamburgerMenuService.getHamburgerCards();
    if (data) {
      setMenuCardsData([...data]);
    }
    setLoading(false);
  };

  const submitAddMenuCard = async (data: any) => {
    setmodalLoading(true);
    const res: any = await menuCardsService.addMenuCards(data);
    if (res) {
      getHamburgerCards();
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
      getHamburgerCards();
    }
    setmodalLoading(false);
  };

  const handleConfirmDelete = async () => {
    setmodalLoading(true);
    const res: any = await menuCardsService.deleteMenuCards(selectedRow.id);
    if (res) {
      setConfirmModal(false);
      getHamburgerCards();
    }
    setmodalLoading(false);
  };

  const redirectAction = (value: any, meta: any) => {
    let cardId = menuCardsData?.[meta?.rowIndex]?.id;
    router.push(`/hamburger-menu/${cardId}/card-category`);
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
              <br />
              <TableStickyHeader
                columns={hamburgerMenu({
                  editAction,
                  redirectAction,
                })}
                rows={menuCardsData}
                options={{
                  selectableRows: false,
                }}
                title="Hamburger Menu"
              />
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
            handleSubmit={submitAddMenuCard}
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

export default Authenticated(HamburgerMenu);
// export default MenuCards;
