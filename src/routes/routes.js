import Dashboard from "../components/app/dashboard";
import Inventory from "../components/app/Inventory/index";
import InventoryItemAdd from "../components/app/Inventory/InventoryItemAdd";
import Inventorytype from "../components/app/Inventory/InventoryType";
import Invoice from "../components/app/invoice/Invoice";
import InvoiceList from "../components/app/invoicelist/InvoiceList";
import Orders from "../components/app/orders";
import Schedular from "../components/app/schedular";
import Garages from "../components/garageSelect";
import NavBar from "../components/global/NavBar";
import MiniDrawer from "../components/global/NewNavBar";
import Login from "../components/login";
import RedirectComponent from "../components/redirect/RedirectComponent";

export const Routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/garages",
    element: <Garages />,
  },
  {
    path: "/app",
    element: <Dashboard />,
  },
  
  {
    path: "/inventory",
    children: [
      {
        path: "/",
        element: <Inventory />,
      },
      {
        path: "/:typeId",
        element: <Inventorytype />,
      },
      {
        path: "/add_item",
        element: <InventoryItemAdd />,
      },
      {
        path: "/edit_item",
        element: <InventoryItemAdd />,
      },
    ],
  },
  {
    path: "/orders",
    element: <Orders/>,
  },
  {
    path: "/schedular",
    element: <Schedular/>,
  },
  {
    path: "/invoice",
    element: <Invoice/>,
  },
  {
    path: "/invoice-list",
    element: <InvoiceList/>,
  },
];
