import { registerAction } from "./actions";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return <RegisterForm connexionAction={registerAction} />;
}
