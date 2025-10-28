import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeProduct, updateQuantity } from "../redux/product/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.cart.selectedProduct);

  const [quantities, setQuantities] = useState(
    selectedProduct.reduce((acc, product) => {
      acc[product._id] = product.quantity;
      return acc;
    }, {})
  );

  const shippingCharges = 300;
  const sum = selectedProduct.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0
  );

  // handle input change (store locally first)
  const handleProductQuantity = (productId, value) => {
    setQuantities({ ...quantities, [productId]: Number(value) });
  };

  // update redux when clicking "Update Cart"
  const handleUpdateCart = () => {
    Object.entries(quantities).forEach(([productId, quantity]) => {
      dispatch(updateQuantity({ productId, quantity }));
    });
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">
        Shopping Cart
      </h2>

      {selectedProduct.length > 0 ? (
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cart Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-separate border-spacing-y-2">
              <thead className="bg-slate-400 text-white">
                <tr>
                  <th className="p-3">Remove</th>
                  <th className="p-3">Thumbnail</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedProduct.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td
                      onClick={() => dispatch(removeProduct(product))}
                      className="p-4 text-red-500 text-center cursor-pointer bg-slate-100"
                    >
                      x
                    </td>
                    <td className="p-4">
                      <img
                        className="w-24 h-16 rounded-md shadow"
                        src={product.image}
                        alt={product.name}
                      />
                    </td>
                    <td className="p-4 bg-slate-100">{product.name}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4 bg-slate-100">
                      <input
                        type="number"
                        value={quantities[product._id]}
                        min={1}
                        className="w-12 p-1 border rounded"
                        onChange={(e) =>
                          handleProductQuantity(product._id, e.target.value)
                        }
                      />
                    </td>
                    <td className="p-4 font-semibold">
                      ${quantities[product._id] * product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="app-button mt-3"
              onClick={handleUpdateCart}
            >
              Update Cart
            </button>
          </div>

          {/* Cart Totals */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl text-center font-semibold mb-3">
              Cart Totals
            </h2>
            <table className="w-full bg-gray-100 rounded-lg overflow-hidden">
              <tbody>
                <tr className="border-b">
                  <th className="p-3">Subtotal</th>
                  <td className="p-3 font-semibold">${sum}</td>
                </tr>
                <tr>
                  <th className="p-3">Shipping Charges</th>
                  <td className="p-3 font-semibold">${shippingCharges}</td>
                </tr>
                <tr>
                  <th className="p-3">Grand Total</th>
                  <td className="p-3 font-semibold">
                    ${shippingCharges + sum}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => {
                navigate("/bill");
              }}
              type="button"
              className="app-button mt-3"
            >
              Proceed to Checkout
            </button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center text-center">
          <h1 className="text-gray-500 text-2xl font-bold">
            Your cart is currently empty
          </h1>
          <Link to={"/"} className="app-button text-center mt-4">
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
