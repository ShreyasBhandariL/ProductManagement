/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import "./Styles/ProductList.css";

const BuyedProductList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    let result = await fetch(
      "https://productmanagementserver-fzzc.onrender.com/customers"
    );
    result = await result.json();
    setCustomers(result);
  };

    
  return (
    <div className="productList">
      <h1>Buyers List</h1>
      <div className="table-container">
        <table className="product-table">
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
    </div>
  );
};

export default BuyedProductList;
