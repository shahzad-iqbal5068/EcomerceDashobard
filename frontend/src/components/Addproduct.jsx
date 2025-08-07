import React, { useEffect, useState, useRef } from "react";
import useFetchApi from "../customHook/useFetchApi";

const AddProduct = () => {
  const formRef = useRef({
    name: null,
    price: null,
    brand: null,
    category: null,
    description: null,
    image: null,
  });

  const fetchApi = useFetchApi();
  const [error, setError] = useState(false);
  const [catOption, setCatOption] = useState([]);
  const [image, setImage] = useState(null);
  const userid = JSON.parse(localStorage.getItem("userid"));

  const fetchCategories = async () => {
    const data = await fetchApi({
      url: "http://localhost:5000/category",
      method: "GET",
    });
    if (data) setCatOption(data);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchApi]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Validation: Check if any of the form fields are missing
    if (
      !formRef.current.name ||
      !formRef.current.price ||
      !formRef.current.brand ||
      !formRef.current.category ||
      !formRef.current.description ||
      !formRef.current.image
    ) {
      setError(true);
      return;
    }

    // Collect product data from refs
    const { name, price, brand, category, description } = formRef.current;

    const productData = {
      name: name.value,
      price: price.value,
      brand: brand.value,
      category: category.value,
      description: description.value,
      image,
      userid,
    };

    const result = await fetchApi({
      url: "http://localhost:5000/add-product",
      method: "POST",
      body: productData,
    });

    console.log("Product added:", result);
  };

  return (
    <div className="add-product">
      <h1>Add Product</h1>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          className="input-box"
          placeholder="Enter Product Name"
          ref={(e) => (formRef.current.name = e)}
          name="name"
        />
        {error && !formRef.current.name?.value && (
          <span className="invalid-input">Enter valid name</span>
        )}

        <input
          type="text"
          className="input-box"
          placeholder="Enter price"
          ref={(e) => (formRef.current.price = e)}
          name="price"
        />
        {error && !formRef.current.price?.value && (
          <span className="invalid-input">Enter valid Price</span>
        )}

        <input
          type="text"
          className="input-box"
          placeholder="Enter Brand name"
          ref={(e) => (formRef.current.brand = e)}
          name="brand"
        />
        {error && !formRef.current.brand?.value && (
          <span className="invalid-input">Enter valid Brand</span>
        )}

        <select
          className="p-2 border-2 border-slate-400 rounded-lg"
          name="category"
          ref={(e) => (formRef.current.category = e)}
          required
        >
          <option value="">Select Category</option>
          {catOption.map((item) => (
            <option key={item._id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        {error && !formRef.current.category?.value && (
          <span className="invalid-input">Select category</span>
        )}

        <textarea
          name="description"
          className="input-box"
          placeholder="Enter Product Description"
          ref={(e) => (formRef.current.description = e)}
        />
        {error && !formRef.current.description?.value && (
          <span className="invalid-input">Enter description</span>
        )}

        <input
          type="file"
          accept="image/*"
          ref={(e) => (formRef.current.image = e)}
          onChange={handleImageChange}
          className="input-box"
        />
        {image && <img src={image} alt="Preview" width="100" className="upload-img" />}
        {error && !image && <span className="invalid-input">Upload image</span>}

        <button type="submit" className="app-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
