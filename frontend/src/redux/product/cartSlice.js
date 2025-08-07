import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  selectedProduct: [],
  totalQuantity: 0,
};
// Helper function for Calculating The Value of Cart items qunatitty
const calculateQuantity=(products)=>{
  return products.reduce((total,item)=>(total + item.quantity||0),0) || 0;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      console.log("statein set selected",state.selectedProduct,action.payload)
      const availableProduct = state.selectedProduct.find(
        (Product) => Product._id === action.payload._id
      );
      if (availableProduct) {
        availableProduct.quantity +=1;
      } else {
        state.selectedProduct.push({ ...action.payload, quantity: 1 });
      }
     state.totalQuantity = calculateQuantity(state.selectedProduct)
    },
    removeProduct:(state,action)=>{
      console.log("state in remove product in redux",state.selectedProduct , action.payload)
      state.selectedProduct = state.selectedProduct.filter((product)=>product._id !== action.payload._id)
      state.totalQuantity =  calculateQuantity(state.selectedProduct);
    },
    
  },

});

export const { setSelectedProduct ,removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
