import {
  Avatar,
  Button,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
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
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
      >
        <span className="px-2 bg-gradient-to-r from-indigo-400 to-pink-500 rounded-lg text-white">
          K Blog
        </span>
      </Link>
      <form action="">
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button
        className="  lg:hidden text-gray-400"
        color="alternative"
        pill="true"
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2" pill="true">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User" className="" rounded />}
          >
            <DropdownHeader>
              <span className="block text-sm">{currentUser.name}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser.email}
              </span>
            </DropdownHeader>

            <DropdownItem>
              <Link to="/dashboard?tab=profile">Profile</Link>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-up">
            <Button outline className="">
              Sign Up
            </Button>
          </Link>
        )}

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active={path === "/"} as="div">
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink active={path === "/about"} as="div">
          <Link to="/about">About</Link>
        </NavbarLink>
        <NavbarLink active={path === "/projects"} as="div">
          <Link to="/projects">Projects</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
