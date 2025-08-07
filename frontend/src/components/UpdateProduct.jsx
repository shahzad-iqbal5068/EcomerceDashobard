import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    console.log(params);
    getProductDetail();
  }, []);
  const getProductDetail = async () => {
    
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
           Authorization: `Bearer ${token}`
        }
      });
    result = await result.json();
    console.log(result);
    setName(result.name);
    setBrand(result.brand);
    setCategory(result.category);
    setPrice(result.price);
  };
  const handleupdateProduct = async () => {
    console.log(name, price, brand, category);
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      method: 'Put',
      body: JSON.stringify({name,price,brand,category}),
      headers:{
        'Content-Type':"application/json",
         Authorization: `Bearer ${token}`          
      }
    });
    result = await result.json();
    // console.log(result);
    alert("Updated Suessfully");
    navigate('/');
    
  };
  return (
    <div className="add-product">
      <h1>UpdateProduct</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="input-box"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product Price"
        className="input-box"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product  Brand"
        className="input-box"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product Catogeroy"
        className="input-box"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button
        type="button"
        className="app-button"
        onClick={handleupdateProduct}
      >
        Update Product
      </button>
    </div>
  );
};
export default UpdateProduct;
