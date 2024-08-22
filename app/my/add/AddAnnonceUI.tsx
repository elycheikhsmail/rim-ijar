"use client";
import React, { useState } from "react";
import { AnnonceType, Category, SubCategory, categories, subCategories } from './data';
import { useRouter } from "next/navigation";
//import { AnnonceType } from "@/app/lib/db";

type AddAnnonceActionType = (
  formData: FormData,
) => Promise<{ success?: boolean; message?: string; error?: string }>;



export default function AddAnnonceUI(
  { addAnnonceAction }: { addAnnonceAction: AddAnnonceActionType }
) {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<AnnonceType | ''>('');

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>();

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);

  const [description, setDescription] = useState(
    "maison jolie contenant 4 chambres",
  );
  const [price, setPrice] = useState("5000"); 
  const [submitStatus, setSubmitStatus] = useState("");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as AnnonceType;
    setSelectedType(type);
    setSelectedCategory('');
    setFilteredCategories(categories.filter(category => category.type === type));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
    const category = categories.find(category => category.name === categoryName);
    if (category) {
      setFilteredSubCategories(subCategories.filter(sub => sub.categorie_id === category.id));
      setSelectedCategoryId(category.id)
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCategoryName = e.target.value; 

    setSelectedSubCategory(subCategoryName);
    const subCategory = subCategories.find(subcategory => subcategory.name === subCategoryName);
    console.log({subCategory})
    if (subCategory) { 
      setSelectedSubCategoryId(subCategory.id)
      console.log({selectedSubCategoryId})
    }
  
  };





  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 
    // Ici, vous ajouteriez la logique pour envoyer les données à votre API
    console.log({ description, price, selectedType ,selectedCategory ,selectedCategoryId ,selectedSubCategory,selectedSubCategoryId});
    /*    
  image_url: z.string(),
  price: z.number(), // then number
    */
    const formData = new FormData();
    formData.set("description", description);
    formData.set("price", `${price}`);


    formData.set("type", `${selectedType}`);
    formData.set("categorie_id", `${selectedCategoryId}`);
    formData.set("sub_categorie_id", `${selectedSubCategoryId}`);

    formData.set("lieu_str", "noukachott");
    formData.set("image_url", "/images/maison.jpeg");
    // user_id sera recuper cote serveur
    console.log(formData.get("description"))
    //soumetre le formulaire vers le serveur 
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
            <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type d'annonce:</label>
            <select
              id="type"
              value={selectedType}
              onChange={handleTypeChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="">Sélectionnez un type</option>
              <option value={AnnonceType.Location}>Location</option>
              <option value={AnnonceType.Vente}>Vente</option>
              <option value={AnnonceType.Service}>Service</option>
              <option value={AnnonceType.Autre}>Autre</option>
            </select>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Catégorie:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              disabled={!selectedType}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="">Sélectionnez une catégorie</option>
              {filteredCategories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>


          <div className="mb-6 relative">
            <label htmlFor="subCategory" className="block text-gray-700 text-sm font-bold mb-2">Sous-catégorie:</label>
            <select
              id="subCategory"

              value={selectedSubCategory}
              onChange={handleSubCategoryChange} 
              disabled={!selectedCategory}

              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="">Sélectionnez une sous-catégorie</option>
              {filteredSubCategories.map(subCategory => (
                <option key={subCategory.id} value={subCategory.name}>{subCategory.name}</option>
              ))}
            </select>
          </div>



          <div className="mb-6 relative">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <div className="flex items-start">
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
