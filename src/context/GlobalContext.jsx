import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        selectedBook,
        setSelectedBook,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
