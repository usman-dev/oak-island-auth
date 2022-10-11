// ** MUI Imports
import { Grid, ListItem, List as List1 } from '@mui/material';
import Card from '@mui/material/Card';
import { useDropzone } from 'react-dropzone';
import { Button, TextField, Box, CircularProgress } from '@mui/material';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import AddBanners from 'src/views/banners/addBanners';
import { List, arrayMove } from 'react-movable';
import EditBanner from 'src/views/banners/editBanner';
import { bannerTableColumns } from 'src/helpers/constants';
import { useState, useEffect } from 'react';
import { bannerService } from 'src/services';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import Authenticated from '../../@core/components/Authenticated';
import reactImageSize from 'react-image-size';

const Banners = () => {
  const [inValid, setInValid] = useState(false);
  const [errors, setErrors] = useState<any>('');
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [editFile, setEditFile] = useState<any>([]);
  const [dataforPost, setDataForPost] = useState<any>([]);
  const [addBannerModal, setBannerModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [position, setPosition] = useState('');
  const [bannersData, setBannersData] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const { getRootProps: getRootfileProps, getInputProps: getInputfileProps } =
    useDropzone({
      accept: {
        'image/jpeg': ['.jpeg', '.png'],
      },
      multiple: true,
      onDrop: async (acceptedFiles, rejectedFiles) => {
        let errors = '';
        const acceptfiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );
        for (const acceptedImg of acceptfiles) {
          const { width, height } = await reactImageSize(acceptedImg.preview);
          if (width < 639) {
            errors = 'Selected Image must be exactly 639 X 306 pixels wide';
          } else if (height < 306) {
            errors = 'Selected Image must be exactly 639 X 306 pixels wide';
          }
        }
        setErrors(errors);
        if (errors.length === 0) {
          const postData = acceptfiles.map((file) => ({
            file,
          }));

          const listFiles = files.concat(acceptfiles as any);
          const listData = dataforPost.concat(postData as any);
          setFiles(listFiles);
          setDataForPost(listData);
        }
      },
    });

  const {
    getRootProps: getRootEditFileProps,
    getInputProps: getInputEditFileProps,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    onDrop: async (acceptedFiles) => {
      let errors = '';
      const acceptfiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      for (const acceptedImg of acceptfiles) {
        const { width, height } = await reactImageSize(acceptedImg.preview);
        if (width < 639) {
          errors = 'Selected Image must be exactly 639 X 306 pixels wide';
        } else if (height < 306) {
          errors = 'Selected Image must be exactly 639 X 306 pixels wide';
        }
      }
      setErrors(errors);

      if (errors.length === 0) {
        setEditFile(acceptfiles);
      }
    },
  });

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    setLoading(true);
    const data: any = await bannerService.getBanner();
    if (data) {
      setBannersData([...data]);
    }
    setLoading(false);
  };

  const onChangeHandler = (idx, event) => {
    // const position = event.target.value;
    const newData = dataforPost;
    // newData[idx].position = position;
    // const isPosition = newData.find((obj) => obj.position.length < 1);
    // if (!isPosition) {
    //   setInValid(false);
    // } else {
    //   setInValid(true);
    // }
    setDataForPost(newData);
  };

  const onEditChangeHandler = (event) => {
    const position = event.target.value;
    setPosition(position);
  };

  const saveHandler = async () => {
    setModalLoading(true);
    const data = await bannerService.addBanner(files, dataforPost);
    if (data) {
      setBannerModal(false);
      setLoading(false);
      setFiles([]);
      setDataForPost([]);
      getBanners();
    }

    setModalLoading(false);
  };

  const handleCloseBannerModal = () => {
    setBannerModal(false);
    setFiles([]);
    setDataForPost([]);
    setErrors('');
  };

  const saveEditHandler = async () => {
    setModalLoading(true);
    const getPosition = position ? position : selectedRow.position;
    const data: any = await bannerService.editBanner(editFile, {
      ...selectedRow,
      position: getPosition,
    });

    if (data) {
      setEditModal(false);
      setPosition('');
      getBanners();
    }

    setModalLoading(false);
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
    setEditFile([]);
    setErrors('');
  };

  const editAction = (value: any, meta: any, type: string) => {
    setSelectedRow({ ...bannersData?.[meta?.rowIndex] });
    let data1 = {
      id: bannersData?.[meta?.rowIndex]?.id,
      visible: value,
    };
    if (type === 'show') {
      editBanner(data1);
    } else {
      setEditModal(true);
    }
  };

  const editBanner = async (data: any) => {
    setModalLoading(true);
    let data1 = { id: selectedRow.id, ...data };
    const res: any = await bannerService.editBannerVisible({
      ...data1,
    });
    if (res) {
      setEditModal(false);
      getBanners();
    }
    setModalLoading(false);
  };

  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...bannersData?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await bannerService.deleteBanner(selectedRow);

    if (data) {
      setConfirmModal(false);
      getBanners();
    }

    setModalLoading(false);
  };

  const changeOrder = async ({ oldIndex, newIndex }) => {
    const array = await arrayMove(bannersData, oldIndex, newIndex);
    setBannersData([...array]);
    const arr: any = [];
    array?.map?.((item: any) => {
      arr.push(item?.id);
    });
    const res = await bannerService.changeBannersOrder({
      promBanners: arr,
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
              <section>
                <Button
                  variant="contained"
                  onClick={() => setBannerModal(true)}>
                  Add Banner
                </Button>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <div style={{ width: '100%' }}>
                    <TableStickyHeader
                      columns={bannerTableColumns({ deleteAction, editAction })}
                      rows={bannersData}
                      options={{
                        selectableRows: false,
                      }}
                      title="Promotional Banner"
                    />
                  </div>
                </div>
              </section>
              <br />
              <br />
              <div>
                <h3>Change Order</h3>
                <List
                  values={bannersData}
                  onChange={({ oldIndex, newIndex }) => {
                    changeOrder({ oldIndex, newIndex });
                  }}
                  renderList={({ children, props }) => (
                    <List1
                      {...props}
                      sx={{
                        maxWidth: 180,
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
                      <img
                        className="imageFit"
                        src={value?.image}
                        width={150}
                        height={100}
                      />
                    </ListItem>
                  )}
                />
              </div>
            </Card>
          </Grid>
          <AddBanners
            open={addBannerModal}
            handleClose={handleCloseBannerModal}
            handleSubmit={saveHandler}
            getRootProps={getRootfileProps}
            getInputProps={getInputfileProps}
            files={files}
            inValid={inValid}
            onChangeHandler={onChangeHandler}
            loading={modalLoading}
            errors={errors}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            loading={modalLoading}
            content="Are you sure?"
          />
          <EditBanner
            open={editModal}
            handleClose={handleCloseEditModal}
            handleSubmit={saveEditHandler}
            getRootProps={getRootEditFileProps}
            getInputProps={getInputEditFileProps}
            file={editFile}
            data={selectedRow}
            onChangeHandler={onEditChangeHandler}
            loading={modalLoading}
            errors={errors}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(Banners);
