import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MessageIcon from '@mui/icons-material/Message';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';

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
  {
    name: "SMS CAMPAIGN",
    icon: <MessageIcon />,
    link: "/sms-campaign",
  },
  {
    name: "Expenses",
    icon: <AttachMoneyIcon />,
    link: "/expenses",
  },
  {
    name: "Service Type",
    icon: <BuildIcon />,
    link: "/service-types",
  },
];
