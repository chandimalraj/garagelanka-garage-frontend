import { useState } from "react";

import { useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { tokens } from "../../theme";
// import useAuth from "../../../Application/fndbas/hooks/useAuth";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaArchway,
  FaRegLaughWink,
  FaHeart,
  FaDatabase,
  FaUnity,
  FaRegBuilding,
  FaLaptopHouse,
  FaUserAlt,
  FaBuilding,
  FaUserFriends,
  FaCogs,
  FaUsersCog,
  FaUsers,
  FaCloudsmith,
  FaWalking,
  FaBook,
  FaPersonBooth,
  FaBoxTissue,
  FaBuffer,
  FaFileInvoiceDollar,
  FaFileInvoice,
  FaLocationArrow,
  FaObjectGroup,
  FaWarehouse,
} from "react-icons/fa";

import { AutoAwesome, ViewAgenda } from "@mui/icons-material";
// import AuthRouteNav from "./AuthRouteNav";

const NavBar = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  //   const { auth } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
        style={{
          zIndex: "387456378853",
          // background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%,rgb(10,5,15,0.8) 100%)',
          backgroundColor: "black",
          height: "100vh",
        }}
        // rootStyles={{
        //   [`.${sidebarClasses.container}`]: {
        //     backgroundColor: 'red',
        //   },
        // }}
      >
        {/* Header */}
        {/* <SidebarHeader> */}
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
              className="sidebar-menu-item"
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: "9px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: "1px",
                }}
              >
                {/* {auth.username} */}username
              </div>
            </MenuItem>
          )}
        </Menu>
        {/* </SidebarHeader> */}
        {/* Content */}
        {/* <SidebarContent> */}
        <Menu
          iconShape="circle"
          style={{
            textTransform: "uppercase",
            fontSize: 6,
            letterSpacing: "1px",
          }}
        >
          <MenuItem
            style={{ fontSize: 14 }}
            icon={<FaTachometerAlt />}
            menuItemStyles={{
              button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            Dashboard
            <NavLink to="/" />
          </MenuItem>
          <SubMenu
            style={{ fontSize: 14 }}
            label={"Basic Data"}
            icon={<FaDatabase />}
          >
            <MenuItem icon={<FaUnity />}>
              Units <Link to="/units" />
            </MenuItem>
          </SubMenu>

          {/* <AuthRouteNav
              component={
                <SubMenu title={"Accounting Rules"} icon={<FaArchway />}>
                  <MenuItem icon={<FaLaptopHouse />}>
                    Payment Terms <Link to="/paymentterms" />
                  </MenuItem>
                </SubMenu>
              }
              allowedRoles={["MANAGER"]}
            /> */}

          <SubMenu title={"Enterprise"} icon={<FaArchway />}>
            {/* <AuthRouteNav
                component={
                  <MenuItem icon={<FaLaptopHouse />}>
                    Association <Link to="/association/null" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SDO", "ADMIN"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaLaptopHouse />}>
                    Associations <Link to="/associations" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SDO", "ADMIN"]}
              /> */}
            <MenuItem icon={<FaRegBuilding />}>
              company <Link to="/company/null" />
            </MenuItem>
            <MenuItem icon={<FaRegBuilding />}>
              companies <Link to="/companies" />
            </MenuItem>
            <MenuItem icon={<FaRegBuilding />}>
              Site <Link to="/site/null" />
            </MenuItem>
            <MenuItem icon={<FaRegBuilding />}>
              Sites <Link to="/sites" />
            </MenuItem>
            <MenuItem icon={<FaRegBuilding />}>
              Customer <Link to="/customer/null" />
            </MenuItem>
            <MenuItem icon={<FaRegBuilding />}>
              Customers <Link to="/customers" />
            </MenuItem>
            <MenuItem icon={<FaRegBuilding />}>
              Supplier <Link to="/supplier/null" />
            </MenuItem>
            <MenuItem icon={<FaRegBuilding />}>
              Suppliers <Link to="/suppliers" />
            </MenuItem>
          </SubMenu>
          {/* Order  */}
          <SubMenu title={"Order"} icon={<FaRegLaughWink />}>
            <MenuItem icon={<FaBoxTissue />}>
              Sales Rep Order <Link to="/salesreporder/null" />
            </MenuItem>
            <MenuItem icon={<FaBoxTissue />}>
              Sales Rep Orders <Link to="/salesreporders" />
            </MenuItem>
            <MenuItem icon={<FaBuffer />}>
              Issue Note <Link to="/issuenote/null" />
            </MenuItem>
            <MenuItem icon={<FaBuffer />}>
              Issue Notes <Link to="/issuenotes" />
            </MenuItem>
          </SubMenu>

          {/* Fixed Asset */}
          <SubMenu title={"Fixed Asset"} icon={<FaWarehouse />}>
            <MenuItem icon={<FaObjectGroup />}>
              Fixed Asset <Link to="/fixed_asset/null" />
            </MenuItem>
            <MenuItem icon={<FaObjectGroup />}>
              Fixed Assets <Link to="/fixedassets" />
            </MenuItem>
            <MenuItem icon={<FaObjectGroup />}>
              Asset Group <Link to="/asset_groups" />
            </MenuItem>
            <MenuItem icon={<FaLocationArrow />}>
              Asset Location <Link to="/asset_locations" />
            </MenuItem>
          </SubMenu>

          {/* Inventory  */}
          <SubMenu title={"Inventory"} icon={<ViewAgenda />}>
            <MenuItem icon={<AutoAwesome />}>
              Inventory Item <Link to="/inventory_item" />
            </MenuItem>
            <MenuItem icon={<AutoAwesome />}>
              Inventory Items <Link to="/inventory_items" />
            </MenuItem>
            <MenuItem icon={<FaBook />}>
              Item Catalog <Link to="/itemcatalog/null" />
            </MenuItem>
            <MenuItem icon={<FaBook />}>
              Catalog Items
              <Link to="/catalogitems" />
            </MenuItem>
            {/* <AuthRouteNav
                component={
                  <MenuItem icon={<FaLaptopHouse />}>
                    Return Note <Link to="/return_note/null" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SDO", "ADMIN"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaLaptopHouse />}>
                    Return Notes <Link to="/return_notes" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SDO", "ADMIN"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaCloudsmith />}>
                    Exchange Note <Link to="/exchange_note/null" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SDO", "ADMIN"]}
              /> */}
          </SubMenu>

          {/* HR */}
          <SubMenu title={"HR"} icon={<FaBuilding />}>
            <MenuItem icon={<FaUserAlt />}>
              Person <Link to="/person/null" />
            </MenuItem>
            <MenuItem icon={<FaUserFriends />}>
              Persons <Link to="/personList" />
            </MenuItem>
            <MenuItem icon={<FaCloudsmith />}>
              Responsibilities <Link to="/job_responsibilities" />
            </MenuItem>
            <MenuItem icon={<FaWalking />}>
              Job <Link to="/job/null" />
            </MenuItem>
            <MenuItem icon={<FaWalking />}>
              Jobs <Link to="/jobs" />
            </MenuItem>
            <MenuItem icon={<FaPersonBooth />}>
              Employees <Link to="/employees" />
            </MenuItem>
          </SubMenu>

          {/* PURCHASE */}
          <SubMenu title={"Purchase"} icon={<FaBuilding />}>
            <MenuItem icon={<FaUserAlt />}>
              GRN <Link to="/grn/null" />
            </MenuItem>
            <MenuItem icon={<FaUserFriends />}>
              GRNs <Link to="/grns" />
            </MenuItem>
          </SubMenu>

          {/* PAYLED  */}
          <SubMenu title={"Payment"} icon={<FaCogs />}>
            <MenuItem icon={<FaUser />}>
              Payment Method <Link to="/payment_method" />
            </MenuItem>
            <MenuItem icon={<FaUser />}>
              Cust. Payment <Link to="/cust_payment/null" />
            </MenuItem>
            <MenuItem icon={<FaUser />}>
              Cust. Payments <Link to="/cust_payments" />
            </MenuItem>
          </SubMenu>

          {/* INVOICE  */}
          <SubMenu title={"Invoice"} icon={<FaFileInvoice />}>
            {/* <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Cust. Invoice <Link to="/cust_invoice/null" />
                  </MenuItem>
                }
                allowedRoles={["SALE_REP"]}
              /> */}
            <MenuItem icon={<FaFileInvoiceDollar />}>
              Cust. Invoice Type <Link to="/invoice_type" />
            </MenuItem>
            <MenuItem icon={<FaFileInvoiceDollar />}>
              Tax Code <Link to="/tax_code" />
            </MenuItem>

            {/* <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Cust. Invoice Type <Link to="/invoice_type" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER"]}
              />
               <AuthRouteNav
                component={

              <MenuItem icon={<FaFileInvoiceDollar />}>
                Tax Code <Link to="/tax_code" />
              </MenuItem>
              }
              allowedRoles={["MANAGER"]}
            /> */}

            {/* <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Instant Invoice <Link to="/instant_inv/null" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Instant Invoices <Link to="/instant_invs" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Correction Invoice <Link to="/correction_invoice/null" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    SDO Invoice <Link to="/sdo_invoice/null" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SDO"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    SDO Invoices <Link to="/sdo_invoices" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SDO"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Rep Balance <Link to="/rep_inv_ledger" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SDO"]}
              />

              <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Agent Invoice <Link to="/agent_invoice/null" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Agent Invoices <Link to="/agent_invoices" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Cust. Invoices <Link to="/cust_invoices" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SALE_REP"]}
              />
              <AuthRouteNav
                component={
                  <MenuItem icon={<FaFileInvoiceDollar />}>
                    Invoiced Return <Link to="/invoiced_return/null" />
                  </MenuItem>
                }
                allowedRoles={["MANAGER", "SDO"]}
              /> */}
          </SubMenu>

          {/* Distribution */}
          <SubMenu title={"Distribution"} icon={<FaBuilding />}>
            <MenuItem icon={<FaUserAlt />}>
              Rep Ledger <Link to="/rep_ledger" />
            </MenuItem>
          </SubMenu>

          {/* Solution Mgt */}
          <SubMenu title={"Solution Mgt"} icon={<FaCogs />}>
            <MenuItem icon={<FaUser />}>
              User <Link to="/user/null" />
            </MenuItem>
            <MenuItem icon={<FaUsers />}>
              Users <Link to="/users" />
            </MenuItem>
            <MenuItem icon={<FaUsersCog />}>
              User Roles <Link to="/user_roles" />
            </MenuItem>
          </SubMenu>

          {/* <SubMenu title={"Multi Level"} icon={<FaList />}>
              <MenuItem>Submenu 1 </MenuItem>
              <MenuItem>Submenu 2 </MenuItem>
              <SubMenu title={"Submenu 3"}>
                <MenuItem>Submenu 3.1 </MenuItem>
                <MenuItem>Submenu 3.2 </MenuItem>
              </SubMenu>
            </SubMenu> */}
          {/* <SubMenu title={"Multi Level"} icon={<FaList />}>
              <MenuItem>Submenu 1 </MenuItem>
              <MenuItem>Submenu 2 </MenuItem>
              <SubMenu title={"Submenu 3"}>
                <MenuItem>Submenu 3.1 </MenuItem>
                <MenuItem>Submenu 3.2 </MenuItem>
              </SubMenu>
            </SubMenu> */}
        </Menu>
        {/* </SidebarContent> */}
        {/* Footer */}
        {/* <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{ padding: "16px", height: "330px" }}
          >
            <Link
              className="sidebar-btn"
              style={{ cursor: "pointer" }}
              to="/profile"
            >
              <FaUser />
              <span>My Account</span>
            </Link>
          </div>
        </SidebarFooter> */}
      </Sidebar>
    </>
  );
};

export default NavBar;
