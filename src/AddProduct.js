import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState(false);
    
    const Product = async () => {
        if (!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }
        
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:8000/add-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, category, userId, company })
        });
        result =await  result.json();
        console.log(result);
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
        {error && !name && (
          <span className="validation">Enter the valid Name</span>
        )}
        <input
          type="text"
          placeholder="Enter the Product Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        {error && !price && (
          <span className="validation">Enter the valid Price</span>
        )}
        <input
          type="text"
          placeholder="Enter the Product Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        {error && !category && (
          <span className="validation">Enter the valid Category</span>
        )}
        <input
          type="text"
          placeholder="Enter the product Company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        {error && !company && (
          <span className="validation">Enter the valid Company</span>
        )}
        <button onClick={Product} type="button">
          AddProduct
        </button>
      </div>
    );
}

export default AddProduct;