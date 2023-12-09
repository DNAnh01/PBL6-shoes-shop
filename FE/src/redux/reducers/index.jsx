// reducers/index.js
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  // ... other reducers
});

export default rootReducer;
