import { useState } from "react";
import AlumnusSignUp from "./components/AlumnusSignUp";
// import EmailVerification from "./components/EmailVerification.jsx";
import LoginPage from "./components/LoginPage.jsx";
import ResetPassword from "./components/ResetPage.jsx";
import StudentSignUp from "./components/StudentSignUp.jsx";

export default function App() {
  let [toShow, setToShow] = useState(<LoginPage handleOnClick={handleOnClick}></LoginPage>);
  function handleOnClick(event, value) {
    if (value === "Login Page") setToShow(<LoginPage handleOnClick={handleOnClick}></LoginPage>);
    else if (value === "Student Sign Up") setToShow(<StudentSignUp handleOnClick={handleOnClick}></StudentSignUp>);
    else if (value === "Alumni Sign Up") setToShow(<AlumnusSignUp handleOnClick={handleOnClick}></AlumnusSignUp>);
    else if (value === "Reset Password") setToShow(<ResetPassword handleOnClick={handleOnClick}></ResetPassword>);
  }

  return (
    <>
      {toShow}
    </>
  );
}

