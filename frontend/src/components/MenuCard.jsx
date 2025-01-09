
 import React, { useState, useEffect} from "react";
 import axios from "axios";
 import './MenuCard.css';

const MenuCard = () => {
    const [menu, setMenu] = useState([]);
  
    useEffect(() => {
      const fetchMenu = async () => {   //https://hotel-management-app-backend.vercel.app/
        const response = await axios.get("https://hotel-management-app-back.vercel.app/api/menu");
        setMenu(response.data);
      };
      fetchMenu();
    }, []);
  
    const placeOrder = async (item) => {
      const customerName = prompt("Enter your name:");
      const order = {
        customerName,
        items: [item],
      };
  
      // Add the order to the orders state in App
      console.log("Placing order:", order); // Log order for debugging
    //   addOrder(order);
  
      // Optionally, send the order to the backend
      const response = await axios.post("https://hotel-management-app-back.vercel.app/api/orders", order);
      alert(`Order placed successfully! Order ID: ${response.data._id}`);
    };
  
    return (
      <div>
        <h1>Yash & Ankit’s Delight</h1>
        <h3>Menu</h3>
        <ul>
          {menu.map((item) => (
            <li key={item._id}>
              {item.name} - ₹{item.price}{" "}
              <button onClick={() => placeOrder(item)}>Order</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MenuCard;
  