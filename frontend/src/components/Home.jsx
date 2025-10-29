import React, { useEffect, useState} from "react";
import {  FocusIcon,  ShoppingBag } from "lucide-react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {setSelectedProduct} from "../redux/product/cartSlice";
import useFetchApi from "../customHook/useFetchApi";
import {ClipLoader ,HashLoader} from 'react-spinners'
import debounce from 'lodash/debounce';
import "../App.css";



const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading ,setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchApi = useFetchApi();
  const apiUrl = import.meta.env.VITE_API_URL;
  const getProducts = async () => {
    setloading(true)
    const url =`${apiUrl}products`
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
      const url = `${apiUrl}search/${key}`
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
    <>
    
    <div className="container mx-auto">
      <div className="flex justify-around p-4"> 
      <h1 className="text-slate-500 font-bold text-3xl">Discover Your Style</h1>
      

        <input
          type="text"
          className="search-box"
          onChange={searchHandle}
          placeholder="Search Box"
        />
      </div>
      {loading ? <div  className="flex justify-center items-center min-h-[200px]">
        <HashLoader color="blue"  size={50}/>
      </div> :
      <section className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6 md:mx-[100px]">
        {products.length > 0 ? (
          products.map((item,index) => {
            return (
              <div key={item._id || index} className="w-full max-w-[380px] ">
                <div className="cursor-pointer flex flex-col w-full max-w-[380px]  bg-white border border-gray-200 rounded-lg p-2 ">
                  <div className="relative group overflow-hidden w-full h-64 perspective-1000">
                    <img  
                      src={item.image}
  className="w-full h-full object-cover transition-transform duration-500 ease-in-out origin-left group-hover:rotate-x-12 group-hover:-translate-x-2"
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
                    <p className="mb-3 font-normal hover:text-gray-700 line-clamp-3 ">
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

    {/* <Footer/> */}
    </>

  );
};

export default Home;
