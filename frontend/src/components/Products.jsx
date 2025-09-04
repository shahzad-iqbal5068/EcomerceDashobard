import React, { useEffect, useState} from "react";
import {  FocusIcon, ShoppingBag } from "lucide-react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {setSelectedProduct} from "../redux/product/cartSlice";
import useFetchApi from "../customHook/useFetchApi";
import {ClipLoader ,HashLoader} from 'react-spinners'
import debounce from 'lodash/debounce';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading ,setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchApi = useFetchApi();
 
  const getProducts = async () => {
    setloading(true)
    const url =`http://localhost:5000/products`
    let result = await fetchApi({url});
    setloading(false);
    setProducts(result);
  };
  
  useEffect(() => {
    getProducts();
  }, []);

  const searchHandle = debounce((event) => {
    // console.log("start1", event.target.value);
    searchHandle1(event)
  }, 500)

  const searchHandle1 = async (e) => {
    const key = e.target.value;
    if (key) {
      setloading(true)
      const url = `http://localhost:5000/search/${key}`
        let result = await fetchApi({url});
      if (result) {
        setloading(false)
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  const handleproductDetail = (item) => {
    navigate(`/product/${item._id}`, { state: { product: item } });
  };
  const handleCart = (product) => {
    dispatch(setSelectedProduct(product));
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center font-bold">Products List</h1>
      

      <section className="flex  justify-center">
        <input
          type="text"
          className="search-box"
          onChange={searchHandle}
          placeholder="Search Box"
        />
      </section>
      {loading ? <div  className="flex justify-center items-center min-h-[200px]">
        <HashLoader color="blue"  size={50}/>
      </div> :
      <section className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6 md:mx-[100px]">
        {products.length > 0 ? (
          products.map((item,index) => {
            return (
              <div key={item._id || index}>
                <div className="cursor-pointer flex flex-col w-full max-w-[380px]  bg-white border border-gray-200 rounded-lg p-2 ">
                  <div className="relative group overflow-hidden">
                    <img  
                      src={item.image}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:rotate-360 origin-left group-hover:translate-x-2"
                      alt="preview"
                    />                 
                    <span className="flex justify-end relative inset-0 top-[-25px] sm:opacity-0 sm:group-hover:opacity-100 "
                     >
                      < ShoppingBag  onClick={()=>handleCart(item)} />
                      < ShoppingBag  onClick={()=>{handleCart(item); navigate('/bill')}}/>
                      </span>
                  
                  </div>
                  <div className="p-5 "  onClick={() => {
                        handleproductDetail(item);
                      }} >
                    <h5
                      className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                      {item.name} ${item.price}                      
                    </h5>
                    <p className="mb-3 font-normal hover:text-gray-700 ">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Result Found</h1>
        )}
      
      </section>
      }
      
    </div>
  );
};

export default Home;
