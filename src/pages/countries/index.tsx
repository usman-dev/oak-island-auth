import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { countryTableColumns } from 'src/helpers/constants';
import { Button, Grid, Card, Box, Tooltip } from '@mui/material';
import CsvBulkUpload from 'src/@core/components/CsvBulkUpload';
import { countryService } from 'src/services';
import ConfirmDialog from 'src/views/categories/ConfirmDialog';
import EditCountry from 'src/views/country/EditCountry';
import AddCountry from 'src/views/country/AddCountry';
import Authenticated from '../../@core/components/Authenticated';
import CircularProgress from '@mui/material/CircularProgress';
import { useDropzone } from 'react-dropzone';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Countries = () => {
  const router = useRouter();
  const [addCountryModal, setAddCountryModal] = useState(false);
  const [file, setFile] = useState<any>([]);
  const [editCountryModal, setEditCountryModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [countriesData, setCountriesData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
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
    getCountry();
  }, []);

  const getCountry = async () => {
    if (!loading) setLoading(true);
    const data: any = await countryService.getCountries();
    if (data) {
      setCountriesData([...data]);
    }
    setLoading(false);
  };

  const editAction = (value: any, meta: any) => {
    setEditCountryModal(true);
    setSelectedRow({ ...countriesData?.[meta?.rowIndex] });
  };

  const editCountry = async (data: any) => {
    setModalLoading(true);
    delete data['flag'];
    data.id = selectedRow.id;
    const setDataForPost = Object.assign({}, selectedRow, data);
    const res: any = await countryService.editCountry(setDataForPost, file);
    if (res) {
      getCountry();
      setEditCountryModal(false);
    }
    setModalLoading(false);
  };
  const deleteAction = (value: any, meta: any) => {
    setConfirmModal(true);
    setSelectedRow({ ...countriesData?.[meta?.rowIndex] });
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    const data: any = await countryService.deleteCountry(selectedRow?.id);

    if (data) {
      setConfirmModal(false);
      getCountry();
    }
    setModalLoading(false);
  };

  const submitAddCountry = async (data: any) => {
    setModalLoading(true);

    const res = await countryService.addCountry(data, file);

    if (res) {
      getCountry();
      setAddCountryModal(false);
    }
    setModalLoading(false);
  };

  // const importCSV = async (result) => {
  //   const data = result.data;
  //   let allParishData = new Array();
  //   data.map((dataItem) => {
  //     allParishData.push({
  //       parishName: dataItem.Parish || dataItem.parish,
  //       townName: dataItem.Community || dataItem.community,
  //     });
  //   });
  //   const res =  await countryService.countryBulkUpload({ countries: data });

  //   if (res) {
  //     getCountry();
  //   }
  // };

  const handleAddModalClose = () => {
    setAddCountryModal(false);
    setFile([]);
  };

  const handleEditModalClose = () => {
    setEditCountryModal(false);
    setFile([]);
  };

  const importCSV = async (result) => {
    const data = result.data;
    data.map((dataItem) => {
      delete Object.assign(dataItem, {
        ['countryName']: dataItem['Country Name'],
      })['Country Name'];
      delete Object.assign(dataItem, {
        ['countryCode']: dataItem['Country Code'],
      })['Country Code'];
      delete Object.assign(dataItem, {
        ['phonePrefix']: dataItem['Phone Prefix'],
      })['Phone Prefix'];
      delete Object.assign(dataItem, {
        ['currency']: dataItem['Currency'],
      })['Currency'];
      delete Object.assign(dataItem, {
        ['flag']: dataItem['Flag Image Url'],
      })['Flag Image Url'];
    });

    const data1: any = await countryService.countryBulkUpload({
      countries: data,
    });

    if (data1) {
      getCountry();
    }
  };

  const [bulk, setBulk] = useState(false);
  // console.warn('bulk:', bulk);
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setAddCountryModal(true)}>
                    Add Country
                  </Button>
                </Box>
              </Box>

              <br />
              <br />
              <TableStickyHeader
                setBulk={setBulk}
                columns={countryTableColumns({ editAction, deleteAction })}
                rows={countriesData}
                options={{
                  selectableRows: false,
                  customToolbar: () => (
                    <>
                      <CsvBulkUpload
                        title="Bulk Upload"
                        uploadAction={importCSV}
                      />
                      <Tooltip title="Download Excel Template">
                        <Button
                          href="https://digicel-image.s3.amazonaws.com/templates/Countries+Template.xlsx"
                          target="_blank"
                          download>
                          <FileDownloadIcon />
                        </Button>
                      </Tooltip>
                    </>
                  ),
                }}
                title="Countries"
                bulkButton={true}
              />
            </Card>
          </Grid>
          <AddCountry
            open={addCountryModal}
            handleClose={handleAddModalClose}
            onSubmit={submitAddCountry}
            getRootProps={getRootfileProps}
            getInputProps={getInputfileProps}
            file={file}
            loading={modalLoading}
          />
          <ConfirmDialog
            open={isConfirmModal}
            handleClose={() => setConfirmModal(false)}
            handleSubmit={handleConfirmDelete}
            content="Are you sure?"
            loading={modalLoading}
          />
          <EditCountry
            open={editCountryModal}
            handleClose={handleEditModalClose}
            onSubmit={editCountry}
            data={selectedRow}
            getRootProps={getRootfileProps}
            getInputProps={getInputfileProps}
            file={file}
            loading={modalLoading}
          />
        </Grid>
      )}
    </>
  );
};

export default Authenticated(Countries);
