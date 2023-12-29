

// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     currentUser: null,
//     isFetching: false,
//     error: false,
//   },
//   reducers: {
//     loginStart: (state) => {
//       state.isFetching = true;
//     },
//     loginSuccess: (state, action) => {
//       state.isFetching = false;
//       state.currentUser = action.payload;
//       state.error = false;
//     },
//     loginFailure: (state) => {
//       state.isFetching = false;
//       state.error = true;
//     },
//     logout: (state) => {
//       state.currentUser = null;
//       state.isFetching = false;
//       state.error = false;
//     },
//     registerStart: (state) => {
//       state.isFetching = true;
//     },
//     registerSuccess: (state, action) => {
//       state.isFetching = false;
//       state.currentUser = action.payload;
//       state.error = false;
//     },
//     registerFailure: (state) => {
//       state.isFetching = false;
//       state.error = true;
//     },
//   },
// });

// export const {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
//   registerStart,
//   registerSuccess,
//   registerFailure,
// } = userSlice.actions;
// export default userSlice.reducer;




// userRedux.js

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateProfileStart: (state) => {
      state.isFetching = true;
    },
    updateProfileSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    updateProfileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteAccountStart: (state) => {
      state.isFetching = true;
    },
    deleteAccountSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    deleteAccountFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
} = userSlice.actions;
export default userSlice.reducer;
