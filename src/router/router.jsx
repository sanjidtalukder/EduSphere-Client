import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Home/Login";
import Register from "../pages/Home/Register";


import PostArticles from "../components/PostArticles";
import AboutUs from "../components/AboutUs";
import ArticlesByCategory from "../pages/ArticlesByCategory";
import NotFound from "../pages/NotFound";
import ArticleDetails from "../pages/ArticleDetails";
import FaqSection from "../components/FaqSection";
import ContactUs from "../components/ContactUs";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import AllArticels from "../components/AllArticels";
import MyArticles from "../components/MyArticels";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about-us", element:<PrivateRoute>
        <AboutUs />
      </PrivateRoute>  },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "all-articles", element: <AllArticels></AllArticels> },
      {
        path: "my-articles",
        element: (
          <PrivateRoute>
            <MyArticles></MyArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "post-articles",
        element: (
          <PrivateRoute>
            <PostArticles />
          </PrivateRoute>
        ),
      },
      { path: "articles/category/:category", element: <ArticlesByCategory /> },
      { path: "articles/:id", element: <ArticleDetails /> },
      { path: "faq-section", element: <FaqSection /> },
      { path: "contact-us", element:<PrivateRoute>
        <ContactUs />
      </PrivateRoute>  },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
