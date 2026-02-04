import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/allorders`)
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setAllOrders([]);
      });
  }, []);

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      {allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Type</th>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => {
                const total = order.qty * order.price;
                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                    <td className={order.orderType === "BUY" ? "profit" : "loss"}>
                      {order.orderType}
                    </td>
                    <td>{order.productType}</td>
                    <td>₹{total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;

