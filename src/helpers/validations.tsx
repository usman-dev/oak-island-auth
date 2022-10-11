export function referrelValidate(values: any) {
  const validateNumeric = new RegExp('^[1-9][0-9]*$');
  let errors: any = {};

  if (values.referralAmount <= 0) {
    errors.referralAmount = 'This field not to be 0 and negative';
  } else if (values.referralAmount > 999999) {
    errors.referralAmount = 'Value must be less than 1000000';
  } else if (
    values.referralAmount &&
    validateNumeric.test(values.referralAmount) === false
  ) {
    errors.referralAmount = 'Value must not start with 0';
  }

  if (values.refereeAmount <= 0) {
    errors.refereeAmount = 'This field not to be 0 and negative';
  } else if (values.refereeAmount > 999999) {
    errors.refereeAmount = 'Value must be less than 1000000';
  } else if (
    values.refereeAmount &&
    validateNumeric.test(values.refereeAmount) === false
  ) {
    errors.refereeAmount = 'Value must not start with 0';
  }

  if (values.inviteSentCount <= 0) {
    errors.inviteSentCount = 'This field not to be 0 and negative';
  } else if (values.inviteSentCount > 999999) {
    errors.inviteSentCount = 'Value must be less than 1000000';
  } else if (
    values.inviteSentCount &&
    validateNumeric.test(values.inviteSentCount) === false
  ) {
    errors.inviteSentCount = 'Value must not start with 0';
  }

  if (values.referralAmountCollectCount <= 0) {
    errors.referralAmountCollectCount = 'This field not to be 0 and negative';
  } else if (values.referralAmountCollectCount > 999999) {
    errors.referralAmountCollectCount = 'Value must be less than 1000000';
  } else if (
    values.referralAmountCollectCount &&
    validateNumeric.test(values.referralAmountCollectCount) === false
  ) {
    errors.referralAmountCollectCount = 'Value must not start with 0';
  }

  if (values.notificationSentCount <= 0) {
    errors.notificationSentCount = 'This field not to be 0 and negative';
  } else if (values.notificationSentCount > 999999) {
    errors.notificationSentCount = 'Value must be less than 1000000';
  } else if (
    values.notificationSentCount &&
    validateNumeric.test(values.notificationSentCount) === false
  ) {
    errors.notificationSentCount = 'Value must not start with 0';
  }

  if (values.timeInterval <= 0) {
    errors.timeInterval = 'This field not to be 0 and negative';
  } else if (values.timeInterval > 999999) {
    errors.timeInterval = 'Value must be less than 1000000';
  } else if (
    values.timeInterval &&
    validateNumeric.test(values.timeInterval) === false
  ) {
    errors.timeInterval = 'Value must not start with 0';
  }
  return errors;
}

export function accountSettingsValidate(values: any) {
  const validateNumeric = new RegExp('^[1-9][0-9]*$');
  let errors: any = {};

  if (values.walletBalanceLimit <= 0) {
    errors.walletBalanceLimit = 'This field not to be 0 and negative';
  } else if (values.walletBalanceLimit > 999999) {
    errors.walletBalanceLimit = 'Value must be less than 1000000';
  } else if (
    values.walletBalanceLimit &&
    validateNumeric.test(values.walletBalanceLimit) === false
  ) {
    errors.walletBalanceLimit = 'Value must not start with 0';
  }

  if (values.dailySpendLimit <= 0) {
    errors.dailySpendLimit = 'This field not to be 0 and negative';
  } else if (values.dailySpendLimit > 999999) {
    errors.dailySpendLimit = 'Value must be less than 1000000';
  } else if (
    values.dailySpendLimit &&
    validateNumeric.test(values.dailySpendLimit) === false
  ) {
    errors.dailySpendLimit = 'Value must not start with 0';
  }

  if (values.otpTime <= 0) {
    errors.otpTime = 'This field not to be 0 and negative';
  } else if (values.otpTime > 1000) {
    errors.otpTime = 'Value must be upto 1000';
  } else if (values.otpTime && validateNumeric.test(values.otpTime) === false) {
    errors.otpTime = 'Value must not start with 0';
  }

  if (values.otpValidityTime <= 0) {
    errors.otpValidityTime = 'This field not to be 0 and negative';
  } else if (values.otpValidityTime > 1000) {
    errors.otpValidityTime = 'Value must be upto 1000';
  } else if (values.otpValidityTime === '') {
    errors.otpValidityTime = 'Value must not be empty';
  } else if (
    values.otpValidityTime &&
    validateNumeric.test(values.otpValidityTime) === false
  ) {
    errors.otpValidityTime = 'Value must not start with 0';
  }

  return errors;
}

export function userValidate(values: any) {
  let errors: any = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.name) {
    errors.name = 'Name is required';
  }

  return errors;
}

export const agentValidate = (values: any) => {
  let errors: any = {};

  if (!values.agentName) {
    errors.agentName = 'Name is required';
  }
  if (!values.parish) {
    errors.parish = 'Parish is required';
  }
  if (!values.town) {
    errors.town = 'Town is required';
  }
  if (!values.latitude) {
    errors.latitude = 'Latitude is required';
  }
  if (!values.longitude) {
    errors.longitude = 'Longitude is required';
  }

  return errors;
};

export function emailValidate(value: any) {
  let errors: any = {};

  if (!value.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(value.email)) {
    errors.email = 'Email address is invalid';
  }
  return errors;
}

export function loginValidate(values: any) {
  let errors: any = {};

  errors = { ...emailValidate(values) };
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!/.{8,}/.test(values.password)) {
    errors.password = 'Password must contain 8 letters';
  }

  return errors;
}

export function resetPasswordValidate(values: any) {
  let errors: any = {};
  errors = { ...emailValidate(values) };
  if (!values.code) {
    errors.code = 'OTP is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!/.{8,}/.test(values.password)) {
    errors.password = 'Password must contain 8 letters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Passowrd is required';
  } else if (values.password != values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password does not match';
  }
  return errors;
}

export function countryValidate(values: any) {
  let errors: any = {};
  let alphabetRegex = /^[a-zA-Z]+$/;
  let prefixRegex = /^\+(?:[\d]*)$/;

  if (!values.countryName) {
    errors.countryName = 'Country Name is required';
  }
  if (!values.countryCode) {
    errors.countryCode = 'Country Code is required';
  }
  if (!alphabetRegex.test(values.countryCode)) {
    errors.countryCode = 'Country Code Must Be Alphabets Only';
  }
  if (!values.currency) {
    errors.currency = 'Currency is required';
  }
  if (!values.phonePrefix) {
    errors.phonePrefix = 'Phone Prefix is required';
  }
  if (!prefixRegex.test(values.phonePrefix)) {
    errors.phonePrefix = 'Correct Prefix Example +123';
  }

  return errors;
}

export function menuValidate(values: any) {
  let errors: any = {};
  if (!values.cardName) {
    errors.cardName = 'Card Name is required';
  }
  return errors;
}

export function menuCardCategoryValidate(values: any) {
  let errors: any = {};
  if (!values.categoryName) {
    errors.categoryName = 'Category Name is required';
  }
  if (!values.categoryStatus) {
    errors.categoryStatus = 'Category Status is required';
  }
  return errors;
}

export function faetureValidate(values: any) {
  let errors: any = {};
  if (!values.featureId) {
    errors.featureId = 'Feature Id is required';
  }
  return errors;
}

export function categoryValidate(values: any) {
  let errors: any = {};
  if (!values.categoryName) {
    errors.categoryName = 'Category Name is required';
  }
  return errors;
}

export function faqValidate(values: any) {
  let errors: any = {};
  if (!values.question) {
    errors.question = 'Question is required';
  }
  if (!values.answer) {
    errors.answer = 'Answer is required';
  }
  return errors;
}

export function secretQuesValidate(values: any) {
  let errors: any = {};
  if (!values.question) {
    errors.question = 'Question is required';
  }
  return errors;
}

export function carouselValidate(values: any) {
  let errors: any = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  if (!values.subtitle) {
    errors.subtitle = 'SubTitle is required';
  }
  return errors;
}

export function voucherValidate(values: any) {
  let errors: any = {};
  if (!values.campaignName) {
    errors.campaignName = 'Name is required';
  }
  if (!values.campaignCode) {
    errors.campaignCode = 'Code is required';
  }
  if (!values.campaignStartDate) {
    errors.campaignStartDate = 'Valid From is required';
  }
  if (!values.campaignEndDate) {
    errors.campaignEndDate = 'Valid To is required';
  }
  if (!values.bonusAmount) {
    errors.bonusAmount = 'Bonus Amount is required';
  }
  if (!values.campaignTotalBudget) {
    errors.campaignTotalBudget = 'Total Budget is required';
  }
  if (new Date(values.campaignStartDate) > new Date(values.campaignEndDate)) {
    errors.campaignStartDate = 'Valid From should be earlier than valid to';
  }
  return errors;
}

export function feedbackValidate(values: any) {
  let errors: any = {};
  errors = { ...emailValidate(values) };
  if (!values.title) {
    errors.title = 'Title is required';
  }
  return errors;
}
