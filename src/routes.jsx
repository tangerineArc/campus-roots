import App from "./App.jsx";
import LoginPage from "./components/LoginPage.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import EmailVerification from "./components/EmailVerification.jsx";
import HomePageStudents from "./components/HomePageStudents.jsx";
import HomePageAlumni from "./components/HomePageAlumni.jsx";
const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup/:category",
    element: <SignupPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/EmailVerification",
    element: <EmailVerification />,
  },
  {
    path: "/HomePageStudents",
    element: <HomePageStudents />,
  },
  {
    path: "/HomePageAlumni",
    element: <HomePageAlumni />,
  },
  {
    path: "/ChangePassword",
    element: <ChangePassword />,
  }
];

export default routes;
