import { connexionAction } from "./actions";
import ConnexionForm from "./ConnexionForm";

export default function ConnexionPage() {
  return <ConnexionForm connexionAction={connexionAction} />;
}
