import { Sidebar, SidebarItem, SidebarItems, SidebarItemGroup } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideBarDash() {
  const location = useLocation();
  const navigate = useNavigate();
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
            icon={HiArrowSmRight }
            className="cursor-pointer"
            onClick={() => {
              console.log("Signing out...");
            }}
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
