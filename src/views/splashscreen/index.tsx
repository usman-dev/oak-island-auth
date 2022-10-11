import { useState } from 'react';
import {
  Box,
  CircularProgress,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

const label = { inputProps: { 'aria-label': 'Hide' } };

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '60px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  margin: '20px 0 20px 0',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const imageStyle = {
  objectFit: 'cover',
  width: 300,
  height: 100,
};

const ImageUpload = ({
  getRootProps,
  getInputProps,
  handleSwitch,
  file,
  data,
  showSpalsh,
  loading,
  error,
}) => {
  const renderImage = () => {
    if (file.length > 0) {
      return (
        <>
          {file.map((item) => (
            <img
              src={item.preview}
              style={{ objectFit: 'contain', width: 300, height: 300 }}
            />
          ))}
        </>
      );
    } else if (file.length === 0 && data) {
      return (
        <img
          src={data}
          style={{ objectFit: 'contain', width: 300, height: 300 }}
        />
      );
    } else {
      return <p style={{ color: '#bdbdbd' }}>No Image added</p>;
    }
  };

  return (
    <>
      <p style={{ fontSize: 12 }}>
        Minimum Image Size : 700 x 700 <br /> Maximum Image Size : 1500 x 1500{' '}
        <br /> Supported Image Formats : .jpg, .jpeg, .png
      </p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={baseStyle} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Click here to select Icon</p>
        </div>
        <div style={{ marginLeft: 20 }}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={showSpalsh} onChange={handleSwitch} />}
              label="Visible"
            />
          </FormGroup>
        </div>
        {loading ? (
          <Box>
            <CircularProgress
              sx={{
                display: 'flex',
                margin: '0px 20px 0px 70px',
              }}
              size={20}
            />
          </Box>
        ) : (
          <>
            {error ? (
              <p style={{ marginLeft: 50, color: '#bdbdbd' }}>{error}</p>
            ) : (
              <div style={{ marginLeft: 50 }}>{renderImage()}</div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default ImageUpload;
