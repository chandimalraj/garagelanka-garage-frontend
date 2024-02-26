import {React,useState} from 'react'
import { Outlet } from 'react-router-dom';
// import './styles.scss'
import NavBar from '../global/NavBar';
import Topbar from '../global/TopBar'
import MiniDrawer from '../global/NewNavBar';

export default function BaseLayout() {
    const [isSidebar, setIsSidebar] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  //   const handleImageChange = (checked) => {
  //     setImage(checked);
  //   };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      {/* <NavBar
        image={image}
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}asdasds
      /> */}
      <MiniDrawer/>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        {/* <FaBars /> */}
      </div>
      <main className="content">
        <div className="topbar">
          {/* <TopbarNew setIsSidebar={setIsSidebar} /> */}
        </div>
       <Outlet/>
       
      </main>
    </div>
  )
}
