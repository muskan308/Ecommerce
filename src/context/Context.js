import { createContext, useContext, useReducer } from "react";

import { cartReducer, productReducer, emailReducer } from "./Reducers";

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
  console.log("Email", email);

  return (
    <Cart.Provider
      value={{
        state,
        dispatch,
        productState,
        productDispatch,
        email,
        dispatchEmail,
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
