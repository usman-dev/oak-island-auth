import { Card, Button, CardContent, CardHeader, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageUpload from 'src/views/splashscreen';
import reactImageSize from 'react-image-size';
import { splashScreenService } from 'src/services';

const SplashScreen = () => {
  const [file, setFile] = useState<any>([]);
  const [fileError, setFileError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [splash, setSplash] = useState<any>({});
  const [showSplash, setShowSplash] = useState<boolean>(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    onDrop: async (acceptedFiles, rejectedFiles) => {
      let error = '';
      error = '';
      const acceptfiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      for (const acceptedImg of acceptfiles) {
        const { width, height } = await reactImageSize(acceptedImg.preview);
        if (width < 1024 && width > 512) {
          error =
            'Selected Image must be min 512 X 512 and max 1024 X 1024 pixels wide';
        } else if (height < 1024 && height > 512) {
          error =
            'Selected Image must be min 512 X 512 and max 1024 X 1024 pixels wide';
        }
      }
      setFileError(error);
      if (error.length === 0) {
        setFile(acceptfiles);
      }
    },
  });

  useEffect(() => {
    getSplashImage();
  }, []);

  const getSplashImage = async () => {
    setLoading(true);
    const data: any = await splashScreenService.getSplashImage();
    if (data) {
      setSplash(data);
    }
    setLoading(false);
  };

  const addSplash = async () => {
    setButtonLoading(true);
    const data: any = await splashScreenService.addSplashImage(file);
    if (data) {
      getSplashImage();
    }
    setButtonLoading(false);
  };

  const handleSwitchChange = async (event: any) => {
    setShowSplash(event.target.checked);
    const data = await splashScreenService.editSplashImage({
      visible: event.target.checked,
    });
    if (data) {
      getSplashImage();
    }
  };

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <Box sx={{ width: '100%' }}>
          <CardHeader
            title="Splash Screen"
            sx={{
              pt: 5.5,
              alignItems: 'center',
              '& .MuiCardHeader-action': { mt: 0.6 },
            }}
            titleTypographyProps={{
              variant: 'h6',
              sx: {
                lineHeight: '1.6 !important',
                letterSpacing: '0.15px !important',
              },
            }}
          />
        </Box>
        <CardContent>
          <ImageUpload
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            handleSwitch={handleSwitchChange}
            file={file}
            data={splash.splashImage}
            showSpalsh={splash.visible}
            loading={loading}
            error={fileError}
          />
          <LoadingButton
            loading={buttonLoading}
            onClick={addSplash}
            variant="contained"
            disabled={file.length === 0}>
            Save
          </LoadingButton>
        </CardContent>
      </Card>
    </>
  );
};

export default SplashScreen;
