import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import MainHome from "./components/MainHome";
import SignUp from "./components/SignUp/SignUp";
import { CartState } from "./context/Context";
import axios from "axios";
import faker from "faker";
faker.seed(99);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const { dispatch } = CartState();

  useEffect(() => {
    let isMounted = true;
    const getAPI = async (URL) => {
      try {
        const { data } = await axios.get(URL);
        console.log(data);
        // APIDispatch({ payload: data });
        const products = data.map((val) => {
          return {
            id: val.id,
            name: val.title,
            price: val.price,
            image: val.image,
            inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
            fastDelivery: faker.datatype.boolean(),
            ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          };
        });
        console.log(products);
        dispatch({ type: "ADD_PRODUCTS", products: products });
      } catch (error) {
        console.log(error);
      }
    };

    if (isMounted) {
      getAPI("https://fakestoreapi.com/products/");
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />

        <Route
          path="/"
          element={isLoggedIn ? <MainHome /> : <Navigate to="/login" />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
