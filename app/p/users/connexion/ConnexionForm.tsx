// app/p/users/connexion/ConnexionForm.tsx
"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

type ConnexionActionType = (
  formData: FormData,
) => Promise<{ success?: boolean; message?: string; error?: string }>;

export default function ConnexionForm(
  { connexionAction }: { connexionAction: ConnexionActionType },
) {
  const router = useRouter();
  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [submitStatus, setSubmitStatus] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "L'email est invalide";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Formulaire soumis");
    setSubmitStatus("Validation en cours...");

    if (!validateForm()) {
      setSubmitStatus("Validation échouée");
      return;
    }

    setSubmitStatus("Envoi des données au serveur...");

    const formData = new FormData(); //new FormData(event.currentTarget)
    formData.set("email", email);
    formData.set("password", password);
    //
    connexionAction(formData)
      .then((result) => {
        console.log("Résultat de l'action:", result);
        if (result.error) {
          setSubmitStatus(`Erreur: ${result.error}`);
        } else {
          setSubmitStatus(`Succès: ${result.message}`);

          router.push("/my/list"); // Redirection vers la page de login
          router.refresh(); // Rafraîchit la page pour mettre à jour l'état de l'authentification
        }
      })
      .catch((error) => {
        setSubmitStatus(`Erreur inattendue: ${error}`);
        console.error("Erreur lors de la soumission:", error);
      });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Connexion
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              id="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Se connecter
            </button>

            {submitStatus && <p>{submitStatus}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
