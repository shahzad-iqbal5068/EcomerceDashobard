import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer";
import Signup from "./components/Signup.js";
import Privatecomponent from "./components/Privatecomponent.js";
import Login from "./components/Login.js";
import Addproduct from "./components/Addproduct.js";
import ProductsList from "./components/ProductsList.js";
import UpdateProduct from "./components/UpdateProduct.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          
          <Route element={<Privatecomponent/>}>
            <Route path="/" element={<ProductsList/>} />
            <Route
              path="/add"
              element={<Addproduct />}
            />
            <Route
              path="/update/:id"
              element={<UpdateProduct/>}
            />
            <Route path="/logout" element={<h1>Logout componet</h1>} />
            <Route path="/profile" element={<h1>Profile componet</h1>} />
          </Route>

          <Route path="/signup" element={<Signup />} /> 
          <Route path="/login" element={<Login />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
