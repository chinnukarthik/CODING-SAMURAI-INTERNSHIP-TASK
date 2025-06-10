import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

function Header() {
  const path = useLocation().pathname;
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
        <Button color="alternative" className="hidden sm:inline">
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button outline className="">
            Sign In
          </Button>
        </Link>
      </div>
      <NavbarToggle />
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
