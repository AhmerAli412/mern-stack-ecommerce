// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import Announcement from "./Announcement";
// import Navbar from "./Navbar";

// const UserProfile = () => {
//   const [newUsername, setNewUsername] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const user = useSelector((state) => state.user.currentUser);

//   console.log(user._id)
//   const handleUpdate = async () => {
//     // const userId = "6554fcb76527e5b63afc07c8"; // Replace with the actual user ID

//     try {
//       const response = await axios.put(`http://localhost:4000/api/users/update/${user._id}`, {
//         username: newUsername,
//         password: newPassword,
//       });

//       const updatedUser = response.data;
//       console.log("User profile updated:", updatedUser);

//       // Add any additional logic or state updates as needed
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       // Handle error and update state or show a notification
//     }
//   };

//   return (
//     <>
//     <Announcement/>
//     <Navbar/>
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">User Profile</h2>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">New Username:</label>
//         <input
//           type="text"
//           value={newUsername}
//           onChange={(e) => setNewUsername(e.target.value)}
//           className="mt-1 p-2 w-full border rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">New Password:</label>
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="mt-1 p-2 w-full border rounded-md"
//         />
//       </div>
//       <button
//         onClick={handleUpdate}
//         className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//       >
//         Update Profile
//       </button>
//     </div>
//     </>
//   );
// };

// export default UserProfile;















// UserProfile.js
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userRedux";
import Announcement from "./Announcement";
import Navbar from "./Navbar";

const UserProfile = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/users/update/${user._id}`, {
        username: newUsername,
        password: newPassword,
      });

      const updatedUser = response.data;

      // Dispatch the updateUser action with the updated user
      dispatch(updateUser(updatedUser));

      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error and update state or show a notification
    }
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">New Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Update Profile
        </button>
      </div>
    </>
  );
};

export default UserProfile;
