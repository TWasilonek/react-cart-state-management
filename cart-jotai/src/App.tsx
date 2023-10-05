import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ProductsList } from "./products/ProductsList";
import { Cart } from "./cart/Cart";
import { Root } from "./ui/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <ProductsList />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
/*
 * The Provider and Store are not necessary
 * unless you want some initialization and different states for subtres
 * https://jotai.org/docs/core/store
 * https://jotai.org/docs/core/provider
 */

function App() {
  return (
    <React.StrictMode>
      {/* <Provider store={store}> */}
      <RouterProvider router={router} />
      {/* </Provider> */}
    </React.StrictMode>
  );
}

export default App;
