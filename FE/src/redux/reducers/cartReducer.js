// src/store/reducers/cartReducer.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_PRODUCTS,
  SET_TOTAL_PRICE,
  UPDATE_CART_ITEM,
} from "../../store/actions/actionTypes";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  // ... other cart-related properties
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
        totalPrice: state.totalPrice + newItem.price,
        totalQuantity: state.totalQuantity + 1,
      };
    case REMOVE_FROM_CART:
      const removedItemId = action.payload;
      const removedItem = state.cartItems.find(
        (item) => item.id === removedItemId
      );
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== removedItemId),
        totalPrice: state.totalPrice - (removedItem ? removedItem.price : 0),
        totalQuantity: state.totalQuantity - 1,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_TOTAL_PRICE:
      const totalPrice = isNaN(action.payload) ? 0 : action.payload;
      return {
        ...state,
        totalPrice: totalPrice,
      };

    case UPDATE_CART_ITEM:
      const { productId, updatedData } = action.payload;
      console.log(productId);
      const updatedCartItems = state?.cartItems?.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            ...updatedData,
          };
        }
        return item;
      });

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    // ... other cart-related cases
    default:
      return state;
  }
};

export default cartReducer;
