import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import React, { useEffect } from "react";
import { useGlobalContext } from "./context/GlobalContext.jsx";

const BookList = React.lazy(() => import("bookList/App"));
const SingleBook = React.lazy(() => import("singleBook/App"));

function App() {
  const { cart, setCart, setSearchText } = useGlobalContext();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    return () => {};
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const removeItemFromCart = (bookId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.bookId !== bookId);
      return updatedCart;
    });
  };

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col">
      <Header
        handleSearch={(value) => handleSearch(value)}
        onRemoveItem={(bookId) => removeItemFromCart(bookId)}
        cart={cart}
      ></Header>
      <div className="flex-1 mt-4">
        <SingleBook />
      </div>
      <div className="flex-1 mt-8 mb-4">
        <BookList />
      </div>
      <Footer handleSearch={(value) => handleSearch(value)}></Footer>
    </div>
  );
}

export default App;
