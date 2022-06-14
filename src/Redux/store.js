import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import cartItems from "./Reducers/cartItems";
import notificationItems from "./Reducers/notificationItems";

const reducers = combineReducers({
  cartItems: cartItems,
  notificationItems,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
