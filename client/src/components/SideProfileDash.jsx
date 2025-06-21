import {
  Alert,
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function SideProfileDash() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateuserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No Changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated Successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserError(err.message);
    }
  };
  const handleDeleteAccount = async (e) => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
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
    <div className="max-w-lg mx-auto w-[90%]">
      <h1 className="my-7 font-semibold text-3xl text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden"
          onClick={() => fileRef.current.click()}
        >
          <Avatar
            alt="User"
            rounded
            className="rounded-full w-full h-full border-8 border-gray-300"
          />
        </div>

        <TextInput
          placeholder="username"
          type="text"
          id="username"
          defaultValue={currentUser ? currentUser.username : "UserName"}
          onChange={handleChange}
        />
        <TextInput
          placeholder="email"
          type="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          placeholder="password"
          type="password"
          id="password"
          defaultValue=""
          onChange={handleChange}
        />
        <Button
          type="submit"
          outline
          className="bg-linear-to-t from-sky-500 to-indigo-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded"
        >
          Update Profile
        </Button>
      </form>
      <div className="text-red-700 flex justify-between items-center mt-4">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delect Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateuserError && (
        <Alert color="failure" className="mt-5">
          {updateuserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 mx-auto text-gray-400 dark:text-gray-200 mb-4" />
            <h3 className="mb-4 text-gray-700 dark:text-gray-300 text-lg font-semibold">
              Are you sure you want to delete your Account?
            </h3>
          </div>
          <div className="flex justify-center gap-5">
            <Button color="red" onClick={handleDeleteAccount}>
              Yes,Delete
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              No,Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
