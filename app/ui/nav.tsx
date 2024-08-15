"use client";

import React from "react";
import Link from "next/link";
import {
  FaHome,
  FaList,
  FaPlus,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", { method: "POST" });
    if (response.ok) {
      router.push("/p/users/connexion"); // Redirection vers la page de login
      router.refresh(); // Rafraîchit la page pour mettre à jour l'état de l'authentification
    }
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="left">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-yellow-300 transition duration-300"
        >
          <FaHome className="inline-block mr-2" />
          Rim Ijar
        </Link>
      </div>
      <div className="right flex space-x-6">
        <Link
          href="/my/list"
          className="flex items-center hover:bg-blue-600 px-3 py-2 rounded transition duration-300"
        >
          <FaList className="mr-2" />
          Mes annonces
        </Link>
        <Link
          href="/my/add"
          className="flex items-center hover:bg-blue-600 px-3 py-2 rounded transition duration-300"
        >
          <FaPlus className="mr-2" />
          Ajouter une annonce
        </Link>
        <Link
          href="/p/users/connexion"
          className="flex items-center hover:bg-green-500 px-3 py-2 rounded transition duration-300"
        >
          <FaSignInAlt className="mr-2" />
          Connexion
        </Link>
        <Link
          href="/p/users/register"
          className="flex items-center hover:bg-purple-500 px-3 py-2 rounded transition duration-300"
        >
          <FaUserPlus className="mr-2" />
          S'inscrire
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center hover:bg-purple-500 px-3 py-2 rounded transition duration-300"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Nav;
