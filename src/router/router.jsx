import { createBrowserRouter } from "react-router-dom";
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
import AllArticels from "../components/AllArticels";
import MyArticles from "../components/MyArticels";
import PrivateRoute from "./PrivateRoute"; 
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
// import ManageUsers from "../pages/Dashboard/ManageUsers";
import Settings from "../pages/Dashboard/Settings";
import ManageUsers from "../pages/Dashboard/ManagUser";
import MyArticel from "../pages/Dashboard/MyArticel";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "about-us",
        element: (
          <PrivateRoute>
            <AboutUs />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "all-articles", element: <AllArticels /> },
      {
        path: "my-articles",
        element: (
          <PrivateRoute>
            <MyArticles />
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
      {
        path: "contact-us",
        element: (
          <PrivateRoute>
            <ContactUs />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    { path: "", element: <DashboardHome /> },
    { path: "manage-users", element: <ManageUsers /> },
    { path: "settings", element: <Settings /> },
    { path: "my-articles", element: <MyArticel /> },
  ],
},

]);

export default router;
