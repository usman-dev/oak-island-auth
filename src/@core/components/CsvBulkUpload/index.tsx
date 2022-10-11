import React from 'react';
import Papa from 'papaparse';
import { read, writeFileXLSX, utils } from 'xlsx';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
class FileReader extends React.Component<any, any> {
  filesInput: any = null;

  handleChange = async (event) => {
    const file = event?.target?.files[0];

    if (file?.name?.includes('.xlsx' || '.xls')) {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);
      this.props.uploadAction({ data: jsonData });
    } else {
      Papa.parse(file, {
        complete: this.props.uploadAction,
        header: true,
      });
    }
  };
  render() {
    let style = {};
    this.props.type === 'referral'
      ? (style = {
          color: 'white',
          backgroundColor: '#ff4c51',
          '&:hover': { color: 'white', backgroundColor: '#ff4c51' },
        })
      : (style = {});
    return (
      <>
        <Button
          sx={style}
          // style={{ display: 'block', width: '120px', height: '30px' }}
          onClick={() => {
            this.filesInput.click();
          }}>
          {this.props.title}
        </Button>
        <input
          className="csv-input"
          type="file"
          accept=".csv, .xlsx, .xls"
          ref={(input) => {
            this.filesInput = input;
          }}
          name="file"
          onChange={this.handleChange}
          id="getFile"
          style={{ display: 'none' }}
        />
      </>
    );
  }
}

export default FileReader;
