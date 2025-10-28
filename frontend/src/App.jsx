import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Privatecomponent from "./components/Privatecomponent.jsx";
import Login from "./components/Login.jsx";
import Addproduct from "./components/Addproduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import MyProducts from "./components/MyProducts.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Home from "./components/Home.jsx";
import Seller from "./components/Seller.jsx";
import Cart from "./components/Cart.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Bill from "./components/Bill.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import AppLayout from "./components/AppLayout.jsx";
import Orders from "./components/Orders.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // parent layout
    children: [
      { index: true, element: <Home/> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "seller", element: <Seller /> },
      { path: "cart", element: <Cart /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "bill", element: <Bill /> },

      // protected routes
      {
        element: <Privatecomponent />,
        children: [
          { path: "add", element: <Addproduct /> },
          { path: "myproducts", element: <MyProducts /> },
          { path: "update/:id", element: <UpdateProduct /> },
          { path: "logout", element: <h1>Logout component</h1> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "orders", element: <Orders/> },


        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="App min-h-screen  bg-slate-100 ">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
