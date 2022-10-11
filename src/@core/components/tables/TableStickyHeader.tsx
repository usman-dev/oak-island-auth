import { useState, ChangeEvent, useEffect } from 'react';
import { Paper } from '@mui/material';
// import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
// import { Button, Grid, Card, Box } from '@mui/material';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
// import { AnyCnameRecord } from 'dns';
import Tooltip from '@mui/material/Tooltip';

const TableStickyHeader = ({
  title,
  columns,
  rows = [],
  options,
  setBulk,
  bulkButton,
}: any) => {
  const [bulkShow, setBulkShow] = useState(true);
  options.download = false;

  // const CustomChip = ({ label, onDelete }) => {
  //   return (
  //     <div>
  //       <Chip
  //         variant="outlined"
  //         color="secondary"
  //         label={label}
  //         onDelete={onDelete}
  //       /> */}
  //       {/* <DynamicFeedOutlinedIcon />
  //     </div>
  //   );
  // };

  const CustomFilterList = ({ props: any }) => {
    const toggleBulk = () => {
      setBulk(bulkShow);
      if (bulkShow == false) {
        setBulkShow(true);
      } else setBulkShow(false);

      // console.warn('BulkShow:', bulkShow);
    };
    return (
      <>
        {bulkButton ? (
          <Tooltip title="Bulk Upload">
            <button
              className="MuiButtonBase-root tss-1xf7tug-MUIDataTableToolbar-icon MuiIconButton-root MuiIconButton-sizeMedium css-77zdgl-MuiButtonBase-root-MuiIconButton-root pr-10"
              // tabindex="0"
              type="button"
              aria-label="Search"
              // data-testid="Search-iconButton"
              data-mui-internal-clone-element="true"
              onClick={toggleBulk}>
              <DynamicFeedOutlinedIcon />
            </button>
          </Tooltip>
        ) : null}
      </>
      // {/* <TableFilterList {...props} ItemComponent={CustomChip} /> */}
    );
  };
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <MUIDataTable
          title={title}
          data={rows}
          columns={columns}
          options={options}
          // components={() => <span>czcz</span>}
          // customToolbar={customComponent}
        />

        {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      </Paper>
    </>
  );
};

export default TableStickyHeader;
