// ** MUI Imports
import { Grid, ListItem, List as List1, Card } from '@mui/material';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { carouselTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Box } from '@mui/material';
import { List, arrayMove } from 'react-movable';
import AddCarousel from 'src/views/carousel/addCarousel';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditCarousel from 'src/views/carousel/editCarousel';
import carouselService from 'src/services/carousel.service';
import Authenticated from 'src/@core/components/Authenticated';
import useForm from 'src/@core/hooks/useForm';
import { carouselValidate } from 'src/helpers/validations';

const Carousel = () => {
  const [addBillCategoryModal, setAddBillCategoryModal] = useState(false);
  const [editBillCategoryModal, setEditBillCategoryModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [file, setFile] = useState<any>([]);
  const [allCarousel, setAllCarousel] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLodaing] = useState<any>(true);
  const [modalLoading, setModalLoading] = useState<any>(false);
  const router = useRouter();

  const { getRootProps: getRootfileProps, getInputProps: getInputfileProps } =
    useDropzone({
      accept: {
        'image/jpeg': ['.jpeg', '.png'],
      },
      multiple: true,
      onDrop: async (acceptedFiles, rejectedFiles) => {
        const acceptfiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );
        setFile(acceptfiles);
      },
    });

  useEffect(() => {
    getCarousel();
  }, []);

  const getCarousel = async () => {
    if (!loading) setLodaing(true);
    const data: any = await carouselService.getCarousel();
    if (data) {
      setAllCarousel([...data]);
    }
    setLodaing(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditBillCategoryModal(true);
    setSelectedRow({ ...allCarousel?.[meta?.rowIndex] });
  };

  const editCategory = async (data: any) => {
    setModalLoading(true);

    let setDataForPost = {
      id: selectedRow.id,
      title: data.title,
      subtitle: data.subtitle,
      key: data.key,
    };

    const res: any = await carouselService.editCarousel(setDataForPost, file);
    if (res) {
      setEditBillCategoryModal(false);
      getCarousel();
    }
    setModalLoading(false);
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allCarousel?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await carouselService.deleteCarousel(selectedRow?.id);

    if (data) {
      setConfirmModal(false);
      getCarousel();
    }
    setModalLoading(false);
  };

  const submitAddBillCategory = async (data: any) => {
    setModalLoading(true);
    // let data = { categoryName: billCategoryName };

    const res = await carouselService.addCarousel(data, file);

    if (res) {
      setFile([]);
      setAddBillCategoryModal(false);
      getCarousel();
    }
    setModalLoading(false);
  };

  const handleAddModal = () => {
    setAddBillCategoryModal(false);
    setFile([]);
  };

  const handleEditModal = () => {
    setEditBillCategoryModal(false);
    setFile([]);
  };

  const changeOrder = async ({ oldIndex, newIndex }) => {
    const array = await arrayMove(allCarousel, oldIndex, newIndex);
    setAllCarousel([...array]);
    const arr: any = [];
    array?.map?.((item: any) => {
      arr.push(item?.id);
    });
    const res = await carouselService.changeCarouselOrder({
      carousels: arr,
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
        <>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card sx={{ p: 4 }}>
                <Button
                  variant="contained"
                  onClick={() => setAddBillCategoryModal(true)}>
                  Add Carousel
                </Button>
                <br />
                <br />
                <TableStickyHeader
                  columns={carouselTableColumns({
                    editAction,
                    deleteAction,
                  })}
                  rows={allCarousel}
                  title="Bill Categories"
                  options={{
                    selectableRows: false,
                  }}
                />
                <br />
                <br />
                <div>
                  <h3>Change Order</h3>
                  <List
                    values={allCarousel}
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
                        {value?.title}
                      </ListItem>
                    )}
                  />
                </div>
              </Card>
            </Grid>
            <AddCarousel
              open={addBillCategoryModal}
              handleClose={() => handleAddModal()}
              onSubmit={submitAddBillCategory}
              loading={modalLoading}
              getRootProps={getRootfileProps}
              getInputProps={getInputfileProps}
              file={file}
            />
            <ConfirmDialog
              open={isConfirmModal}
              handleClose={() => setConfirmModal(false)}
              handleSubmit={handleConfirmDelete}
              content={`Are you sure?`}
              loading={modalLoading}
            />
            <EditCarousel
              open={editBillCategoryModal}
              handleClose={() => handleEditModal()}
              onSubmit={editCategory}
              data={selectedRow}
              loading={modalLoading}
              getRootProps={getRootfileProps}
              getInputProps={getInputfileProps}
              file={file}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Authenticated(Carousel);
