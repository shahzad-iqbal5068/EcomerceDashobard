import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem('user');
//   console.log('auth is',auth)
  let user = '';
  if(auth){
     user = JSON.parse(auth);
     //  console.log(user._id);
   }
   const token = JSON.parse(localStorage.getItem('token'));
 //   console.log("token is ", token);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
   
    let result = await fetch(`http://localhost:5000/products/${user._id}`,{
      headers:{
         'Content-Type':'application/json',
         Authorization: `Bearer ${token}`
      }
    });
    result = await result.json();
    setProducts(result);
  };
  //  console.warn(products);
  const deleteProduct = async (id) => {
    // console.warn("run", id)
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "delete",
       headers:{
            'Content-Type':'application/json',
             Authorization: `Bearer ${token}`
         }
    });
    result = await result.json();
    if (result) {
      alert("record is deleted");
      getProducts();
    }
  };
  const searchHandle = async (e) => {
    // console.warn(e.target.value)
    const key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}/${user._id}`,{
         headers:{
             Authorization: `Bearer ${token}`
         }
       });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Products List</h1>
      <input
        type="text"
        className="search-box"
        onChange={searchHandle}
        placeholder="Search Box"
      />
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Brand</li>
        <li>Price</li>
        <li>category</li>
        <li>operation</li>
      </ul>
      {
       products.length>0 ? products.map((item, index) => {
        return (
          <ul>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>
              <button type="button" onClick={() => deleteProduct(item._id)}>
                Delete
              </button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        );
      }) : <h1>No Result Found</h1>
      }
    </div>
  );
};
export default ProductsList;
