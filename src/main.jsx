import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.jsx";

import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import ShareTip from "./pages/ShareTip.jsx";
import TipDetails from "./pages/TipDetails.jsx";
import UpdateTip from "./pages/UpdateTip.jsx";
import Root from "./layout/Root.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import PrivateRoute from "./Routes/PrivateRoutes.jsx";
import Home from "./pages/Home.jsx";
import BrowseTips from "./pages/BrowseTips.jsx";
import ExploreGardener from "./pages/ExploreGardener.jsx";
import MyTips from "./pages/MyTips.jsx";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/browse_tip", element: <BrowseTips /> },
      { path: "/explore_gardeners", element: <ExploreGardener /> },
      {
        path: "/gardening-tips",
        element: (
          <PrivateRoute>
            <ShareTip />
          </PrivateRoute>
        ),
      },
      {
        path: "/tipDetails/:id",
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
      {
        path: "/my-tips",
       loader: () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return fetch(`http://localhost:3000/my-tips?email=${user?.email}`);
}
,
        element: (
          <PrivateRoute>
            <MyTips />
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
