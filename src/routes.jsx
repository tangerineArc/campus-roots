import App from "./App.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import Connections from "./components/ConnectionsPage.jsx";
import EmailVerification from "./components/EmailVerification.jsx";
import HomePageAlumni from "./components/HomePageAlumni.jsx";
import HomePageStudents from "./components/HomePageStudents.jsx";

import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

import MessagesPage from "./components/MessagesPage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up/:category",
    element: <SignUpPage />,
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
  },
  {
    path: "/connections",
    element: <Connections />,
  },
  {
    path: "/messages",
    element: <MessagesPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
];

export default routes;
