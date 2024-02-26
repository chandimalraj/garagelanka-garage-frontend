import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { showToasts } from "../toast";
import { connect } from "react-redux";
import { logOutUser } from "../../redux/actions/auth/action";
import logo from "../../assets/images/logo3.png";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import { Menu } from "../../utils/constants/sideBarItems";
import { ExpandMore } from "@mui/icons-material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Tooltip from "@mui/material/Tooltip";
import MenuBlock from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#fefefe",
  // background:
  //   "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(163,167,171,1) 100%)",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  // background:
  //   "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(163,167,171,1) 100%)",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#fefefe",
  // background:
  //   "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(163,167,171,1) 100%)",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function MiniDrawer(props) {
  const { logOutUser } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [openDlg, setOpenDlg] = useState(false);
  const [msg, setMsg] = useState("Are you sure you want to logout");
  const [openLogOut, setOpenLogOut] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogClose = () => {
    setOpenDlg(false);
  };

  const handleLogoutAction = () => {
    setOpenDlg(true);
    setOpenLogOut(true)
  };

  const handleClose = ()=>{
    setOpenLogOut(false)
  }
  const handleOpen = ()=>{
    setOpenLogOut(true)
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem("jwtToken");
      logOutUser();
      navigate("/");
      showToasts("SUCCESS", "Log Out successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "#e5e4e2",
              backgroundColor: "#2b2a2a",
              "&:hover": {
                backgroundColor: "black", // Change this value to your desired hover background color
              },
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontSize={20}
            sx={{ color: "black", fontWeight: "600", marginRight: "15px" }}
          >
            Garage Application
          </Typography>
          <Tooltip title="Settings">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              sx={{
                color: "#e5e4e2",
                backgroundColor: "#2b2a2a",
                "&:hover": {
                  backgroundColor: "black", // Change this value to your desired hover background color
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <div style={{ flexGrow: 1 }} />

          {/* <Tooltip title="Log Out"> */}
            <IconButton
              onClick={handleOpen}
              sx={{
                minWidth: 10,
                justifyContent: "center",
                color: "#e5e4e2",
                backgroundColor: "#2b2a2a",
                "&:hover": {
                  backgroundColor: "black", // Change this value to your desired hover background color
                },
              }}
            >
              <PersonRoundedIcon fontSize="medium" />
            </IconButton>
            <MenuBlock
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={true}
            open={openLogOut}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ marginTop:"50px" }}

          >
            
            <MenuItem onClick={handleLogoutAction}>Logout</MenuItem>
          </MenuBlock>
          {/* </Tooltip> */}
          
          
        </Toolbar>
        
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img src={logo} className="w-50 me-4" />
          <IconButton
            color="inherit"
            sx={{
              color: "whitesmoke",
              border: "1px solid #757575",
              color: "#e5e4e2",
              backgroundColor: "#2b2a2a",
              "&:hover": {
                backgroundColor: "black", // Change this value to your desired hover background color
              },
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <KeyboardDoubleArrowLeftIcon fontSize="large" />
            ) : (
              <KeyboardDoubleArrowLeftIcon color="danger" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ backgroundColor: "transparent" }}>
          {Menu.map((item, index) => {
            if (item.children) {
              return (
                <Accordion
                  sx={{
                    backgroundColor: "transparent",
                    padding: 0,
                  }}
                  disableGutters={true} //
                >
                  <AccordionSummary
                    sx={{
                      padding: 0,
                      marginTop: -1.5,
                      marginBottom: -1.5,
                    }}
                    disableGutters={true}
                    className="mt-n1"
                  >
                    <ListItem
                      key={item.text}
                      disablePadding
                      selected={selected == item.text}
                      onClick={() => {
                        setSelected(item.text);
                      }}
                      sx={{
                        display: "block",
                        backgroundColor: "transparent",
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          color: "#e5e4e2",
                        }}
                      >
                        <IconButton
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : -1,
                            justifyContent: "center",
                            color: "#e5e4e2",
                            backgroundColor: "#2b2a2a",
                            transition: "",
                            "&:hover": {
                              backgroundColor: "black", // Change this value to your desired hover background color
                            },
                          }}
                        >
                          {item.icon}
                        </IconButton>
                        <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                          <Typography
                            fontFamily={"Poppins"}
                            variant="body1"
                            sx={{
                              fontSize: 14,
                              marginLeft: 1,
                              textTransform: "uppercase",
                              color: "#121212",
                            }}
                          >
                            {open ? item.name : null}
                          </Typography>
                        </ListItemText>
                        {open ? <ExpandMore /> : null}
                      </ListItemButton>
                    </ListItem>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: "transparent",
                      padding: 0,
                    }}
                    disableGutters={true}
                  >
                    {item.children.map((item) => (
                      <Link to={item.link} style={{ textDecoration: "none" }}>
                        {" "}
                        <ListItem
                          key={item.text}
                          disablePadding
                          selected={location.pathname == item.link}
                          onClick={() => {
                            setSelected(item.text);
                          }}
                          sx={{
                            display: "block",
                            "&.Mui-selected": {
                              backgroundColor: "#b9b9b9",
                            },
                          }}
                        >
                          <ListItemButton
                            sx={{
                              height: 48,
                              justifyContent: open ? "initial" : "center",
                              px: 2.5,
                            }}
                          >
                            <IconButton
                              sx={{
                                minWidth: 0,
                                mr: open ? 1 : "auto",
                                justifyContent: "center",
                                color: "#e5e4e2",
                                backgroundColor: "#2b2a2a",
                                "&:hover": {
                                  backgroundColor: "black", // Change this value to your desired hover background color
                                },
                              }}
                            >
                              {item.icon}
                            </IconButton>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                              <Typography
                                fontFamily={"Poppins"}
                                variant="body1"
                                sx={{
                                  fontSize: 14,
                                  marginLeft: 3,
                                  textTransform: "uppercase",
                                  color:
                                    location.pathname == item.link
                                      ? "#FFFFFF"
                                      : "#121212",
                                }}
                              >
                                {item.name}
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            } else {
              return (
                <Link to={item.link} style={{ textDecoration: "none" }}>
                  <ListItem
                    key={item.text}
                    disablePadding
                    selected={location.pathname == item.link}
                    onClick={() => {
                      setSelected(item.link);
                      console.log(selected);
                    }}
                    sx={{
                      display: "block",
                      "&.Mui-selected": {
                        backgroundColor: "#b9b9b9",
                      },
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: "#e5e4e2",
                      }}
                    >
                      <IconButton
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: "#e5e4e2",
                          backgroundColor: "#2b2a2a",
                          "&:hover": {
                            backgroundColor: "black", // Change this value to your desired hover background color
                          },
                        }}
                      >
                        {item.icon}
                      </IconButton>
                      <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                        <Typography
                          fontFamily={"Poppins"}
                          variant="body1"
                          sx={{
                            fontSize: 14,
                            marginLeft: 1,
                            textTransform: "uppercase",
                            color:
                              location.pathname == item.link
                                ? "#FFFFFF"
                                : "#121212",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            }
          })}
        </List>
      </Drawer>
      <ConfirmationDialog
        confirmMsg={msg}
        open={openDlg}
        setConfirmDialog={setOpenDlg}
        ConfirmAction={handleLogout}
        handleClose={handleDialogClose}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniDrawer);
