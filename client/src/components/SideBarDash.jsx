import {
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarItemGroup,
} from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice.js";

export default function SideBarDash() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("");
    }
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            active={tab === "profile"}
            icon={HiUser}
            className="cursor-pointer"
            onClick={() => navigate("/dashboard?tab=profile")}
            label="User"
            labelColor="dark"
          >
            Profile
          </SidebarItem>
          <SidebarItem
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
