import React, { useState } from "react";
import "./Styles/AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const Product = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("userId", userId);
    formData.append("company", company);
    formData.append("image", image);

    try {
      let result = await fetch(
        "https://productmanagementserver-fzzc.onrender.com/add-product",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!result.ok) {
        throw new Error("Failed to add product");
      }

      result = await result.json();
      if (result.status === 200) {
        navigate("/products");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="signup">
      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Enter the Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span className="validation">Enter a valid Name</span>}

      <input
        type="text"
        placeholder="Enter the Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && (
        <span className="validation">Enter a valid Price</span>
      )}

      <input
        type="text"
        placeholder="Enter the Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && (
        <span className="validation">Enter a valid Category</span>
      )}

      <input
        type="text"
        placeholder="Enter the Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && (
        <span className="validation">Enter a valid Company</span>
      )}

      <input type="file" onChange={handleImageChange} />
      {error && !image && (
        <span className="validation">Upload a valid Image</span>
      )}

      <button onClick={Product} type="button">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
