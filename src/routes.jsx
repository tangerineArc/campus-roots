import App from "./App.jsx";

import LoginPage from "./components/LoginPage.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";
import SignupPage from "./components/SignupPage.jsx";

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
];

export default routes;
