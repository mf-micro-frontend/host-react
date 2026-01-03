/// <reference types="vite/client" />

declare module "bookList/App" {
  const App: React.ComponentType;
  export default App;
}

declare module "singleBook/App" {
  const App: React.ComponentType;
  export default App;
}

declare module "shared/Button" {
  import { ButtonHTMLAttributes } from "react";

  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary";
    children: React.ReactNode;
  }

  const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module "shared/Search" {
  interface SearchProps {
    onSearch: (query: string) => void;
  }

  const Search: React.FC<SearchProps>;
  export default Search;
}

declare module "shared/ErrorBoundary" {
  import { ReactNode, ErrorInfo } from "react";

  interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
  }

  const ErrorBoundary: React.ComponentType<ErrorBoundaryProps>;
  export default ErrorBoundary;
}

declare module "shared/ModuleFederationErrorBoundary" {
  import { ReactNode } from "react";

  interface ModuleFederationErrorBoundaryProps {
    children: ReactNode;
    moduleName?: string;
    fallback?: ReactNode;
  }

  const ModuleFederationErrorBoundary: React.ComponentType<ModuleFederationErrorBoundaryProps>;
  export default ModuleFederationErrorBoundary;
}
