import { Suspense } from "react";
import { router } from "./Routes";
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
