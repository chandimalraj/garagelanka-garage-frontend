import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export const Menu = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    name: "Inventory",
    icon: <InventoryIcon />,
    link: "/inventory",
  },
  {
    name: "Orders",
    icon: <LocalShippingIcon />,
    link: "/orders",
  },
  {
    name: "Schedular",
    icon: <ManageHistoryIcon />,
    link: "/schedular",
  },
  {
    name: "Invoice",
    icon: <ReceiptIcon />,
    link: "/invoice",
  },
  {
    name: "Invoice List",
    icon: <ListAltIcon />,
    link: "/invoice-list",
  },
  {
    name: "Employees",
    icon: <GroupsIcon />,
    link: "/employees",
  },
  {
    name: "Customers",
    icon: <DirectionsCarIcon />,
    link: "/customers",
  },
];
