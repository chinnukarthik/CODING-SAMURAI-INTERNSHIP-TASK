import { Avatar, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";


export default function SideProfileDash() {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
    <div className="max-w-lg mx-auto w-full">
      <h1 className="my-7 font-semibold text-3xl text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden"
          onClick={() => fileRef.current.click()}
        >
          <Avatar alt="User" rounded
            className="rounded-full w-full h-full border-8 border-gray-300"
          />
        </div>

        <div className="text-red-700 flex justify-between items-center">
          <span className="cursor-pointer">Delect Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
        <TextInput
          placeholder="username"
          type="text"
          id="username"
          defaultValue={currentUser ? currentUser.username : "UserName"}
        />
        <TextInput
          placeholder="email"
          type="email"
          id="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          placeholder="password"
          type="password"
          id="password"
          defaultValue="password"
        />
        <Button
          type="submit"
          outline
          className="bg-linear-to-t from-sky-500 to-indigo-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
}
