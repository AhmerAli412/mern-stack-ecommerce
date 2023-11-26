// Import necessary dependencies
import "./widgetSm.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../../redux/apiCalls";

// WidgetSm component
export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { token, isAdmin } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch users on component mount
    const fetchUsers = async () => {
      try {
        const res = await userRequest.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjFlZTFkZDhkODFjMDRkYzkwNjFlOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDkxNjc2NSwiZXhwIjoxNzAxMTc1OTY1fQ.yKOXXpBZHtG0CCyrq203Z4TIug-b3AinDXkA81B9edU"; // Replace with your actual hardcoded admin token
  
    // Check if the user has a valid token
    if (token) {
      console.log("Deleting user with ID:", id);
      deleteUser(id, dispatch, token);
    } else {
      // Handle the case where the token is not available (e.g., show a message)
      console.error("Token not available.");
    }
  };
  
  

  const handleUpdate = (id, ad) => {
    updateUser(id, ad, dispatch);
  };

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">List Of Users</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.img || "https://i.imgur.com/WGYfga4.gif"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <div>
              <span className="widgetSmUsername">
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </div>
            <div className="z">
              {/* <button
                className="promote"
                onClick={() => handleUpdate(user._id, user.isAdmin)}
              >
                Promote | Demote
              </button> */}
              <button className="ban" onClick={() => handleDelete(user._id)}>
                Delete user
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
