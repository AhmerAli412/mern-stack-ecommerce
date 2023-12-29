// import Cart from "./pages/Cart";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Product from "./pages/Product";
// import ProductList from "./pages/ProductList";
// import Register from "./pages/Register";
// import './index.css'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
// // import Success from "./pages/Success";
// import Success from "./components/Success";
// import { useSelector } from "react-redux";

// const App = () => {
//   const user = useSelector((state) => state.user.currentUser);
//   return (

//     <Router>
//       <Switch>
//         <Route exact path="/">
//           <Home />
//         </Route>
        
//         <Route path="/products">
//           <ProductList />
//         </Route>
//         <Route path="/products/:category">
//           <ProductList />
//         </Route>
//         <Route path="/product/:id">
//           <Product />
//         </Route>
//         <Route path="/cart">
//           <Cart />
//         </Route>
//         <Route path="/success">
//          <Success/>
//         </Route>
//         <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
//         <Route path="/register">{user ? <Redirect to="/" /> : <Register/>}</Route>
      
//       </Switch>
//     </Router>
//   );
// };

// export default App;



import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist"
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./components/Success";
import { useSelector } from "react-redux";
import OrderTracking from "./pages/OrderTracking";
// import UserOrders from "./components/UserOrders";
import UserOrders from "./components/UserOrders";
import UserProfile from "./components/UserProfile";
const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  const userId = '6554fcb76527e5b63afc07c8';
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/order">
        <UserOrders userId={userId} />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <PrivateRoute path="/products">
          <ProductList />
        </PrivateRoute>
        <PrivateRoute path="/products/:category">
          <ProductList />
        </PrivateRoute>
        <PrivateRoute path="/product/:id">
          <Product />
        </PrivateRoute>
        <PrivateRoute path="/wishlist">
          <Wishlist/>
        </PrivateRoute>
        <PrivateRoute path="/cart">
          <Cart />
        </PrivateRoute>
        <PrivateRoute path="/order/:id">
          <OrderTracking/>
        </PrivateRoute>
        <PrivateRoute path="/success">
          <Success />
        </PrivateRoute>
        <PrivateRoute path="/userprofile">
         <UserProfile/>
        </PrivateRoute>
      </Switch>
   
    </Router>
  );
};

export default App;

