import { loginFailure, loginStart, loginSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, getUserFailure, getUserStart, getUserSuccess, updateUserSuccess, updateUserFailure, updateUserStart } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductSuccess8,
  addProductFailure,
  addProductStart,
  addProductSuccess
} from "./productRedux";
import {
  getOrderStart, getOrderSuccess, getOrderFailure, updateOrderStart, updateOrderSuccess, updateOrderFailure
} from "./orderRedux"
import {getMailStart, getMailSuccess, getMailFailure} from "./newsletterRedux"


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};


export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const getMails = async (dispatch) => {
  dispatch(getMailStart());
  try {
    const res = await publicRequest.get("/mails");
    dispatch(getMailSuccess(res.data));
  } catch (err) {
    dispatch(getMailFailure());
  }
};



export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data)); 
  } catch (err) {
    dispatch(getUserFailure());
  }
};

// In your apiCalls.js file or wherever you have your API calls:

export const deleteUser = async (id, dispatch, token) => {
  dispatch(deleteUserStart());
  try {
    // Include the Authorization header with the token
    const res = await userRequest.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteUserSuccess(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};


export const updateUser = async (id, ad, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, {_id: id, isAdmin: ad});
    dispatch(updateProductSuccess8(id, ad));
    window.location.reload(false)
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const updateOrder = async (id, stt, dispatch) => {
  dispatch(updateOrderStart());
  try {           
    let sttx = "Pending"
    if (stt === "Pending") {
      sttx = "Delivered" 
    } else { sttx = "Pending" }
    const res = await userRequest.put(`/orders/${id}`, {_id: id, status: sttx});
    dispatch(updateOrderSuccess(id, sttx));
    window.location.reload(false)
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};




export const getUser = async (id, dispatch) => {
  let usern
  try {
    const res = await userRequest.get(`/users/find/${id}`);
    usern = await res.data.username
  } catch (err) {
  }
  return usern
};


export const deleteProduct = async (id, dispatch, token) => {
  dispatch(deleteProductStart());
  try {
    // Include the Authorization header with the token
    const res = await userRequest.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteProductSuccess(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch, token) => {
  dispatch(updateProductStart());

  // Log the payload before making the API call
  console.log('Update Product Payload:', { id, product, token });

  try {
    // Instead of sending the entire product object, create an object with only the fields you want to update
    const updatedFields = {
      title: product.title, // Add other fields as needed
      // Add other fields as needed
    };

    const res = await userRequest.put(`/products/${id}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming the response contains the updated product data
    const updatedProduct = res.data;

    if (updatedProduct) {
      // Instead of dispatching the updated product directly, call the updateProductSuccess action
      dispatch(updateProductSuccess(updatedProduct));
      window.location.reload(false);
    } else {
      // Handle the case where the response data is not as expected
      dispatch(updateProductFailure());
      console.error("Invalid response format for update product");
    }
  } catch (err) {
    dispatch(updateProductFailure());
    console.error(err);
  }
};







export const updatePrd = async (dispatch, id, name, desc, price, category, color, size, status, token) => {
  dispatch(updateProductStart())
  try {
    let stt = false;
    if (status.inStock === "true") {
      stt = true;
    } else {
      stt = false;
    }
    const res = await userRequest.put(`/products/${id}`, {
      _id: id,
      name: name,
      desc: desc,
      price: price,
      category: category,
      color: color,
      size: size,
      inStock: stt,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(updateProductSuccess(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(updateProductFailure());
  }
};


export const addProduct = async (product, dispatch, token) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("/products", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
