import { React, useState } from "react";
import {
  Button,
  Paper,
  TextField,
  Checkbox,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import "../login.css";
import logo from "../../../assets/images/logo3.png";
import styled from "styled-components";
import { PASSWORD, TEXT } from "../consts";
import { showToasts } from "../../toast";
import { ToastContainer } from "react-toastify";
import {
  mobileValidation,
  otpValidation,
  passwordValidation,
} from "../validation/validation";
import { getOtp, sendOtp, setNewPassword } from "../../../services/authService";
import jwtDecode from "jwt-decode";

export default function ForgotPassword(props) {
  const { controlShow } = props;

  const [type, setType] = useState(PASSWORD);

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [error, setError] = useState("");

  const [showMobile, setShowMobile] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [showPasword, setShowPassword] = useState(false);

  const sheet = {
    mainTopic: {
      fontSize: 60,
    },
    mainTopicSm: {
      fontSize: 30,
    },
  };

  const submitMobile = async (e) => {
    e.preventDefault();

    const mobileValid = mobileValidation(mobile);

    if (mobileValid) {
      setError("");
    } else {
      setError("Please Enter Valid Phone Number");
      return;
    }

    try {
      const data = {
        mobile: mobile,
      };

      const response = await getOtp(data);
      if (response.status == 200) {
        setShowMobile(false);
        setShowOtp(true);
      }
    } catch (error) {
      console.log(error);
      showToasts('ERROR',"Attempt Unsuccessfull")
    }
  };

  const submitOtp = async (e) => {
    // e.preventDefault();

    const otpValid = otpValidation(otp);

    if (otpValid) {
      setError("");
    } else {
      setError("Please Enter Valid OTP");
      return;
    }
    try {
      const data = {
        mobile: mobile,
        code: otp,
      };

      const response = await sendOtp(data);
      if (response.status == 200) {
        console.log(response)
        const token = response.data.token;
        const decode = jwtDecode(token);
        if (decode.user.passwordreset) {
          localStorage.setItem("jwtToken", token);
        } else {
          console.log(decode);
        }
        setShowOtp(false);
        setShowPassword(true);

      }
    } catch (error) {
      console.log(error);
      showToasts('ERROR',"Attempt Unsuccessfull")
    }
  };

  const submitPassword = async (e) => {
    // e.preventDefault();

    const passwordValid = passwordValidation(password);

    if (passwordValid && password == confPass) {
      setError("");
     
    }
    if (!passwordValid) {
      setError("Password should contain 6 to 10 characters");
      return;
    }
    if (password === confPass) {
      setError("Passwords don't match");
      return;
    }
    try {
      const data = {
        password: password,
      };
     console.log("set new password")
      const response = await setNewPassword(data);
      console.log(response)
      if (response.status == 200) {
        setShowPassword(false);
        localStorage.removeItem('jwtToken')
        controlShow();
        showToasts('SUCCESS','Your Password has been changed successfully')
      }
    } catch (error) {
      console.log(error);
      showToasts('ERROR',"Attempt Unsuccessfull")
    }
  };

  const mobileInput = () => {
    return (
      <div className="mb-2">
        <label className="text-small mb-1">Mobile Number</label>
        <TextField
          type="text"
          align="center"
          fullWidth
          placeholder="Mobile Number"
          name="mobile"
          variant="outlined"
          value={mobile}
          onChange={(e) => {
            setError("");
            setMobile(e.target.value);
          }}
          required
          autoFocus
          autoComplete="off"
          classes="text-field"
          sx={{
            "& .MuiInputBase-root": {
              color: "primary.main",
            },
            "& input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ebecec", // Normal state border color
              },
              "&:hover fieldset": {
                borderColor: "gray", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
            },
          }}
        />
        <div className="error">{error}</div>
        <div className="mb-4"></div>
        <div className="d-flex justify-content-right flex-column mb-4">
          <Button
            fullWidth
            variant="contained"
            color="info"
            type="submit"
            onClick={submitMobile}
          >
            <Typography color="white" fontSize="14px">
              Submit Mobile
            </Typography>
          </Button>
          <p className="mt-2 text-small link ">
            Contact Garage.lk
            <a className="link-offset-2 link-underline link-opacity-100-hover mx-3">
              click here?
            </a>
          </p>
        </div>
      </div>
    );
  };

  const otpInput = () => {
    return (
      <div className="mb-2">
        <label className="text-small mb-1">Enter Otp here</label>
        <TextField
          type="text"
          align="center"
          //   ref={userRef}
          fullWidth
          placeholder="Otp"
          name="otp"
          variant="outlined"
          value={otp}
          onChange={(e) => {
            setError("");
            setOtp(e.target.value);
          }}
          required
          autoFocus
          autoComplete="off"
          classes="text-field"
          //   color="secondary"
          sx={{
            "& .MuiInputBase-root": {
              color: "primary.main",
            },
            "& input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ebecec", // Normal state border color
              },
              "&:hover fieldset": {
                borderColor: "gray", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
            },
          }}
        />
        <div className="error">{error}</div>
        <div className="mb-4"></div>
        <div className="d-flex justify-content-right flex-column mb-4">
          <Button
            fullWidth
            variant="contained"
            color="info"
            type="submit"
            onClick={() => {
              submitOtp();
            }}
          >
            <Typography color="white" fontSize="14px">
              Submit OTP
            </Typography>
          </Button>
          <p className="mt-2 text-small link ">
            Contact Garage.lk
            <a
              className="link-offset-2 link-underline link-opacity-100-hover mx-3 "
              // onClick={() => {
              //   controlShow();
              // }}
            >
              click here?
            </a>
          </p>
        </div>
      </div>
    );
  };
  const passwordInput = () => {
    return (
      <div className="mb-2">
        <label className="text-small mb-1">Enter Password here</label>
        <TextField
          type="password"
          align="center"
          fullWidth
          placeholder="Password"
          name="otp"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
          required
          autoFocus
          autoComplete="off"
          classes="text-field"
          sx={{
            "& .MuiInputBase-root": {
              color: "primary.main",
            },
            "& input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ebecec", // Normal state border color
              },
              "&:hover fieldset": {
                borderColor: "gray", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
            },
          }}
        />
        <label className="text-small mb-1 mt-2">Confirm Password</label>
        <TextField
          type="password"
          align="center"
          fullWidth
          placeholder="Confirm Password"
          name="otp"
          variant="outlined"
          value={confPass}
          onChange={(e) => {
            setError("");
            setConfPass(e.target.value);
          }}
          required
          autoFocus
          autoComplete="off"
          classes="text-field"
          sx={{
            "& .MuiInputBase-root": {
              color: "primary.main",
            },
            "& input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ebecec", // Normal state border color
              },
              "&:hover fieldset": {
                borderColor: "gray", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
            },
          }}
        />
        <div className="error">{error}</div>
        <div className="mb-4"></div>
        <div className="d-flex justify-content-right flex-column mb-4">
          <Button
            fullWidth
            variant="contained"
            color="info"
            type="submit"
            onClick={() => {
              submitPassword();
            }}
          >
            <Typography color="white" fontSize="14px">
              Submit New Password
            </Typography>
          </Button>
          <p className="mt-2 text-small link ">
            Contact Garage.lk
            <a
              className="link-offset-2 link-underline link-opacity-100-hover mx-3 "
              // onClick={() => {
              //   controlShow();
              // }}
            >
              click here?
            </a>
          </p>
        </div>
      </div>
    );
  };

  return (
    <Paper
      elevation={5}
      className="login-paper h-100 d-center flex-column "
      sx={{
        background:
          "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(163,167,171,1) 100%);",
      }}
    >
      <img src={logo} className="d-lg-none" />
      <div className="d-flex justify-content-center mb-5 ">
        <h1
          style={sheet.mainTopicSm}
          className="text-white text-shadow-sm d-inline d-lg-none text-center"
        >
          WELCOME TO GARAGE MANAGER
        </h1>
      </div>
      <hr></hr>

      <div className="w-75 mb-4 text-white">
        <h1 className="text-left text-large mt-2 mb-2  m-0 p-0">
          Restore Password
        </h1>
      </div>

      <div
        className="w-75 mb-5 text-white"
        //   onSubmit={handleSubmit}
      >
        <div className="w-100">
          {showMobile ? mobileInput() : null}
          {showOtp ? otpInput() : null}
          {showPasword ? passwordInput() : null}

          <Button
            variant="contained"
            color="info"
            onClick={() => {
              controlShow();
            }}
          >
            <Typography>Back</Typography>
          </Button>
        </div>
      </div>
    </Paper>
  );
}
