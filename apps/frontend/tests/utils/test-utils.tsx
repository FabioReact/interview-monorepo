import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";
import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
  useRouteError,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { isValidElement } from "react";

afterEach(() => {
  cleanup();
});

function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      <h1>Error Conponent</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}

export function renderWithRouter(
  children: React.ReactElement | RouteObject,
  options?: {
    routes?: any;
    loader?: any;
  }
) {
  const user = userEvent.setup()
  const mainRoute = isValidElement(children)
    ? {
        path: '/',
        element: children,
        loader: options?.loader,
        errorElement: <ErrorBoundary />
      }
    : (children as RouteObject);

  const routes = [{ ...mainRoute }, ...(options?.routes || [])];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", mainRoute.path!],
    initialIndex: 1,
  });

  return {
    ...render(<RouterProvider router={router} />),
    user,
  };
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { renderWithRouter as render };
