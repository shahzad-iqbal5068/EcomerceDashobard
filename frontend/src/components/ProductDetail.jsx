import React from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux';
import  {setSelectedProduct}  from '../redux/product/cartSlice';

const ProductDetail = () => {
    const navigate = useNavigate();
     const location = useLocation();
     const product = location.state?.product
     const dispatch = useDispatch();
     const handleCart = (product) => {
           dispatch(setSelectedProduct(product));
      };
      const handleBuy = (product)=>{
        navigate('/bill' , {state : {product: product}})
      }
  return (
    <div className="product-list">
      <h1 className="text-3xl font-bold">{product.name}</h1>

                <div  className="flex flex-col m-auto max-w-xl bg-white border border-gray-200 rounded-lg p-2">
                  <div>
                    <img
                      src={product.image}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />                  
                  </div>
                  <div className="p-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {product.name} ${product.price}
                      </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {product.description}
                    </p>

                    <div>
                      <button
                        className="app-button"
                        onClick={()=>handleBuy(product)}
                      >
                        Buy Now
                      </button>
                      <button
                        className="app-button"
                        onClick={()=>{handleCart(product)}}                        
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
    </div>
  )
}

export default ProductDetail
