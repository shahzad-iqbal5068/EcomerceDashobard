import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";
import {toast} from 'react-toastify'

const MyProducts = () => {
  // console.log("url is ",url)
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const auth = localStorage.getItem("userid");
  let userid = "";
  if (auth) {
    userid = JSON.parse(auth);
  }
  const token = JSON.parse(localStorage.getItem("token"));
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch(`${apiUrl}/products/${userid}`, {
      headers:
       {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`${apiUrl}/products/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    result = await result.json();
    if (result) {
      toast("record is deleted");      
      getProducts();
    }
  };
  const searchHandle = async (e) => {
    const key = e.target.value;
    if (key) {
      let result = await fetch(
        `${apiUrl}/search/${key}/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
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
      <h1 className="text-3xl font-bold">Products List</h1>
      <input
        type="text"
        className="search-box"
        onChange={searchHandle}
        placeholder="Search Box"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((item, index) => {
            return (
              <div key={item._id || index}>
                <div  className="flex flex-col  max-w-sm bg-white border border-gray-200 rounded-lg p-2">
                  <div className="relative group">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                    <div className="flex gap-2 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity  p-2 ">
                      <Link className="" to={`/update/${item._id}`}>
                        <Pencil size={25} />
                      </Link>
                      <button
                        type="button"
                        className=""
                        onClick={() => deleteProduct(item._id)}
                      >
                        <Trash2 size={25} />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.name} ${item.price}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {item.description}
                    </p>

                    <div>

                      <button
                        className="app-button"
                        onClick={() => setShowModal(true)}
                      >
                        Read More
                      </button>

                      { showModal && (                      
                        <Modal onClose={() => setShowModal(false)} product ={item}/>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Result Found</h1>
        )}
      </div>
    </div>
  );
};
export default MyProducts;
