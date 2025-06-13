import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Home/Login";
import Register from "../pages/Home/Register";
import Footer from "../components/Footer";
import AllArticels from "../components/AllArticels";
import MyArticels from "../components/MyArticels";
import PostArticles from "../components/PostArticles";
import AboutUs from "../components/AboutUs";
import ArticlesByCategory from "../pages/ArticlesByCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        path: "aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "",
        element: <Home />,
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
        path: "AllArticles",
        element: <AllArticels></AllArticels>,
      },
       {
        path: "my-articles",
        element: <MyArticels></MyArticels>,
      },
       {
        path: "post-articles",
        element: <PostArticles></PostArticles>,
      },
      {
        path:"/articles/category/:category",
        element: <ArticlesByCategory></ArticlesByCategory>,
      },
      {
        path: "footer",
        element: <Footer></Footer>,
      },
      
    ],
  },
]);

export default router;
