import React from 'react'
import Signup from './Signup'

const Seller = () => {
  return (
    <div className='contianer flex flex-col items-center'>
      <h1 className='text-2xl font-bold text-slate-400'>Seller Registertion</h1>
      <Signup vendorRequest={true} />
    </div>
  )
}

export default Seller
