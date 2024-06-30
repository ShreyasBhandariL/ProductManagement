import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css"; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(
      "https://productmanagementserver-fzzc.onrender.com/products"
    );
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(
      `https://productmanagementserver-fzzc.onrender.com/products/${id}`,
      {
        method: "DELETE",
      }
    );
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  return (
    <div className="productList">
      <h1>Products List</h1>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => deleteProduct(item._id)}>
                    Delete
                  </button>
                  <Link to={`/update/${item._id}`}>Update</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
