import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import { SnackBarProvider } from "./contexts/SnackBarContext.jsx";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

const rootElement = document.getElementById("root");
let root = rootElement._reactRootContainer;
if (!root) {
  root = ReactDOM.createRoot(rootElement);
}

root.render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <SnackBarProvider>
        <App />
      </SnackBarProvider>
    </UserContextProvider>
   
  </QueryClientProvider>
);
