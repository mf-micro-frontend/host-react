import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  bookId: string;
  image: string;
  title: string;
  quantity: number;
  price?: number;
}

interface GlobalContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  selectedBook: string | null;
  setSelectedBook: React.Dispatch<React.SetStateAction<string | null>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  addToCart: (data: CartItem) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const addToCart = (data: CartItem): void => {
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

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
