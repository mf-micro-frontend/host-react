import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchText, setSearchText] = useState("");

  const addToCart = (data) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.bookId === data.bookId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.bookId === data.bookId
            ? { ...item, quantity: item.quantity + data.quantity }
            : item
        );
      }

      return [...prevCart, { ...data, quantity: data.quantity }];
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        selectedBook,
        setSelectedBook,
        searchText,
        setSearchText,
        addToCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
