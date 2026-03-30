import {createSlice} from "@reduxjs/toolkit"

type CartItem = {
    productId: string;
    quantity: number;
};

const initialState: { items: CartItem[] } = {
    items: []
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{

    addToCart(state, action) {
        console.log("adding to cart", action.payload);
      const existing = state.items.find(
        (item: any) => item.productId === action.payload.productId
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item: any) => item.productId !== action.payload
      );
    },

    updateQuantity(state, action) {
    const { productId, quantity } = action.payload;

    const item = state.items.find(
        (i: any) => i.productId === productId
    );

    if (item) {
        item.quantity = quantity;
    }
    }

  }
})

export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions
export default cartSlice.reducer