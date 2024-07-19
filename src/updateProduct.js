/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();
  const dburl = process.env.REACT_APP_DATABASE_URL;

  useEffect(() => {
    getUpdateProduct();
  }, [params.id]);

  const getUpdateProduct = async () => {
    try {
      let result = await fetch(
        `${dburl}/products/${params.id}`
      );
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setProductQuantity(result.productQuantity);
    } catch {
      console.log("Error:");
    }
  };

  const updateProduct = async (id) => {
    let result = await fetch(
      `${dburl}/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, category }),
      }
    );
    result = await result.json();
    if (result) {
      navigate("/products");
    }
  };

  return (
    <div className="signup">
      <input
        type="text"
        placeholder="Enter the Product Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter the Product Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
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

      <input
        type="number"
        placeholder="Enter the Product Quantity"
        value={productQuantity}
        onChange={(e) => setProductQuantity(parseInt(e.target.value))}
      />

      <button type="button" onClick={() => updateProduct(params.id)}>
        UpdateProduct
      </button>
    </div>
  );
};

export default UpdateProduct;
