import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import React, { useEffect, Suspense } from "react";
import { useGlobalContext } from "./context/GlobalContext";

const ModuleFederationErrorBoundary = React.lazy(() =>
  import("shared/ModuleFederationErrorBoundary")
);
const BookList = React.lazy(() => import("bookList/App"));
const SingleBook = React.lazy(() => import("singleBook/App"));

function App() {
  const { cart, setCart, setSearchText } = useGlobalContext();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleSearch = (value: string): void => {
    setSearchText(value);
  };

  const removeItemFromCart = (bookId: string): void => {
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
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="text-gray-600">Loading microfrontends...</div>
          </div>
        }
      >
        <ModuleFederationErrorBoundary moduleName="SingleBook">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-4">
                <div className="text-gray-500">Loading book details...</div>
              </div>
            }
          >
            <div className="flex-1 mt-4">
              <SingleBook />
            </div>
          </Suspense>
        </ModuleFederationErrorBoundary>

        <ModuleFederationErrorBoundary moduleName="BookList">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-4">
                <div className="text-gray-500">Loading book list...</div>
              </div>
            }
          >
            <div className="flex-1 mt-8 mb-4">
              <BookList />
            </div>
          </Suspense>
        </ModuleFederationErrorBoundary>
      </Suspense>
      <Footer handleSearch={(value) => handleSearch(value)} />
    </div>
  );
}

export default App;
