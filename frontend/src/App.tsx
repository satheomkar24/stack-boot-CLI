import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SpinnerContextProvider } from "./context/provider/SpinnerContextProvider";
import { Spinner } from "./components/reusables/Spinner";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <SpinnerContextProvider>
          <RouterProvider router={routes} />
          <Spinner />
        </SpinnerContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
