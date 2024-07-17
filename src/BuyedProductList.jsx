/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import "./Styles/BuyedProductList.css"; // new CSS file

const BuyedProductList = () => {
  const [customers, setCustomers] = useState([]);
  const dburl = process.env.REACT_APP_DATABASE_URL;
  const auth = JSON.parse(localStorage.getItem("user"));
  const authId = auth?._id;

  useEffect(() => {
    getCustomers();
  });

  const getCustomers = async () => {
    let result = await fetch(`${dburl}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authId }),
    });
    result = await result.json();
    setCustomers(result);
  };

  return (
    <div className="buyedProductList">
      <h1>Buyers List</h1>
      <div className="buyers-table-container">
        <table className="buyers-table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Customer Name</th>
              <th>Customer Contact</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 &&
              customers?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.buyerName}</td>
                  <td>{item.buyerContact}</td>
                  <td>{item.productName}</td>
                  <td>{item.productPrice}</td>
                  <td>{item.productCategory}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="buyers-card-container">
        {customers.length > 0 &&
          customers?.map((item, index) => (
            <div key={item._id} className="buyer-card">
              <h2>Customer Name: {item.buyerName}</h2>
              <p>Customer Contact: {item.buyerContact}</p>
              <p>Product Name: {item.productName}</p>
              <p>Product Price: {item.productPrice}</p>
              <p>Product Category: {item.productCategory}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BuyedProductList;
