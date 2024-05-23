import {LMSToolbar} from "./components/toolbar/toolbar";
import {RouterProvider} from "react-router-dom";
import {MainRouter} from "./main-router";
import {Box} from "@mui/material";

export function App() {
  const router = MainRouter();
  return (
    <>
      <LMSToolbar />
      <Box component="main" sx={{ p: 3}}>
      <RouterProvider router={router} />
      </Box>
    </>
  );
}

export default App;
