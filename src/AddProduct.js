import React, { useState } from "react";
import "./Styles/AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dburl = process.env.REACT_APP_DATABASE_URL;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const Product = async () => {
    if (!name || !price || !category || !productQuantity) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("productQuantity", productQuantity);
    formData.append("userId", userId);
    formData.append("image", image);

    try {
      setLoader(true);
      let response = await fetch(
        `${dburl}/add-product`,
        {
          method: "POST",
          body: formData,
        }
      );

      await response.json();
      navigate("/products");
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container">
      <div className="signup">
        <h1>Add New Product</h1>
        <input
          type="text"
          placeholder="Enter the Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="validation">Enter a valid Name</span>
        )}

        <input
          type="text"
          placeholder="Enter the Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="validation">Enter a valid Price</span>
        )}

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Select any option
          </option>
          <option value="Textile">Textile Crafts</option>
          <option value="Paper">Paper Crafts</option>
          <option value="Wood">Wood Crafts</option>
          <option value="Ceramics">Ceramics and Pottery</option>
          <option value="Jewelry">Jewelry Making</option>
          <option value="Glass">Glass Crafts</option>
          <option value="Leather">Leather Crafts</option>
          <option value="Metal">Metal Crafts</option>
          <option value="Fiber">Fiber Arts</option>
          <option value="Others">Other Crafts</option>
        </select>
        {error && !category && (
          <span className="validation">Enter a valid Category</span>
        )}

        <input
          type="number"
          placeholder="Enter the Product Quantity"
          value={productQuantity}
          onChange={(e) => setProductQuantity(parseInt(e.target.value))}
        />
        {error && !productQuantity && (
          <span className="validation">Enter a valid Quantity</span>
        )}

        <input type="file" onChange={handleImageChange} />
        {error && !image && (
          <span className="validation">Upload a valid Image</span>
        )}

        <button
          onClick={Product}
          className="loader"
          type="button"
          disabled={loader}
        >
          {loader ? "Adding..." : "Add Product"}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
