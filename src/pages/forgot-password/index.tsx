// ** React Imports
import { ChangeEvent, ReactNode, useState } from 'react';

// ** Next Imports
import { useRouter } from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import userService from 'src/services/user.service';
import useForm from 'src/@core/hooks/useForm';
import { emailValidate } from 'src/helpers/validations';

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
}));

const StyledImage = styled('img')({
  objectFit: 'contain',
  height: '70px',
});

const ForgotPassword = () => {
  const [isLoading, setLoading] = useState(false);
  // const [values, setValues] = useState<any>({
  //   email: '',
  // });

  // ** Hook
  const router = useRouter();

  // const handleChange =
  //   (prop: any) => (event: ChangeEvent<HTMLInputElement>) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };

  const forgot = async () => {
    setLoading(true);
    const obj = {
      ...values,
    };

    const data = await userService.forgotPassword(obj);

    if (data) {
      router.push(`/reset-password?email=${values.email}`);
    }

    setLoading(false);
  };

  const { values, errors, handleChange, handleSubmit, onCancel } = useForm(
    forgot,
    emailValidate,
  );

  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <StyledImage src="https://mycash.ws/template/files/images/logo.png" />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Forgot Password
            </Typography>
            <Typography variant="body2">
              {/* Please sign-in to your account and start the adventure */}
            </Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id="email"
              name="email"
              required
              error={errors.email ? true : false}
              helperText={errors.email && errors.email}
              label="Email"
              sx={{ marginBottom: 4 }}
              onChange={handleChange}
            />
            <LoadingButton
              fullWidth
              loading={isLoading}
              size="large"
              variant="contained"
              sx={{ marginBottom: 4 }}
              onClick={handleSubmit}>
              Submit
            </LoadingButton>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 4 }}
              onClick={() => {
                onCancel
                router.push('/login');
              }}>
              Back
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};

ForgotPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);

export default ForgotPassword;
