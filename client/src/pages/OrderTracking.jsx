import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/orders/${orderId}`);
          const fetchedOrder = response.data;
          setOrder(fetchedOrder);
      
          // Fetch order status
          const statusResponse = await axios.get(`http://localhost:4000/api/orders/${fetchedOrder._id}/status`);
          const orderStatus = statusResponse.data.status;
          console.log("Order Status:", orderStatus);
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      };
      
  
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);
  

  return (
    <div>
      <h2>Order Tracking</h2>
      {order ? (
        <>
          <p>Status: {order.status}</p>
          {/* Add other order details you want to display */}
        </>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderTracking;
