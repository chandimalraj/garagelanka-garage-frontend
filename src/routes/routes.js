import CustomersList from "../components/app/customers";
import CustomerForm from "../components/app/customers/customerForm/CustomerForm";
import Dashboard from "../components/app/dashboard";
import EmployeeList from "../components/app/employees";
import EmployeeForm from "../components/app/employees/employeeForm/EmployeeForm";
import Inventory from "../components/app/Inventory/index";
import InventoryItemAdd from "../components/app/Inventory/InventoryItemAdd";
import Inventorytype from "../components/app/Inventory/InventoryType";
import Invoice from "../components/app/invoice/Invoice";
import InvoicePdf from "../components/app/invoice/InvoicePDF/InvoicePdf";
import InvoiceList from "../components/app/invoicelist/InvoiceList";
import Orders from "../components/app/orders";
import Schedular from "../components/app/schedular";
import Garages from "../components/garageSelect";
import Login from "../components/login";

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
    children: [
      {
        path: "/",
        element: <Invoice/>,
      },
      {
        path: "/invoice-pdf",
        element: <InvoicePdf />,
      },
      
    ],
  },
  {
    path: "/invoice-list",
    element: <InvoiceList/>,
  },
  {
    path: "/employees",
    children: [
      {
        path: "/",
        element: <EmployeeList/>,
      },
      {
        path: "/add-employee",
        element: <EmployeeForm/>,
      },
      {
        path: "/edit-employee",
        element: <EmployeeForm/>,
      },
      {
        path: "/view-employee",
        element: <EmployeeForm/>,
      },
      
      
    ],
  },
  {
    path: "/customers",
    children: [
      {
        path: "/",
        element: <CustomersList/>,
      },
      {
        path: "/add-customer",
        element: <CustomerForm/>,
      },
      
      
    ],
  },
];
