import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token"); 
  const apiUser = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${apiUser}orders?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [userId, token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ${order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <ul className="ml-4 list-disc">
                {order.products.map((p, i) => (
                  <li key={i}>
                    {p.productId?.name || "Unknown Product"} × {p.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
