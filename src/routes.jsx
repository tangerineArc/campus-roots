import App from "./App.jsx";

import Connections from "./components/ConnectionsPage.jsx";
import MessagesPage from "./components/MessagesPage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";

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
    path: "/home",
    element: <HomePage />,
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
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];

export default routes;
