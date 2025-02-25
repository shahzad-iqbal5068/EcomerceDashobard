import React, { useState } from "react";

const Addproduct = ()=>{
    const [name,setName]= useState('');
    const [price,setPrice]= useState('');
    const [brand,setBrand]= useState('');
    const [category,setCategory]= useState('');
    const [error,setError] = useState('');
    const userid = JSON.parse(localStorage.getItem('user'))._id;

    const handleAddProduct = async()=>{
         if(!name || !price || !brand || !category){
            setError(true);
            return false;
         };
        console.log(brand,category,name,price ,userid);
        let token = JSON.parse(localStorage.getItem('token'))    
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body: JSON.stringify({name,price,brand,category,userid}),
            headers:{
                'Content-Type':"application/json",
                Authorization:   `Bearer ${token}`      
              }
        });

        result = await result.json();
        console.warn(result);

    }
    return (
        <div className="add-product">
            <h1>Add Product</h1>
            <input type="text" className="input-box" placeholder="Enter Product Name" 
            value={name} onChange={(e)=>setName(e.target.value)} />
            {error &&   !name && <span className="invalid-input">Enter valid name</span>}

            <input type="text" className="input-box" placeholder="Enter price" 
            value={price} onChange={(e)=>setPrice(e.target.value)} />
            {error && !price && <span className="invalid-input">Enter valid Price</span>}

            <input type="text" className="input-box" placeholder="Enter Brand name" 
            value={brand} onChange={(e)=>setBrand(e.target.value)} />
            {error && !brand && <span className="invalid-input">Enter valid Price</span>}
            
            <input type="text" className="input-box" placeholder="Enter category" 
            value={category} onChange={(e)=>setCategory(e.target.value)} />
            {error && !category && <span className="invalid-input">Enter valid Price</span>}

            <button type="button" className="app-button" onClick={handleAddProduct}>Add Product</button>
        </div>
    )
}
export default Addproduct;