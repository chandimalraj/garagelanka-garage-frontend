const mobilePattern = new RegExp(/^\d{10}$/);
const passwordPattern = new RegExp(/^.{6,10}$/);
const otpPattern = new RegExp(/^\d{6}$/);

export const mobileValidation = (mobile) => {
  if (mobilePattern.test(mobile)) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidation = (password) => {
  console.log(passwordPattern.test(password));
  if (passwordPattern.test(password)) {
    return true;
  } else {
    return false;
  }
};

export const otpValidation = (otp) => {
 
  if (otpPattern.test(otp)) {
    return true;
  } else {
    return false;
  }
};
