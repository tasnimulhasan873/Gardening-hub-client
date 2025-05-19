import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.jsx";

import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Footer from "./components/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";
import ShareTip from "./pages/ShareTip.jsx";
import TipDetails from "./pages/TipDetails.jsx";
import UpdateTip from "./pages/UpdateTip.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/footer", element: <Footer /> },
      {
        path: "/shareTip",
        element: (
          <PrivateRoute>
            <ShareTip />
          </PrivateRoute>
        ),
      },
      {
        path: "tipDetails",
        element: (
          <PrivateRoute>
            <TipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateTip",
        element: (
          <PrivateRoute>
            <UpdateTip />
          </PrivateRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
