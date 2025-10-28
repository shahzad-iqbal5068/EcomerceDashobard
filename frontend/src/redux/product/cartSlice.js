import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  selectedProduct: [],
  totalQuantity: 0,
};

// Helper function for calculating total quantity
const calculateQuantity = (products) => {
  return products.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const availableProduct = state.selectedProduct.find(
        (Product) => Product._id === action.payload._id
      );

      if (availableProduct) {
        availableProduct.quantity += 1;
      } else {
        state.selectedProduct.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity = calculateQuantity(state.selectedProduct);
    },

    removeProduct: (state, action) => {
      state.selectedProduct = state.selectedProduct.filter(
        (product) => product._id !== action.payload._id
      );
      state.totalQuantity = calculateQuantity(state.selectedProduct);
    },

    // ✅ New reducer for updating quantity manually
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.selectedProduct.find((item) => item._id === productId);

      if (product) {
        product.quantity = quantity > 0 ? quantity : 1; // never allow 0 or negative
      }

      state.totalQuantity = calculateQuantity(state.selectedProduct);
    },
  },
});

export const { setSelectedProduct, removeProduct, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
