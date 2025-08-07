import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Signup from "./components/Signup.jsx";
import Privatecomponent from "./components/Privatecomponent.jsx";
import Login from "./components/Login.jsx";
import Addproduct from "./components/Addproduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import MyProducts from "./components/MyProducts.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Products from "./components/Products.jsx";
import Seller from "./components/Seller.jsx";
import Cart from "./components/Cart.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Bill from "./components/Bill.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
    <ToastContainer position="top-center" autoClose={3000}/>
      <div className="App min-h-screen  bg-slate-100 ">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail/>} />

            <Route element={<Privatecomponent />}>
              <Route path="/add" element={<Addproduct />} />
              <Route path="/MyProducts" element={<MyProducts />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/logout" element={<h1>Logout componet</h1>} />
              <Route path="/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route path="/seller" element={<Seller />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bill" element={<Bill/>} />
          </Routes>
          
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
