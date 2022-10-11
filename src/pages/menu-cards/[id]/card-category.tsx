// ** MUI Imports
import {
  Typography,
  Grid,
  Card,
  Button,
  List as List1,
  ListItem,
} from '@mui/material';
import { List, arrayMove } from 'react-movable';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { cardCategoryTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import Authenticated from 'src/@core/components/Authenticated';
import { cardCategoryService } from 'src/services';
import AddCardCategory from 'src/views/menu-cards/AddCardCategory';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditCardCategory from 'src/views/menu-cards/EditCardCategory';
import { toast } from 'react-toastify';

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
  const [editCardCategoryModal, setEditCardCategoryModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allCardCategory, setAllCardCategory] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [modalLoading, setModalLoading] = useState(false);

  const router = useRouter();
  const cardId: any = router.query.id;
  const cardType: any = router.query.type;

  useEffect(() => {
    getCardCategories();
  }, [cardId]);

  const editAction = (key, value: any, meta: any) => {
    setSelectedRow({ ...allCardCategory?.[meta?.rowIndex] });

    if (key === 'show') {
      editCardCategory({
        visible: value,
        id: allCardCategory?.[meta?.rowIndex]?.id,
      });
    } else {
      setEditCardCategoryModal(true);
    }
  };

  const editCardCategory = async (values: any) => {
    setModalLoading(true);
    let data: any = { ...values };
    data.id = selectedRow.id || values?.id;
    const res: any = await cardCategoryService.editCategory(data);

    if (res) {
      setModalLoading(false);
      getCardCategories();
    }
    setEditCardCategoryModal(false);
  };

  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allCardCategory?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await cardCategoryService.deleteCardCategory(
      selectedRow?.id,
    );

    if (data) {
      setModalLoading(false);
      getCardCategories();
    }
    setConfirmModal(false);
  };

  const submitAddCardWidget = async (formsData: any) => {
    setModalLoading(true);
    formsData.card = cardId;
    const res = await cardCategoryService.addCardCategories(formsData);
    if (res) {
      setModalLoading(false);
      getCardCategories();
    }
    setAddCardWidgetModal(false);
  };

  const getCardCategories = async () => {
    if (cardId) {
      const data: any = await cardCategoryService.getCardCategories(cardId);
      if (data) {
        setAllCardCategory([...data]);
      }
    }
  };

  const changeOrder = async ({ oldIndex, newIndex }) => {
    const array = await arrayMove(allCardCategory, oldIndex, newIndex);
    setAllCardCategory([...array]);
    const arr: any = [];
    array?.map?.((item: any) => {
      arr.push(item?.id);
    });
    const res = await cardCategoryService.changeCategoryOrder({
      cardCategories: arr,
    });
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ p: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              onClick={() => router.push('/menu-cards')}
              style={backIconStyling}>
              <span>
                <ArrowBackIcon fontSize="small" />
              </span>
              <span style={{ margin: 7 }}>Back</span>
            </div>
            <Button
              variant="contained"
              onClick={() => {
                if (cardType === 'HomeBar' && allCardCategory.length === 5) {
                  toast.error('Cannot Add More Categories To This Card');
                  return;
                }
                setAddCardWidgetModal(true);
              }}>
              Add Feature
            </Button>
          </div>

          <br />
          <br />
          <TableStickyHeader
            columns={cardCategoryTableColumns({
              editAction,
              deleteAction,
            })}
            title="Mobile Features"
            rows={allCardCategory}
            options={{
              selectableRows: false,
            }}
          />
          <br />
          <br />
          <div>
            <h3>Change Order</h3>
            <List
              values={allCardCategory}
              onChange={({ oldIndex, newIndex }) => {
                changeOrder({ oldIndex, newIndex });
              }}
              renderList={({ children, props }) => (
                <List1
                  {...props}
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    border: '1px solid',
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
                  {value?.categoryName}
                </ListItem>
              )}
            />
          </div>
        </Card>
      </Grid>

      <AddCardCategory
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
        loading={modalLoading}
      />
      <EditCardCategory
        open={editCardCategoryModal}
        handleClose={() => setEditCardCategoryModal(false)}
        handleSubmit={editCardCategory}
        data={selectedRow}
        loading={modalLoading}
      />
    </Grid>
  );
};

export default Authenticated(CardCategory);
