// import { loginFailure, loginStart, loginSuccess } from "./userRedux";
// import { publicRequest } from "../requestMethods";

// export const login = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await publicRequest.post("/auth/login", user);
//     dispatch(loginSuccess(res.data));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };

//ok

// import { loginFailure, loginStart, loginSuccess } from "./userRedux";
// import { publicRequest } from "../requestMethods";

// export const login = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await publicRequest.post("/auth/login", user);
//     dispatch(loginSuccess(res.data));
//   } catch (err) {
//     const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
//     dispatch(loginFailure(errorMessage));
//   }
// };





// apiCalls.js

import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data; // Return the data for further use
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
    dispatch(loginFailure(errorMessage));
    throw err; // Re-throw the error for the calling function to handle
  }
};
