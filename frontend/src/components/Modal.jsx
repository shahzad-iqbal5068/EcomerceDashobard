import React from 'react'
import { X } from 'lucide-react';

const Modal = ({onClose , product}) => {
  console.log(onClose ,product);
  return (
    <>
    <div className=' w-[500px]  h-[500px] fixed inset-0
     bg-blue-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center m-auto
     rounded-2xl'>
        <div>
    <button className=' flex place-self-end' onClick={onClose}><X size={30}/></button>
            <img src={product.image} alt="Preview" />
            <h1 className='text-2xl font-bold'>{product.name} ${product.price}</h1>
            <p>{product.description}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>        

        </div>
        
    </div>
    </>
  )
}

export default Modal
