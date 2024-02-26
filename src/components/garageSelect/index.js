import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { showToasts } from "../toast";
import "./garage.css";
import { Box, ButtonBase, Grid } from "@mui/material";
import logo from "../../assets/images/skyway.png";
import star from "../../assets/images/star.png";
import filledstar from "../../assets/images/star-filled.png";
import { ThemeProvider, useTheme, styled } from "@mui/material/styles";
import garageLanka from "../../assets/images/logo3.png";
import { connect } from "react-redux";
import { useLoggedUserValidation } from "../../utils/helpers/Permission";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ownerLogin } from "../../services/authService";

function Garages({ user }) {
  const [garages, setGarages] = useState([1, 2, 3, 4, 5]);
  const [serviceCenters, setServiceCenters] = useState(user?.serviceCenters);
  // let serviceCenters = user?.serviceCenters
  const navigate = useNavigate();

  useEffect(() => {
    getGarages();
  }, []);

  const getGarages = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const decoded = jwtDecode(token);
      const user = decoded.user;
      const serviceCenters = user.serviceCenters;
      console.log(serviceCenters);
      setServiceCenters(serviceCenters);
      if (!user.redirect) {
        navigate("/app");
      }
    } catch (error) {
      navigate("/");
    }
  };

  const onGarageSelect = async (item) => {
    const serviceCenterID = item.serviceCenterID;
    console.log(serviceCenterID);
    ownerLogin("api/auth/ownertoken", "POST", {
      serviceCenterID: serviceCenterID,
    })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        navigate("/app");
        showToasts("SUCCESS", "Login to service center Success");
      })
      .catch((error) => {
        console.log(error);
      });
    // try {
    //   const response = ownerLogin("api/auth/ownertoken", "POST", {
    //     serviceCenterID: serviceCenterID,
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="garage-select position-relative">
      <div className="container d-flex flex-column p-5 ">
        <div className="d-flex justify-content-center garage-select-heading text-center font-poppins align-items-center">
          <img src={garageLanka} className="mx-3" />
          <div> Select Which Garage You Want To Manage</div>
        </div>
        <Grid
          container
          spacing={2}
          marginTop={5}
          marginX={0}
          className="grid"
          marginBottom={10}
        >
          {serviceCenters?.map((item, index) => (
            <Grid item lg={4} xs={12} md={6} sm={12}>
              <ButtonBase
                sx={{
                  width: "100%",
                  backgroundImage: `url('https://img.freepik.com/free-photo/muscular-car-service-worker-repairing-vehicle_146671-19605.jpg?w=1060&t=st=1689698865~exp=1689699465~hmac=e990e8a700627dcaaebd0e53824a52dc68c7ef5687dcbd4123105af36a10aed4')`,
                  height: 200,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  fontFamily: "poppins",
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 1,
                    transform: "scale(1.01)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#2d2e2f", // Replace with your desired color and opacity
                    opacity: 0.6,
                    transition: "opacity 0.3s ease-in-out",
                    zIndex: 1,
                  },
                }}
                onClick={(event) => {
                  onGarageSelect(item);
                }}
              >
                <Box>
                  <div className="d-flex justify-content-center">
                    <img src={logo} className="garage-item-logo mt-3" />
                  </div>
                  <div className="d-flex justify-content-center ">
                    <div className="garage-item-name">
                      {item.serviceCenterName}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <div className="garage-item-address">
                      No 89, Colombo,Aturigiya
                    </div>
                  </div>
                </Box>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>

        <ToastContainer />
      </div>
      <div className="d-flex justify-content-center mb-5 footer-text font-poppins bg-white  ">
        2023 Garage Lanka. Ltd. All Rights Reserved.
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth?.user?.user,
});

const mapDispatchToProps = (dispatch) => ({
  // loginUser: (credentials) => dispatch(loginUser(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Garages);
