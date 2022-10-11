// ** React Imports
import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react';

// ** Next Imports
import Link from 'next/link';
import { Router, useRouter } from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';

// ** Icons Imports
import Google from 'mdi-material-ui/Google';
import Github from 'mdi-material-ui/Github';
import Twitter from 'mdi-material-ui/Twitter';
import Facebook from 'mdi-material-ui/Facebook';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Configs
import themeConfig from 'src/configs/themeConfig';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import userService from 'src/services/user.service';

import { AuthContext } from '../../context/auth/AuthContext';
import axios from 'axios';
import { BASE_PATH, API_ROUTES } from '../../helpers/apiRoutes.constants';
import Cookies from 'js-cookie';
import { CircularProgress, FormHelperText } from '@mui/material';
import useForm from 'src/@core/hooks/useForm';
import { loginValidate } from 'src/helpers/validations';

// interface State {
//   // password: string;
//   isShowPassword: boolean;
//   // email: string;
// }

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const StyledImage = styled('img')({
  objectFit: 'contain',
  height: '70px',
});

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    '& .MuiFormControlLabel-label': {
      fontSize: '0.875rem',
      color: theme.palette.text.secondary,
    },
  }),
);

const LoginPage = () => {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState<any>(false);

  // ** State
  // const [values, setValues] = useState<State>({
  //   password: '',
  //   isShowPassword: false,
  //   email: '',
  // });
  const [isShowPassword, setIsShowPassword] = useState<Boolean>(false);

  // ** Hook
  const theme = useTheme();
  // const router = useRouter();

  // useEffect(() => {
  //   if (user) {
  //     router.push('/');
  //   }
  // }, []);

  // const handleChange =
  //   (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const doLogin = async () => {
    setLoading(true);
    const obj = {
      // email,
      // password,
      ...values,
    };

    const data = await userService.doLogin(obj, dispatch);

    if (data) {
      router.push('/');
      // const user = await userService.getCurrentUser();
    } else {
      setLoading(false);
    }
  };

  const router = useRouter();

  const { values, errors, handleChange, handleSubmit } = useForm(
    doLogin,
    loginValidate,
  );

  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{
            padding: (theme) => `${theme.spacing(12, 9, 7)} !important`,
          }}>
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <StyledImage src="/images/MyCash-logo.png" />
            {/* <Typography
            variant="h6"
            sx={{
              ml: 3,
              lineHeight: 1,
              fontWeight: 600,
              textTransform: "uppercase",
              fontSize: "1.5rem !important",
            }}
          >
            {themeConfig.templateName}
          </Typography> */}
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant="body2">
              Please sign-in to your account and start the adventure
            </Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              id="email"
              label="Email"
              name="email"
              sx={{ marginBottom: 4 }}
              required
              error={errors.email ? true : false}
              helperText={errors.email && errors.email}
              onChange={handleChange}
              // onChange={(e) => setEmail(e.target.value)}
              // onChange={handleChange('email')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                // value={values.password}
                id="auth-login-password"
                name="password"
                required
                error={errors.password ? true : false}
                onChange={handleChange}
                // onChange={(e) => setPassword(e.target.value)}
                // onChange={handleChange('password')}
                type={isShowPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility">
                      {isShowPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText error={errors.password ? true : false}>
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {/* <FormControlLabel control={<Checkbox />} label="Remember Me" /> */}
              <div></div>
              <Link href="/forgot-password">
                <LinkStyled
                  sx={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/forgot-password');
                  }}>
                  Forgot Password?
                </LinkStyled>
              </Link>
            </Box>
            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              loading={loading}
              variant="contained"
              sx={{ marginBottom: 7 }}>
              Login
            </LoadingButton>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ marginRight: 2 }}>
              New on our platform?
            </Typography>
            <Typography variant='body2'>
              <Link passHref href='/pages/register'>
                <LinkStyled>Create an account</LinkStyled>
              </Link>
            </Typography>
          </Box> */}
            {/* <Divider sx={{ my: 5 }}>or</Divider>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href='/' passHref>
              <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                <Facebook sx={{ color: '#497ce2' }} />
              </IconButton>
            </Link>
            <Link href='/' passHref>
              <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                <Twitter sx={{ color: '#1da1f2' }} />
              </IconButton>
            </Link>
            <Link href='/' passHref>
              <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                <Github
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                />
              </IconButton>
            </Link>
            <Link href='/' passHref>
              <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                <Google sx={{ color: '#db4437' }} />
              </IconButton>
            </Link>
          </Box> */}
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;
