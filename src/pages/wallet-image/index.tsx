import { Card, Button, CardContent, CardHeader, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageUpload from 'src/views/splashscreen';
import reactImageSize from 'react-image-size';
import { walletImageService } from 'src/services';

const SplashScreen = () => {
  const [file, setFile] = useState<any>([]);
  const [fileError, setFileError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [wallet, setWallet] = useState<any>({});
  // const [showSplash, setShowSplash] = useState<boolean>(false);

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
        if (width < 700 && width > 1500) {
          error =
            'Selected Image must be min 700 X 700 and max 1500 X 1500 pixels wide';
        } else if (height < 700 && height > 1500) {
          error =
            'Selected Image must be min 700 X 700 and max 1500 X 1500 pixels wide';
        }
      }
      setFileError(error);
      if (error.length === 0) {
        setFile(acceptfiles);
      }
    },
  });

  useEffect(() => {
    getWalletImage();
  }, []);

  const getWalletImage = async () => {
    setLoading(true);
    const data: any = await walletImageService.getWalletImage();
    if (data) {
      setWallet(data);
    }
    setLoading(false);
  };

  const addWallet = async () => {
    setButtonLoading(true);
    const data: any = await walletImageService.addWalletImage(file);
    if (data) {
      getWalletImage();
    }
    setButtonLoading(false);
  };

  const handleSwitchChange = async (event: any) => {
    const data = await walletImageService.editWalletImage({
      visible: event.target.checked,
    });
    if (data) {
      getWalletImage();
    }
  };

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <Box sx={{ width: '100%' }}>
          <CardHeader
            title="Wallet Image"
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
            data={wallet.walletImage}
            showSpalsh={wallet.visible}
            loading={loading}
            error={fileError}
          />
          <LoadingButton
            loading={buttonLoading}
            onClick={addWallet}
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
