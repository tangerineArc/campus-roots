import { useParams } from "react-router-dom";

import AlumnusSignUp from "./AlumnusSignUp.jsx";
import StudentSignup from "./StudentSignUp.jsx";

export default function SignupPage() {
  const { category } = useParams();

  if (category === "student") return <StudentSignup />;

  if (category === "alumnus") return <AlumnusSignUp />;
}
