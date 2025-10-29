import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFetchApi from "../customHook/useFetchApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Bill = () => {
  const selectedProduct = useSelector((state) => state.cart.selectedProduct);

  const grandTotal = selectedProduct.reduce(
    (acum, current) => acum + current.price * current.quantity,
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
    address: "",
    notes: "",
  });

  const navigate = useNavigate();
  const fetchApi = useFetchApi();
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("userid"));
  const apiUser = import.meta.env.VITE_API_URL;
  // handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // place order
  const addOrder = async () => {
    if (!token) {
      navigate("/login"); 
      return;
    }

    const orderData = {
      userId,
      address: formData.address,
      totalAmount: grandTotal,
      products: selectedProduct.map((p) => ({
        productId: p._id,
        quantity: p.quantity,
      })),
      notes: formData.notes,
    };

    console.log("Sending order data:", orderData);

    const response = await fetchApi({
      url: `${apiUser}orders`,
      method: "POST",
      body: orderData,
      token,
    });

    if (!response.error) {
      toast.success("Order placed successfully!");
      navigate("/orders"); // redirect to orders page
    } else {
      toast.error("Failed to place order!");
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl text-slate-600 font-bold m-6">
        Checkout
      </h1>
      <div className="flex flex-col items-center md:mx-40">
        <h2 className="text-2xl text-slate-400 m-3">Billing Details</h2>
        <hr className="w-[80%] m-4" />

        <form className="w-[80%] text-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <span className="flex flex-col text-lg">
              <label htmlFor="name">Name</label>
              <input
                className="p-2 border-2 border-blue-400 w-full rounded-lg m-3"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
              <label htmlFor="phone">Phone</label>
              <input
                className="p-2 border-2 border-blue-400 w-full rounded-lg m-3"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="xxx-xxxxxxx"
              />
            </span>

            <span className="flex flex-col">
              <label htmlFor="city">City</label>
              <input
                className="p-2 border-2 border-blue-400 w-full rounded-lg m-3"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
              <label htmlFor="email">Email</label>
              <input
                className="p-2 border-2 border-blue-400 w-full rounded-lg m-3"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@gmail.com"
              />
            </span>

            <span className="flex flex-col">
              <label htmlFor="address">Address</label>
              <input
                className="p-2 border-2 border-blue-400 w-full rounded-lg m-3"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House and street name number, Area"
              />
            </span>
          </div>

          <span className="flex flex-col">
            <label htmlFor="notes">Order Notes</label>
            <textarea
              className="p-2 m-3 border-2 border-blue-400 md:w-[50%] rounded-lg"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes for delivery, e.g., special request"
            ></textarea>
          </span>
        </form>

        <h1 className="text-3xl text-slate-600 font-bold m-6">Your Order</h1>
        <hr className="w-[80%]" />

        <div className="w-[80%]">
          <table className="w-full border-separate border-spacing-y-2 ">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-3 ">Product</th>
                <th className="text-left px-6 py-3 ">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {selectedProduct.map((product) => (
                <tr key={product._id} className="border-b border-gray-300">
                  <td className="px-6 py-3 ">{product.name}</td>
                  <td className="px-6 py-3 ">
                    ${product.price * product.quantity}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-3">SubTotal</td>
                <td className="px-6 py-3">${grandTotal}</td>
              </tr>
            </tbody>
          </table>
          <hr className="w-[100%]" />
          <button
            onClick={addOrder}
            className="p-2 my-5 w-full border-2 rounded-xl bg-blue-500 text-white"
          >
            Submit Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Bill;
