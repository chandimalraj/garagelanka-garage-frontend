import React, { lazy, Suspense, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Login from "./components/login/";
import { CssBaseline } from "@mui/material";
import BaseLayout from "./components/pages/BaseLayout";
import MiniDrawer from "./components/global/NewNavBar";
import Dashboard from "./components/app/dashboard";
import { Router } from "./routes/router";
import PermissionWrapper from "./components/permissionWrapper";
import RedirectComponent from "./components/redirect/RedirectComponent";
import { ToastContainer } from "react-toastify";
import { useLoggedUserValidation } from "./utils/helpers/Permission";
import { connect } from "react-redux";
import { loginSuccess } from "./redux/actions/auth/action";
import styled from "styled-components";

function App({ loginSuccess }) {
  const [theme, colorMode] = useMode();
  
  console.log("app js");

  useEffect(() => {
   
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper>
          {/* <BrowserRouter> */}
            <PermissionWrapper component={<MiniDrawer />} />
            {/* <PageWrapper> */}
              <Routes>{Router}</Routes>
            {/* </PageWrapper> */}
            <RedirectComponent />
            <ToastContainer />
          {/* </BrowserRouter> */}
        </Wrapper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth?.user?.user,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (decoded, token) => dispatch(loginSuccess(decoded, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${(props) => (props.sx ? props.sx : "")}
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #e5e4e2;
`;
