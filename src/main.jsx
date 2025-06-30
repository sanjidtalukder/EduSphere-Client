import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import router from './router/Router.jsx';
import router from './router/Router.jsx';
 
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import { Toaster } from 'react-hot-toast';



const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);
