import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getUpdateProduct();
  });

  const getUpdateProduct = async () => {
    try {
      console.log(params);
      let result = await fetch(`http://localhost:8000/products/${params.id}`);
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    }
    catch {
      console.log("Error:");
    }
  };

  const updateProduct = async (id) => {
    let result = await fetch(`http://localhost:8000/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, category, company })
      });
    result = await result.json();
    if (result) {
      navigate("/products");
    }
}

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
      <input
        type="text"
        placeholder="Enter the Product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter the product Company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      <button  type="button" onClick={() => updateProduct(params.id)}>
        UpdateProduct
      </button>
    </div>
  );
};

export default UpdateProduct;
