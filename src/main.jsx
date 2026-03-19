import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { CartProvider } from "./context/CartContext";

import App from "./App";
import LandingPage from "./pages/LandingPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import MakeupPage from "./components/MakeupPage";
import MakeupDetailsWrapper from "./components/MakeupDetailsWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/product/:slug",
        element: <ProductDetailsPage />,
      },
      {
        path: "/makeup",
        element: <MakeupPage />,
      },
      {
  path: "makeup/:slug",
  element: <MakeupDetailsWrapper /> 
}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
);