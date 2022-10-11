// ** Icon imports
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FrequentlyAskedQuestions from 'mdi-material-ui/FrequentlyAskedQuestions';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhotoIcon from '@mui/icons-material/Photo';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LockQuestion from 'mdi-material-ui/LockQuestion';
import CellPhone from 'mdi-material-ui/Cellphone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FlagIcon from '@mui/icons-material/Flag';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';
import { AuthContext } from 'src/context/auth/AuthContext';
import { useContext } from 'react';

const navigation = (): VerticalNavItemsType => {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  let pages: any[] = [{}];

  user?.role === 'SUPER_ADMIN'
    ? (pages = [
        {
          title: 'Account Limits',
          icon: SettingsIcon,
          path: '/account-settings',
        },
        {
          title: 'OTP Settings',
          icon: SettingsIcon,
          path: '/otp-settings',
        },
        {
          title: 'Countries',
          icon: FlagIcon,
          path: '/countries',
        },
        {
          title: 'Splash Screen',
          icon: AddPhotoAlternateIcon,
          path: '/splashscreen',
        },
        {
          title: 'Wallet Image',
          icon: AddPhotoAlternateIcon,
          path: '/wallet-image',
        },
        {
          title: 'Carousel Config',
          icon: ViewCarouselIcon,
          path: '/carousel',
        },
        {
          title: 'Menu Cards',
          icon: AppsIcon,
          path: '/menu-cards',
        },
        {
          title: 'Hamburger Menu',
          icon: MenuIcon,
          path: '/hamburger-menu',
        },
        {
          title: 'Features',
          icon: CategoryOutlinedIcon,
          path: '/categories',
        },
        {
          title: 'Vouchers',
          icon: ConfirmationNumberIcon,
          path: '/vouchers',
        },
        {
          title: 'P2P',
          icon: PaymentsIcon,
          path: '/p2p',
        },

        {
          title: 'Agents',
          icon: SupportAgentIcon,
          path: '/agents',
        },
        {
          title: 'Topup',
          icon: CellPhone,
          path: '/topup',
        },
        {
          title: 'Users',
          icon: GroupIcon,
          path: '/users',
        },
        {
          title: 'Parish and Towns',
          icon: LocationCityIcon,
          path: '/parish',
        },
        {
          title: 'Promotional Banners',
          icon: PhotoIcon,
          path: '/banners',
        },
        {
          title: 'Bill Categories',
          icon: AttachMoneyIcon,
          path: '/bill-category',
        },
        {
          title: 'Reports',
          icon: SummarizeIcon,
          path: '/reports',
        },
        {
          title: 'Invite & Earn',
          icon: GroupAddIcon,
          path: '/invite-and-earn',
        },
        {
          title: 'Feedback Category',
          icon: FeedbackIcon,
          path: '/feedback',
        },
        // {
        //   title: 'Notifications',
        //   icon: NotificationsActiveIcon,
        //   path: '/notifications',
        // },
        // {
        //   title: 'Logs',
        //   icon: BarChartIcon,
        //   path: '/serverlogs',
        // },
        {
          title: 'FAQs',
          icon: FrequentlyAskedQuestions,
          path: '/faq',
        },
        {
          title: 'Secret Questions',
          icon: LockQuestion,
          path: '/secret-question',
        },
        {
          title: 'Help And Support',
          icon: HelpCenterIcon,
          path: '/helpAndSupport',
        },
        // {
        //   title: 'Terms & Conditions',
        //   icon: FileDocumentMultipleOutline,
        //   path: '/terms-condition',
        // },
        // {
        //   title: 'Privacy Policy',
        //   icon: PolicyOutlinedIcon,
        //   path: '/policy',
        // },
      ])
    : (pages = [
        {
          title: 'Account Limits',
          icon: SettingsIcon,
          path: '/account-settings',
        },
        {
          title: 'OTP Settings',
          icon: SettingsIcon,
          path: '/otp-settings',
        },
        {
          title: 'Countries',
          icon: FlagIcon,
          path: '/countries',
        },
        {
          title: 'Splash Screen',
          icon: AddPhotoAlternateIcon,
          path: '/splashscreen',
        },
        {
          title: 'Wallet Image',
          icon: AddPhotoAlternateIcon,
          path: '/wallet-image',
        },
        {
          title: 'Carousel Config',
          icon: ViewCarouselIcon,
          path: '/carousel',
        },
        {
          title: 'Menu Cards',
          icon: AppsIcon,
          path: '/menu-cards',
        },
        {
          title: 'Hamburger Menu',
          icon: MenuIcon,
          path: '/hamburger-menu',
        },
        {
          title: 'Features',
          icon: CategoryOutlinedIcon,
          path: '/categories',
        },
        {
          title: 'P2P',
          icon: PaymentsIcon,
          path: '/p2p',
        },

        {
          title: 'Agents',
          icon: SupportAgentIcon,
          path: '/agents',
        },
        {
          title: 'Topup',
          icon: CellPhone,
          path: '/topup',
        },
        {
          title: 'Parish and Towns',
          icon: LocationCityIcon,
          path: '/parish',
        },
        {
          title: 'Promotional Banners',
          icon: PhotoIcon,
          path: '/banners',
        },
        {
          title: 'Bill Categories',
          icon: AttachMoneyIcon,
          path: '/bill-category',
        },
        {
          title: 'Reports',
          icon: SummarizeIcon,
          path: '/reports',
        },
        {
          title: 'Feedback Category',
          icon: FeedbackIcon,
          path: '/feedback',
        },
        {
          title: 'FAQs',
          icon: FrequentlyAskedQuestions,
          path: '/faq',
        },
        {
          title: 'Secret Questions',
          icon: LockQuestion,
          path: '/secret-question',
        },
        {
          title: 'Help And Support',
          icon: HelpCenterIcon,
          path: '/helpAndSupport',
        },
      ]);

  return pages;
};

export default navigation;
