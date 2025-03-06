import AlumnusSignUp from "./components/AlumnusSignUp";
import EmailVerification from "./components/EmailVerification.jsx";
import LoginPage from "./components/LoginPage.jsx";
import ResetPassword from "./components/ResetPage.jsx";
import StudentSignUp from "./components/StudentSignUp.jsx";

export default function App() {
  return (
    <>
      <LoginPage></LoginPage>
      <StudentSignUp />
      <AlumnusSignUp></AlumnusSignUp>
      <ResetPassword></ResetPassword>
      <EmailVerification></EmailVerification>
    </>
  );
}

