import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useRouteError,
} from "react-router-dom";
import Layout from "./hoc/Layout";
import QuestionsPage, { loader } from "./pages/Questions";

function ErrorBoundary() {
  const error = useRouteError();
  // Uncaught ReferenceError: path is not defined
  return (
    <div>
      <h1>Error Conponent</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}

export const createRoutes = () => (
  <Route path="/" element={<Layout />}>
    <Route
      path="questions"
      element={<QuestionsPage />}
      errorElement={<ErrorBoundary />}
      loader={loader}
    />
  </Route>
);


export const router = createBrowserRouter(
  createRoutesFromElements(createRoutes())
);

