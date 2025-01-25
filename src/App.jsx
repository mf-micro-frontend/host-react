import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import React, { useEffect, useState } from "react";

const BookList = React.lazy(() => import("bookList/App"));

function App() {
  const [cart, setCart] = useState([]);

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

  const handleSearch = (value) => {};

  const removeItemFromCart = (bookId) => {};

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col gap-16">
      <Header
        handleSearch={(value) => handleSearch(value)}
        onRemoveItem={(bookId) => removeItemFromCart(bookId)}
        cart={cart}
      ></Header>
      <div className="flex-1">
        <BookList />
      </div>
      <Footer handleSearch={(value) => handleSearch(value)}></Footer>
    </div>
  );
}

export default App;
