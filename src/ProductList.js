/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Styles/ProductList.css"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [quantity, setQuantity] = useState(1);
   const [buyerName, setBuyerName] = useState("");
   const [buyerContact, setBuyerContact] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();


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
  const openPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setShowPopup(false);
    setQuantity(1); 
    setBuyerName(""); 
    setBuyerContact(""); 
  };

  const handleBuy = async () => {
    if (selectedProduct && quantity > 0 && buyerName && buyerContact) {
      const buyerInfo = {
        productId: selectedProduct._id,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
        quantity: quantity,
        buyerName: buyerName,
        buyerContact: buyerContact,
      };

      try {
        const response = await fetch(
          "https://productmanagementserver-fzzc.onrender.com/add-buyer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(buyerInfo),
          }
        );
       await response.json();
        if (response.status === 200)
        {
          navigate("/products");
        }
      } catch (error) {
        console.error("Error adding buyer:", error);
      }

      closePopup();
    } else {
      console.error("Incomplete selection or information");
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
              <th>Image</th>
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
                <td>
                  {item.image && (
                    <img
                      src={`https://productmanagementserver-fzzc.onrender.com/${item.image}`}
                      alt={item.name}
                      className="product-image"
                    />
                  )}
                </td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => deleteProduct(item._id)}>
                    Delete
                  </button>
                  <button>
                    <Link to={`/update/${item._id}`}>Update</Link>
                  </button>
                  <button onClick={() => openPopup(item)}>Buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>
              &times;
            </button>
            <h2>{selectedProduct.name}</h2>
            {selectedProduct.image && (
              <a href={`https://productmanagementserver-fzzc.onrender.com/${selectedProduct.image}`}>
                <img
                  src={`https://productmanagementserver-fzzc.onrender.com/${selectedProduct.image}`}
                  alt={selectedProduct.name}
                  className="product-image"
                />
              </a>
            )}
            <p>Price: ${selectedProduct.price}</p>
            <div className="form-group">
              <label htmlFor="buyerName">Buyer Name:</label>
              <input
                type="text"
                id="buyerName"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="buyerContact">Contact:</label>
              <input
                type="text"
                id="buyerContact"
                value={buyerContact}
                onChange={(e) => setBuyerContact(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <button className="buy-btn" onClick={handleBuy}>
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
