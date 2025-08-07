import React from "react";
import { useSelector } from "react-redux";

const Bill = () => {
  const selectedProduct = useSelector((state) => state.cart.selectedProduct);
  const intialvalue =0;
  const grandTotal = selectedProduct.reduce((acumulator,current)=>acumulator+current.price*current.quantity,intialvalue)
  // console.log("sum is",sum)
  return (
    <>
      <h1 className="text-center text-3xl text-slate-600 font-bold m-6">Checkout</h1>
      <div className="flex flex-col items-center md:mx-40">
        <h2 className="text-2xl text-slate-400 m-3">Billing Details</h2>
        <hr className="w-[80%] m-4" />

        <form action="" className="w-[80%] text-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <span className="flex flex-col text-lg">
              <label htmlFor="name">Name</label>
              <input className="p-2 border-2 border-blue-400 w-full rounded-lg m-3" type="text" name="name" placeholder="Enter Name" />
              <label htmlFor="phone">Phone</label>
              <input className="p-2 border-2 border-blue-400 w-full rounded-lg m-3" type="text" name="phone" placeholder="xxx-xxxxxxx" />
            </span>

            <span className="flex flex-col">
              <label htmlFor="city">City</label>
              <input className="p-2 border-2 border-blue-400 w-full rounded-lg m-3" type="text" name="city" placeholder="Enter city" />
              <label htmlFor="email">Email</label>
              <input className="p-2 border-2 border-blue-400 w-full rounded-lg m-3" type="email" name="email" placeholder="john@gmail.com" />
            </span>

            <span className="flex flex-col">
              <label htmlFor="adress">Address</label>
              <input className="p-2 border-2 border-blue-400 w-full rounded-lg m-3" type="text" name="adress" placeholder="House and street name number,Area" />
            </span>
          </div>

          <span className="flex flex-col">
            <span>
              <input type="checkbox" /> <label htmlFor=""> Create An Account</label>
            </span>
            <label htmlFor="notes">Order Notes</label>
            <textarea className="p-2 m-3 border-2 border-blue-400 md:w-[50%] rounded-lg" name="notes" placeholder="Notes for Delivery, e.g., special for delivery"></textarea>
          </span>
        </form>

        <h1 className="text-3xl text-slate-600 font-bold m-6">Your Order</h1>
        <hr className="w-[80%]" />

        {/* Responsive Table Wrapper */}
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
                  <td className="px-6 py-3 ">${product.price * product.quantity}</td>
                </tr>
              ))}
               {/* <hr className="w-[100%]" /> */}
              <tr>
                 <td className="px-6 py-3">
                   SubTotal
                 </td>
                 <td className="px-6 py-3">
                  {grandTotal}
                 </td>
              </tr>
            </tbody>            
          </table>
          <hr className="w-[100%]" />
          <button className="p-2 my-5 w-full border-2  rounded-xl">Submit Order</button>
        </div>
      </div>
    </>
  );
};

export default Bill;
