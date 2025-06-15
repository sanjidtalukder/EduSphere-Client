import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Home/Login";
import Register from "../pages/Home/Register";
import AllArticels from "../components/AllArticels";
import MyArticels from "../components/MyArticels";
import PostArticles from "../components/PostArticles";
import AboutUs from "../components/AboutUs";
import ArticlesByCategory from "../pages/ArticlesByCategory";
import NotFound from "../pages/NotFound";
import ArticleDetails from "../pages/ArticleDetails";
import FaqSection from "../components/FaqSection";
import ContactUs from "../components/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "all-articles",
        element: <AllArticels />,
      },
      {
        path: "my-articles",
        element: <MyArticels />,
      },
      {
        path: "post-articles",
        element: <PostArticles />,
      },
      {
        path: "articles/category/:category",
        element: <ArticlesByCategory />,
      },
      {
        path: "articles/:id",
        element: <ArticleDetails />,
      },
      {
        path: "feqSection",
        element: <FaqSection />,
      },
      {
        path: "contactUs",
        element: <ContactUs />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
