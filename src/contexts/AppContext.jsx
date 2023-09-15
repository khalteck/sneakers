/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState } from "react";
import { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {
  const location = useLocation();
  let currentPage = location.pathname;

  const [data, setdata] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  async function fetchData() {
    console.log("fetching");
    const options = {
      method: "GET",
      url: "https://dummyjson.com/products?limit=50",
    };

    try {
      const response = await axios.request(options);
      localStorage.setItem("products", JSON.stringify(response.data.products));
      setdata(response.data.products);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentPage,
        fetchData,
        data,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
