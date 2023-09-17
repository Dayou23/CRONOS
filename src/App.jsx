import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProductList from "./Pages/ProductList";

import Product from "./Pages/Product";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Success from "./Pages/Success";
import { useSelector } from "react-redux";
import ContactUs from "./Pages/ContactUs";
import AbutUs from "./Pages/AbutUs";
import PageNotFound from "./Pages/PageNotFound";
import VerifyEmail from "./Pages/VerifyEmail";
import MyAccount from "./Pages/MyAccount";
import Orders from "./Pages/Orders";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:categoey" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/" element={<ProductList />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/abutus" element={<AbutUs />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />

        <Route path="*" element={<PageNotFound />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/login"
          element={user ? <Navigate replace to="/home" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate replace to="/home" /> : <Register />}
        />
        <Route
          path="/myAccount"
          element={user ? <MyAccount /> : <Navigate replace to="/home" />}
        />

        <Route
          path="/orders"
          element={user ? <Orders /> : <Navigate replace to="/home" />}
        />
        {/* <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate replace to="/login" />}
        /> */}
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
