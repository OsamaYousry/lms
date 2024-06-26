import {LMSToolbar} from "./components/toolbar/toolbar";
import {RouterProvider} from "react-router-dom";
import {MainRouter} from "./main-router";
import {Box} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export function App() {

  const queryClient = new QueryClient();
  const router = MainRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <LMSToolbar/>
      <Box component="main" sx={{p: 3}}>
        <RouterProvider router={router}/>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
