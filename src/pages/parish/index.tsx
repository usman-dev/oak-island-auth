// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TableStickyHeader from 'src/@core/components/tables/TableStickyHeader';
import { countryParishTableColumns } from 'src/helpers/constants';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Tooltip } from '@mui/material';
import { countryService } from 'src/services';
import Authenticated from '../../@core/components/Authenticated';
import CsvBulkUpload from 'src/@core/components/CsvBulkUpload';
import parishService from 'src/services/parish.service';
import { useRouter } from 'next/router';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const CountryParish = () => {
  const [allCountries, setAllCountries] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [bulk, setBulk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCountryParish();
  }, []);

  const getCountryParish = async () => {
    if (!loading) setLoading(true);
    const data: any = await countryService.getCountries();
    if (data) {
      setAllCountries([...data]);
    }
    setLoading(false);
  };

  const redirectAction = (value: any, meta: any) => {
    let categoryId = allCountries?.[meta?.rowIndex]?.id;
    router.push(`/parish/${categoryId}`);
  };

  const importCSV = async (result) => {
    const data = result.data;
    let allParishData = new Array();
    data.map((dataItem) => {
      allParishData.push({
        countryName: dataItem?.Country?.trim() || dataItem?.country?.trim(),
        parishName: dataItem?.Parish?.trim() || dataItem?.parish?.trim(),
        townName:
          dataItem?.Community?.trim() ||
          dataItem?.community?.trim() ||
          dataItem?.Town?.trim() ||
          dataItem?.town?.trim(),
      });
    });

    const res = await parishService.parishBulkUpload({
      addresses: allParishData,
    });
    if (res) {
      getCountryParish();
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {bulk ? (
                  <CsvBulkUpload
                    title="Bulk Parish Upload"
                    uploadAction={importCSV}
                  />
                ) : null}
              </Box>
              <br />
              <br />
              <TableStickyHeader
                columns={countryParishTableColumns({
                  redirectAction,
                })}
                rows={allCountries}
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
                          href="https://digicel-image.s3.amazonaws.com/templates/Parish+Details+Template.xlsx"
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
        </Grid>
      )}
    </>
  );
};

export default Authenticated(CountryParish);
// export default CountryParish;
