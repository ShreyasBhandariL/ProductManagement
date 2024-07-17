/* eslint-disable react/jsx-no-duplicate-props */
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
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dburl = process.env.REACT_APP_DATABASE_URL;

  // let auth = localStorage.getItem("user");
  const authRole = JSON.parse(localStorage.getItem("user"));
  const role = authRole?.role;
  const id = authRole?._id;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(
      `${dburl}/products`
    );
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(
      `${dburl}/products/${id}`,
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
      console.log(selectedProduct.category);
      const buyerInfo = {
        productId: selectedProduct._id,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
        productCategory: selectedProduct.category,
        quantity: quantity,
        buyerName: buyerName,
        buyerContact: buyerContact,
      };

      try {
        setLoader(true);
        const response = await fetch(
          `${dburl}/add-buyer`,
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
      } finally {
        setLoader(false);
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
              <th>Quantity</th>
              <th>Category</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.image && (
                      <img
                        src={`${dburl}/${item.image}`}
                        alt={item.name}
                        className="product-image"
                      />
                    )}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.productQuantity}</td>
                  <td>{item.category}</td>
                  <td className="product-buttons">
                    <button onClick={() => openPopup(item)}>Buy</button>
                    {role === "2" && id === item.userId ? (
                      <>
                        <button>
                          <Link
                            to={`/update/${item._id}`}
                            className="update-link"
                          >
                            Update
                          </Link>
                        </button>

                        <button onClick={() => deleteProduct(item._id)}>
                          Delete
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="card-container">
        {products.length > 0 &&
          products?.map((item, index) => (
            <div key={item._id} className="product-card">
              {item.image && (
                <img
                  src={`${dburl}/${item.image}`}
                  alt={item.name}
                  className="product-image"
                />
              )}
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
              <div className="product-buttons">
                <button onClick={() => openPopup(item)}>Buy</button>
                {role === "2" && id === item.userId ? (
                  <>
                    <button>
                      <Link to={`/update/${item._id}`} className="update-link">
                        Update
                      </Link>
                    </button>

                    <button onClick={() => deleteProduct(item._id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
      </div>

      {showPopup && selectedProduct && (
        <div className="container">
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn" onClick={closePopup}>
                &times;
              </button>
              <h2>{selectedProduct.name}</h2>
              {selectedProduct.image && (
                <a href={`${dburl}/${selectedProduct.image}`}>
                  <img
                    src={`${dburl}/${selectedProduct.image}`}
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
              <button
                className="buy-btn loader" onClick={handleBuy}  disabled={loader}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
