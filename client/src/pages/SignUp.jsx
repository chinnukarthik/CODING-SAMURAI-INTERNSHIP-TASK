import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Input in form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // Handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setError("Please fill the fileds");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setError(data.message);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

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
          <form
            action=""
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <div className="">
              <Label>Username</Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div className="">
              <Label>Your Email</Label>
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div className="">
              <Label>Enter Password</Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className=" w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex text-sm mt-2 gap-2">
            <span>Had an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
