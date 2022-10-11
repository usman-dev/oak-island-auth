// ** MUI Imports
import Grid from '@mui/material/Grid';
import { Box, Card } from '@mui/material';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { categoryTableColumns } from 'src/helpers/constants';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState, useContext } from 'react';
import AddCategory from 'src/views/categories/AddCategory';
import { categoryService } from 'src/services';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditCategory from 'src/views/categories/EditCategory';
import { AuthContext } from '../../context/auth/AuthContext';
import { useRouter } from 'next/router';
import Authenticated from '../../@core/components/Authenticated';
import CircularProgress from '@mui/material/CircularProgress';

const Category = () => {
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [file, setFile] = useState<any>([]);
  const [activefile, setActiveFile] = useState<any>([]);
  const [EditCategoryModal, setEditCategoryModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [allCategories, setAllCategories] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
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

  const {
    getRootProps: getRootActivefileProps,
    getInputProps: getInputActivefileProps,
  } = useDropzone({
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
      setActiveFile(acceptfiles);
    },
  });

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    if (!loading) setLoading(true);
    const data: any = await categoryService.getCategories();

    if (data) {
      setAllCategories([...data]);
    }
    setLoading(false);
  };

  const handleModalClose = () => {
    setFile([]);
    setActiveFile([]);
    setEditCategoryModal(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditCategoryModal(true);
    setSelectedRow({ ...allCategories?.[meta?.rowIndex] });
  };

  const editCategory = async (data: any, file: any) => {
    setModalLoading(true);

    data.id = selectedRow.id;
    const res: any = await categoryService.editCategory(data, file, activefile);
    if (res) {
      setEditCategoryModal(false);
      getCategory();
    }
    setModalLoading(false);
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...allCategories?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setConfirmModal(false);
    const data: any = await categoryService.deleteCategories(selectedRow?.id);

    if (data) {
      getCategory();
    }
  };

  const submitAddCategory = async (data: any) => {
    setModalLoading(true);
    const res = await categoryService.addCategory(data);

    if (res) {
      setAddCategoryModal(false);
      getCategory();
      setFile([]);
    }
    setModalLoading(false);
  };

  const importCSV = async (result) => {
    const data = result.data;
    const res = await categoryService.categoryBulkUpload({ categories: data });

    if (res) {
      getCategory();
    }
  };

  const [bulk, setBulk] = useState(false);

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
              {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setAddCategoryModal(true)}>
                    Add Category
                  </Button>
                </Box>
                {bulk ? (
                  <CsvBulkUpload
                    title="Bulk Agents Upload"
                    uploadAction={importCSV}
                  />
                ) : null}
              </Box> */}

              <br />
              <br />
              <TableStickyHeader
                setBulk={setBulk}
                columns={categoryTableColumns({ editAction, deleteAction })}
                rows={allCategories}
                options={{
                  selectableRows: false,
                  // customToolbar: () => (
                  //   <CsvBulkUpload
                  //     title="Bulk Agents Upload"
                  //     uploadAction={importCSV}
                  //   />
                  // ),
                }}
                title="Features"
                bulkButton={true}
              />
            </Card>
          </Grid>
          <AddCategory
            open={addCategoryModal}
            handleClose={() => setAddCategoryModal(false)}
            handleSubmit={submitAddCategory}
            loading={modalLoading}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content={`Are you sure?`}
          />
          <EditCategory
            open={EditCategoryModal}
            handleClose={() => handleModalClose()}
            handleSubmit={editCategory}
            data={selectedRow}
            getRootProps={getRootfileProps}
            getInputProps={getInputfileProps}
            getRootActiveProps={getRootActivefileProps}
            getInputActiveProps={getInputActivefileProps}
            file={file}
            activeFile={activefile}
            loading={modalLoading}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(Category);
// export default Category;
