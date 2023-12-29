import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserOrders = ({ userId }) => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/find/${userId}`);
        setUserOrders(response.data);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchUserOrders();
  }, [userId]);

  return (
    <div>
      <h2>User Orders</h2>
      {userOrders.length > 0 ? (
        <ul>
          {userOrders.map(order => (
            <li key={order._id}>
              Order ID: {order._id}, Status: {order.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found for this user.</p>
      )}
    </div>
  );
};

export default UserOrders;
