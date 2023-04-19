import { createContext, useContext, useReducer } from "react";

import {
  cartReducer,
  productReducer,
  emailReducer,
  logInReducer,
} from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  const [email, dispatchEmail] = useReducer(emailReducer, "");

  const [isLoggedIn, dispatchisLoggedIn] = useReducer(logInReducer, false);

  return (
    <Cart.Provider
      value={{
        state,
        dispatch,
        productState,
        productDispatch,
        email,
        dispatchEmail,
        isLoggedIn,
        dispatchisLoggedIn,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
