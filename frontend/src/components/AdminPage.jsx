import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminPage.css';
const AdminPage = () => {
  const [orders, setOrders] = useState([]); // State for orders

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {                             //https://hotel-management-app-backend.vercel.app/
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);  // Set orders from the response
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();  // Call the function to fetch orders
  }, []);  // Empty dependency array to fetch only once on component mount

  // Function to delete an order
  const deleteOrder = async (orderId) => {
    console.log('Deleting order with ID:', orderId); // Log the orderId

    try {              //https://hotel-management-app-backend.vercel.app/
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      // Remove the deleted order from the state
      setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
      alert("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete the order");
    }
  };

  // Function to calculate the total amount of an order
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price, 0);  // Sum of item prices
  };

  // Group orders by customer and calculate total amount for each customer
  const groupedOrders = orders.reduce((acc, order) => {
    const totalAmount = calculateTotal(order.items);  // Calculate total for the current order
    if (acc[order.customerName]) {
      acc[order.customerName].total += totalAmount;  // Accumulate total for the same customer
      acc[order.customerName].orders.push(order);
    } else {
      acc[order.customerName] = {
        total: totalAmount,
        orders: [order],
      };
    }
    return acc;
  }, {});

  return (
    <div>
      <h2>Admin Page</h2>
      <h3>Orders</h3>
      <ul>
        {Object.keys(groupedOrders).length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          Object.entries(groupedOrders).map(([customerName, customerData]) => (
            <li key={customerName}>
              <h4>Customer: {customerName}</h4>
              <strong>Total Amount:</strong> ₹{customerData.total} <br />
              <ul>
                {customerData.orders.map((order) => (
                  <li key={order._id}>
                    <strong>Order ID:</strong> {order._id} <br />
                    <strong>Items:</strong>{" "}
                    {order.items.map((item) => (
                      <span key={item._id}>
                        {item.name} - ₹{item.price}{" "}
                      </span>
                    ))}
                    <br />
                    <button onClick={() => deleteOrder(order._id)}>Delete Order</button>
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminPage;
