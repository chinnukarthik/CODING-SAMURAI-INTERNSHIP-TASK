import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarDash from "../components/SideBarDash";
import SideProfileDash from "../components/SideProfileDash";

function Dashboard() {
  const location = useLocation();
  const [tab,setTab]=useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (<div className="min-h-screen flex flex-col md:flex-row">
    {/* Side Bar  */}
    <div className="md:w-56"><SideBarDash/></div> 
      {/* Profile  */}
      {tab=="profile" && <SideProfileDash/>}
  </div>);
}

export default Dashboard;
