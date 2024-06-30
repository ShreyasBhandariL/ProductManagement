import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/products");
    result = await result.json();
    setProducts(result);
    };
    
    const deleteProduct = async(id) => {
        let result = await fetch(`http://localhost:8000/products/${id}`, {
         method: "Delete"   
        }
        );
        result = await result.json();
        if (result)
        {
            getProducts();
        }
    }
  console.log(products);
  return (
    <div className="productList">
      <h1>Products List</h1>
      <ul>
        <li>Sl.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operations</li>
      </ul>
      {products.map((item, index) => (
        <ul key={item}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>
                  <button onClick={() => deleteProduct(item._id)}>Delete</button>
                  <Link to={"/update/"+item._id}>Update</Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
