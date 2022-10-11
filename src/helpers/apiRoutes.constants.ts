export const API_ROUTES = {
  //Auth
  login: '/usersbackoffice/v1/signin',
  // login: '/api/users/signin',
  register: '/usersbackoffice/v1/signup',
  currentUser: '/api/users/currentuser',
  signOut: '/user/v1/bpsignout',

  // Reports
  getRegisterReport: '/usersbackoffice/v1/bpgetusersrecord',
  getReferralReport: '/report/v1/redeem-referral',
  getCampaignReport: '/report/v1/redeem-campaign',

  //Category
  getCategory: '/productbackoffice/v1/category',
  deleteCategory: '/productbackoffice/v1/category',
  addCategory: '/productbackoffice/v1/category',
  editCategory: '/productbackoffice/v1/category',
  categoryBulkUpload: '/productbackoffice/v1/bulkCategory',

  //Privacy Policy
  getPrivacyPolicy: '/productbackoffice/v1/privacyPolicy',
  editPrivacyPolicy: '/productbackoffice/v1/privacyPolicy',

  //Terms and Conditions
  getTermCondition: '/productbackoffice/v1/termCondition',
  editTermCondition: '/productbackoffice/v1/termCondition',

  //Product
  addAmount: '/productbackoffice/v1/amount',
  getAmount: '/productbackoffice/v1/amount',
  deleteAmount: '/productbackoffice/v1/amount',
  addBank: '/productbackoffice/v1/bank',
  updateBank: '/productbackoffice/v1/bank',
  getBank: '/productbackoffice/v1/bank',
  deleteBank: '/productbackoffice/v1/bank',

  //Agent
  getAgent: '/productbackoffice/v1/agent',
  addAgent: '/productbackoffice/v1/agent',
  deleteAgent: '/productbackoffice/v1/agent',
  editAgent: '/productbackoffice/v1/agent',
  agentsBulkUpload: '/productbackoffice/v1/bulkAgents',

  //Faq
  getFaq: '/productbackoffice/v1/faq',
  deleteFaq: '/productbackoffice/v1/faq',
  addFaq: '/productbackoffice/v1/faq',
  editFaq: '/productbackoffice/v1/faq',
  getFaqCategories: '/productbackoffice/v1/faqCategory',
  deleteFaqCategory: '/productbackoffice/v1/faqCategory',
  addFaqCategory: '/productbackoffice/v1/faqCategory',
  editFaqCategory: '/productbackoffice/v1/faqCategory',

  //Notifications
  getNotifications: '/notification/v1/get-template',
  deleteNotifications: '/notification/v1/delete-template',
  addNotifications: '/notification/v1/set-template',
  editNotifications: '/notification/v1/set-template',

  //Users
  getUsers: '/productbackoffice/v1/user',
  // getUsers: '/api/product/user',
  addUser: '/usersbackoffice/v1/signup',
  deleteUser: '/productbackoffice/v1/user',
  editUser: '/productbackoffice/v1/user',
  // editUser: '/api/product/user',
  forgotPassword: '/usersbackoffice/v1/forgot-password',
  resetPassword: '/usersbackoffice/v1/reset-password',
  createUser: '/usersbackoffice/v1/createuser',
  confirmPassword: '/usersbackoffice/v1/confirmuser',

  //Parish
  getParish: '/productbackoffice/v1/address',
  deleteParish: '/productbackoffice/v1/address',
  addParish: '/productbackoffice/v1/address',
  editParish: '/productbackoffice/v1/address',
  parishBulkUpload: '/productbackoffice/v1/bulkAddress',

  //Banners
  getBanners: '/productbackoffice/v1/promBanner',
  addBanners: '/productbackoffice/v1/promBanner',
  deleteBanner: '/productbackoffice/v1/promBanner',
  editBanner: '/productbackoffice/v1/promBanner',

  //Bill Category and Company
  getBillCategory: '/productbackoffice/v1/billCategory',
  deleteBillCategory: '/productbackoffice/v1/billCategory',
  addBillCategory: '/productbackoffice/v1/billCategory',
  editBillCategory: '/productbackoffice/v1/billCategory',

  getBillCompany: '/productbackoffice/v1/billCompany',
  deleteBillCompany: '/productbackoffice/v1/billCompany',
  addBillCompany: '/productbackoffice/v1/billCompany',
  editBillCompany: '/productbackoffice/v1/billCompany',

  //Menu Cards
  card: '/productbackoffice/v1/card',
  menuCardOrder: '/productbackoffice/v1/card/order',

  //Card Widget
  cardWidget: '/productbackoffice/v1/widget',

  //Card Categories
  cardCategory: '/productbackoffice/v1/cardCategory',
  cardCategoryOrder: '/productbackoffice/v1/cardCategory/order',
  categoryEnums: '/productbackoffice/v1/categoryEnums',

  //Common
  common: '/productbackoffice/v1/common',

  //Referral
  addReferral: '/productbackoffice/v1/invite',
  getReferral: '/productbackoffice/v1/invite',
  // addReferral: '/api/product/invite',
  // getReferral: '/api/product/invite',

  // Feedback Category
  addFeedbackCategory: '/category/v1/categories',
  getFeedbackCategory: '/category/v1/categories',
  deleteFeedbackCategory: '/category/v1/category',
  editFeedbackCategory: '/category/v1/category',

  //Account Settings
  accountSettings: '/productbackoffice/v1/accountSetting',
  // accountSettings: '/api/product/accountSetting',

  //logs
  logs: '/productbackoffice/v1/metrics',

  //Contact Information
  contactInformation: '/productbackoffice/v1/contactInformation',

  //Secret Question
  secretQuestion: '/productbackoffice/v1/secretQuestion',
  // secretQuestion: '/api/product/secretQuestion',

  //Splash Screen
  splashScreen: '/productbackoffice/v1/splashScreen',

  //Country
  country: '/productbackoffice/v1/country',
  countriesBulkUpload: '/productbackoffice/v1/bulkcountry',

  getCampaign: '/campaignBackoffice/v1/get-campaign',
  createCampaign: '/campaignBackoffice/v1/create-campaign',
  updateCampaign: '/campaignBackoffice/v1/update-campaign',

  carousel: '/productbackoffice/v1/carousel',
  carouselOrder: '/productbackoffice/v1/carousel/order',
  bannersOrder: '/productbackoffice/v1/promBanner/order',

  // Hamburger menu
  hamburger: '/productbackoffice/v1/hamburger',
  hamburgerFeature: '/productbackoffice/v1/hamburgerFeature',

  //Wallet Image
  walletImage: '/productbackoffice/v1/walletImage',
  //topups
  topup: '/productbackoffice/v1/topUp',
};

export const BASE_PATH = process.env.BASE_URL;

// export const BASE_PATH = 'http://localhost:3000';
// export const BASE_PATH = 'http://dev.mc.mycashfs.com:3000';
// export const BASE_PATH = 'http://dev-be.mc.mycashfs.com:3000';
// export const BASE_PATH_2 = 'http://dev.mc.mycashfs.com:3007';
// export const BASE_PATH_3 = 'http://dev.mc.mycashfs.com:3006';
// export const BASE_PATH = 'http://localhost:3000';

// export const API_ROUTES = {
//   //Auth
//   login: '/api/users/signin',
//   register: '/api/users/signup',
//   currentUser: '/api/users/currentuser',
//   signOut: '/api/users/signout',

//   //Reports
//   getRegisterReport: '/api/users/bpgetusersrecord',

//   //Category
//   getCategory: '/api/product/category',
//   deleteCategory: '/api/product/category',
//   addCategory: '/api/product/category',
//   editCategory: '/api/product/category',
//   categoryBulkUpload: '/api/product/bulkCategory',

//   //Privacy Policy
//   getPrivacyPolicy: '/api/product/privacyPolicy',
//   editPrivacyPolicy: '/api/product/privacyPolicy',

//   //Terms and Conditions
//   getTermCondition: '/api/product/termCondition',
//   editTermCondition: '/api/product/termCondition',

//   //Product
//   addAmount: '/api/product/amount',
//   getAmount: '/api/product/amount',
//   deleteAmount: '/api/product/amount',
//   addBank: '/api/product/bank',
//   updateBank: '/api/product/bank',
//   getBank: '/api/product/bank',
//   deleteBank: '/api/product/bank',

//   //Agent
//   getAgent: '/api/product/agent',
//   addAgent: '/api/product/agent',
//   deleteAgent: '/api/product/agent',
//   editAgent: '/api/product/agent',
//   agentsBulkUpload: '/api/product/bulkagents',

//   //Faq
//   getFaq: '/api/product/faq',
//   deleteFaq: '/api/product/faq',
//   addFaq: '/api/product/faq',
//   editFaq: '/api/product/faq',
//   getFaqCategories: '/api/product/faqCategory',
//   deleteFaqCategory: '/api/product/faqCategory',
//   addFaqCategory: '/api/product/faqCategory',
//   editFaqCategory: '/api/product/faqCategory',

//   //Notifications
//   getNotifications: '/api/notifications/templates/get-template',
//   deleteNotifications: '/api/notifications/templates/delete-template',
//   addNotifications: '/api/notifications/templates/set-template',
//   editNotifications: '/api/notifications/templates/set-template',

//   //Users
//   getUsers: '/api/product/user',
//   addUser: '/api/users/signup',
//   deleteUser: '/api/product/user',
//   editUser: '/api/product/user',
//   forgotPassword: '/api/users/forgotpassword',
//   resetPassword: '/api/users/newpassword',
//   createUser: '/api/users/createuser',
//   confirmPassword: '/api/users/confirmuser',

//   //Parish
//   getParish: '/api/product/address',
//   deleteParish: '/api/product/address',
//   addParish: '/api/product/address',
//   editParish: '/api/product/address',
//   parishBulkUpload: '/api/product/bulkAddress',

//   //Banners
//   getBanners: '/api/product/promBanner',
//   addBanners: '/api/product/promBanner',
//   deleteBanner: '/api/product/promBanner',
//   editBanner: '/api/product/promBanner',

//   //Bill Category and Company
//   getBillCategory: '/api/product/billCategory',
//   deleteBillCategory: '/api/product/billCategory',
//   addBillCategory: '/api/product/billCategory',
//   editBillCategory: '/api/product/billCategory',

//   getBillCompany: '/api/product/billCompany',
//   deleteBillCompany: '/api/product/billCompany',
//   addBillCompany: '/api/product/billCompany',
//   editBillCompany: '/api/product/billCompany',

//   //Menu Cards
//   card: '/api/product/card',

//   //Card Widget
//   cardWidget: '/api/product/widget',

//   //Card Categories
//   cardCategory: '/api/product/cardCategory',
//   cardCategoryOrder: '/api/product/cardCategory/order',

//   categoryEnums: '/api/product/categoryEnums',
//   //Common
//   common: '/api/product/common',

//   //Referral
//   addReferral: '/api/product/invite',
//   getReferral: '/api/product/invite',

//   // Feedback Category
//   addFeedbackCategory: '/api/categories',
//   getFeedbackCategory: '/api/categories',
//   deleteFeedbackCategory: '/api/category',
//   editFeedbackCategory: '/api/category',

//   //Account Settings
//   accountSettings: '/api/product/accountSetting',

//   //logs
//   logs: '/api/product/metrics',

//   //Contact Information
//   contactInformation: '/api/product/contactInformation',

//   //Country
//   country: '/api/product/country',
//   countriesBulkUpload: '/api/product/bulkcountry',

//   getCampaign: '/api/campaign/get-campaign',
//   createCampaign: '/api/campaign/create-campaign',
//   updateCampaign: '/api/campaign/update-campaign',

//   // Hamburger menu
//   hamburger: '/productbackoffice/v1/hamburger',
//   hamburgerFeature: '/productbackoffice/v1/hamburgerFeature',

//   topup: '/api/product/topUp',
// };
