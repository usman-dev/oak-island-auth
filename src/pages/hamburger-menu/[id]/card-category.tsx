// ** MUI Imports
import { Grid, Card, Button, List as List1, ListItem } from '@mui/material';
import { List, arrayMove } from 'react-movable';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { hamburgerFeature } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import Authenticated from 'src/@core/components/Authenticated';
import { cardCategoryService, hamburgerMenuService } from 'src/services';
import AddFeature from 'src/views/hamburger-menu/AddFeature';
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

const CardCategory = () => {
  const [addCardWidgetModal, setAddCardWidgetModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allCardCategory, setAllCardCategory] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [modalLoading, setModalLoading] = useState(false);

  const router = useRouter();
  const cardId: any = router.query.id;

  useEffect(() => {
    getHamburgerFeature();
  }, [cardId]);

  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allCardCategory?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setConfirmModal(false);
    const data: any = await hamburgerMenuService.deleteHamburgerFeature({
      featureId: selectedRow?.id,
      id: cardId,
    });

    if (data) {
      getHamburgerFeature();
    }
  };

  const submitAddCardWidget = async (formsData: any) => {
    setModalLoading(true);
    formsData.id = cardId;
    const res = await hamburgerMenuService.addHamburgerFeature(formsData);
    if (res) {
      setModalLoading(false);
      getHamburgerFeature();
    }
    setAddCardWidgetModal(false);
  };

  const getHamburgerFeature = async () => {
    if (cardId) {
      const data: any = await hamburgerMenuService.getHamburgerFeature(cardId);
      if (data) {
        setAllCardCategory([...data]);
      }
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ p: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              onClick={() => router.push('/hamburger-menu')}
              style={backIconStyling}>
              <span>
                <ArrowBackIcon fontSize="small" />
              </span>
              <span style={{ margin: 7 }}>Back</span>
            </div>
            <Button
              variant="contained"
              onClick={() => setAddCardWidgetModal(true)}>
              Add Feature
            </Button>
          </div>

          <br />
          <br />
          <TableStickyHeader
            columns={hamburgerFeature({
              deleteAction,
            })}
            title="Mobile Features"
            rows={allCardCategory}
            options={{
              selectableRows: false,
            }}
          />
        </Card>
      </Grid>

      <AddFeature
        open={addCardWidgetModal}
        handleClose={() => setAddCardWidgetModal(false)}
        onSubmit={submitAddCardWidget}
        loading={modalLoading}
      />
      <ConfirmDialog
        open={isConfirmModal}
        handleClose={() => setConfirmModal(false)}
        handleSubmit={handleConfirmDelete}
        content={`Are you sure?`}
      />
      {/* <EditCardCategory
        open={editCardCategoryModal}
        handleClose={() => setEditCardCategoryModal(false)}
        handleSubmit={editCardCategory}
        data={selectedRow}
      /> */}
    </Grid>
  );
};

function OrderList({ data }) {
  const [items, setItems] = useState(data);

  return (
    <List
      values={data}
      onChange={({ oldIndex, newIndex }) => {
        setItems(arrayMove(items, oldIndex, newIndex));
      }}
      renderList={({ children, props }) => (
        <List1
          {...props}
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {children}
        </List1>
      )}
      renderItem={({ value, props }: any) => (
        <ListItem {...props}>{value?.categoryName}</ListItem>
      )}
    />
  );
}

export default Authenticated(CardCategory);
