"use client";
import React, { useState } from "react";
import {
  FaAlignLeft,
  FaBicycle,
  FaCarSide,
  FaEllipsisH,
  FaEuroSign,
  FaMotorcycle,
  FaPen,
} from "react-icons/fa";

import { useRouter } from "next/navigation";

type AddAnnonceActionType = (
  formData: FormData,
) => Promise<{ success?: boolean; message?: string; error?: string }>;

 

export default function AddAnnonceUI(
  { addAnnonceAction }: { addAnnonceAction: AddAnnonceActionType }
) {
  const router = useRouter(); 

  

  const [description, setDescription] = useState(
    "maison jolie contenant 4 chambres",
  );
  const [price, setPrice] = useState("5000");
  const [categorie, setcategorie] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // reconnaitre l'id du categorie depuis son nom
    const categoriesListDict = [
      {
        id: 1,
        name: "Voiture",
        icon: <FaMotorcycle className="absolute left-3 text-gray-500" />,
      },
      {
        id: 2,
        name: "Moto",
        icon: <FaMotorcycle className="absolute left-3 text-gray-500" />,
      },
      {
        id: 3,
        name: "Voiture",
        icon: <FaMotorcycle className="absolute left-3 text-gray-500" />,
      },
      {
        id: 4,
        name: "Vélo",
        icon: <FaBicycle className="absolute left-3 text-gray-500" />,
      },
      {
        id: 4,
        name: "Autre",
        icon: <FaEllipsisH className="absolute left-3 text-gray-500" />,
      },
    ];
    let categorie_id = -1;
    const currentCategorieAsObject = categoriesListDict.find((v) =>
      v.name == categorie
    );
    if (currentCategorieAsObject) {
      categorie_id = currentCategorieAsObject.id;
    }
    // Ici, vous ajouteriez la logique pour envoyer les données à votre API
    console.log({ description, price, categorie, categorie_id});
    /*    
  image_url: z.string(),
  price: z.number(), // then number
    */
    const formData = new FormData();
    formData.set("description", description);
    formData.set("price", `${price}`);
    formData.set("categorie_id", `${categorie_id}`); 
    formData.set("lieu_str", "noukachott");
    formData.set("image_url", "/images/maison.jpeg");
    // user_id sera recuper cote serveur
    console.log(formData.get("description"))
    // soumetre le formulaire vers le serveur 
    addAnnonceAction(formData)
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
        //setSubmitStatus(`Erreur inattendue: ${error}`);
        console.error("Erreur lors de la soumission:", error);
      });


  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-4 text-center text-gray-800">
          Bienvenue, Sidi !
        </h1>
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-700">
          Ajouter une annonce
        </h2>
        <p className="text-center mb-8 text-gray-600 italic">
          Les données ne sont pas encore stockées dans la base de données
          mocked.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8"
        >
          <div className="mb-6 relative">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <div className="flex items-start">
              <FaAlignLeft className="absolute left-3 top-3 text-gray-500" />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow-sm border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                rows={4}
                required
              >
              </textarea>
            </div>
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="prix"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Prix par jour (€)
            </label>
            <div className="flex items-center">
              <FaEuroSign className="absolute left-3 text-gray-500" />
              <input
                type="number"
                id="prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow-sm border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="mb-8 relative">
            <label
              htmlFor="categorie"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              categorie
            </label>
            <div className="flex items-center">
              {categorie === "Voiture" && (
                <FaCarSide className="absolute left-3 text-gray-500" />
              )}
              {categorie === "Moto" && (
                <FaMotorcycle className="absolute left-3 text-gray-500" />
              )}
              {categorie === "Vélo" && (
                <FaBicycle className="absolute left-3 text-gray-500" />
              )}
              {(categorie === "Autre" || categorie === "") && (
                <FaEllipsisH className="absolute left-3 text-gray-500" />
              )}
              <select
                id="categorie"
                value={categorie}
                onChange={(e) => setcategorie(e.target.value)}
                className="shadow-sm border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                required
              >
                <option value="">Sélectionnez un categorie</option>
                <option value="Voiture">Voiture</option>
                <option value="Moto">Moto</option>
                <option value="Vélo">Vélo</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              id="submit"
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
            >
              Ajouter l'annonce
            </button>
            {submitStatus && <p>{submitStatus}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
