import { configureStore } from '@reduxjs/toolkit'
import ProfileSliceReducer    from  '../redux/user/ProfileSlice'
import  UserSliceReducer  from './user/userdetails';
import  cartSliceReducer  from './product/cartSlice';
export  const store = configureStore ({
    reducer: {
      profile : ProfileSliceReducer,
      user : UserSliceReducer,
      cart : cartSliceReducer
    },
});

export default store;