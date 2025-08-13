// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import BedsTable from "./pages/BedsTable";
import Cases from "./pages/Cases";
import Doctors from "./pages/Doctors";
import NursesTable from "./pages/NursesTable";
import Patients from "./pages/Patients";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <SignIn />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <SignUp />
      </div>
    ),
  },
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <div className="text-center">Page not found</div>,
    children: [
      { path: "", element: <Home /> },
      { path: "/cases", element: <Cases /> },
      { path: "/nurses", element: <NursesTable /> },
      { path: "/beds", element: <BedsTable /> },
      { path: "/doctors", element: <Doctors /> },
      { path: "/patients", element: <Patients /> },
      {path: "/analytics", element: <Analytics />},
    ],
  },
]);


function App() {
  return (
      <main>
        <RouterProvider router={router} />
      </main>
  );
}

export default App;
