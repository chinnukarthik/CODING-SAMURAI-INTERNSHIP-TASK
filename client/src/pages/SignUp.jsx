import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 gap-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left section */}
        <div className="flex-1">
          <Link to="/" className=" text-4xl dark:text-white font-bold">
            <span className="px-2 bg-gradient-to-r from-indigo-400 to-pink-500 rounded-lg text-white">
              K Blog
            </span>
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
          </p>
        </div>
        {/* Right section */}
        <div className="flex-1 ">
          <form action="" className="flex flex-col gap-3">
            <div className="">
              <Label for="username">Username</Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
              ></TextInput>
            </div>
            <div className="">
              <Label for="email">Your Email</Label>
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
              ></TextInput>
            </div>
            <div className="">
              <Label for="Password">Enter Password</Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
              ></TextInput>
            </div>
            <Button
              type="submit"
              class=" w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex text-sm mt-2 gap-2">
            <span>Had an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
