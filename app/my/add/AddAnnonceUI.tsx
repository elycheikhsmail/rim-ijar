"use client";
import React, { useState } from "react";
import { Category, AnnonceType, SubCategory, categories, subCategories } from './data';
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type AddAnnonceActionType = (
  formData: FormData,
) => Promise<{ success?: boolean; message?: string; error?: string }>;

import React, { useState } from "react";
import { Category, AnnonceType, SubCategory, categories, subCategories } from './data';
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type AddAnnonceActionType = (
  formData: FormData,
) => Promise<{ success?: boolean; message?: string; error?: string }>;

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
});

function AddAnnonceUI(
  { addAnnonceAction }: { addAnnonceAction: AddAnnonceActionType }
) {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<AnnonceType | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
  const [description, setDescription] = useState("maison jolie contenant 4 chambres");
  const [price, setPrice] = useState("5000");
  const [categorie, setcategorie] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

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
    }
  };

  const LocationPicker = () => {
    const map = useMapEvents({
      click: (e) => {
        setSelectedLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return selectedLocation ? (
      <Marker 
        position={[selectedLocation.lat, selectedLocation.lng]}
        icon={L.icon({
          iconUrl: '/images/marker-icon.png',
          iconRetinaUrl: '/images/marker-icon-2x.png',
          shadowUrl: '/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    ) : null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const categorie_id = 1;
    console.log({ description, price, categorie, categorie_id, selectedLocation });

    const formData = new FormData();
    formData.set("description", description);
    formData.set("price", `${price}`);
    formData.set("categorie_id", `${categorie_id}`);
    formData.set("lieu_str", "noukachott");
    formData.set("image_url", "/images/maison.jpeg");
    if (selectedLocation) {
      formData.set("latitude", `${selectedLocation.lat}`);
      formData.set("longitude", `${selectedLocation.lng}`);
    }

    try {
      const result = await addAnnonceAction(formData);
      console.log("Résultat de l'action:", result);
      if (result.error) {
        setSubmitStatus(`Erreur: ${result.error}`);
      } else {
        setSubmitStatus(`Succès: ${result.message}`);
        router.push("/my/list");
        router.refresh();
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          Bienvenue, Sidi !
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
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
          {/* ... (rest of the form fields remain unchanged) ... */}

          <div className="mb-6 relative">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
              Emplacement
            </label>
            <div className="h-64">
              <MapWithNoSSR selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              id="submit"
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ClipLoader
                  color="#ffffff"
                  size={20}
                  className="fade-in"
                />
              ) : (
                "Ajouter l'annonce"
              )}
            </button>
            {submitStatus && <p className="mt-4 text-center text-sm text-gray-600">{submitStatus}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}

const styles = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
`;

export default function AddAnnonceUIWithStyles({ addAnnonceAction }: { addAnnonceAction: AddAnnonceActionType }) {
  return (
    <>
      <style jsx>{styles}</style>
      <AddAnnonceUI addAnnonceAction={addAnnonceAction} />
    </>
  );
}
