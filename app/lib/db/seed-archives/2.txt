import type { Kysely } from "kysely";
import { Annonce, DatabaseInterfaces, NewAnnonce } from "@/app/lib/db/index";

const annonces: NewAnnonce[] = [];

const descriptionsImmobilier = [
  "Appartement à louer",
  "Maison spacieuse à vendre",
  "Studio à louer",
  "Villa moderne en location",
  "Chalet de montagne à vendre",
];

const descriptionsAuto = [
  "Voiture à louer",
  "SUV en location",
  "Voiture économique à vendre",
  "Camion à louer",
  "Minibus en location",
];

const descriptionsEngin = [
  "Tracteur à louer",
  "Bulldozer en location",
  "Grue à louer",
  "Pelle mécanique à vendre",
  "Chariot élévateur en location",
];

for (let i = 0; i < 15; i++) {
  // Annonces immobilières
  annonces.push({
    user_id: Math.random() > 0.5 ? 1 : 2,
    description: descriptionsImmobilier[i % descriptionsImmobilier.length],
    lieu_str: "nouakchott",
    price: Math.floor(Math.random() * 50000) + 5000,
    image_url: "/images/maison.jpeg",
    categorie_id: 1,
  });

  // Annonces auto
  annonces.push({
    user_id: Math.random() > 0.5 ? 1 : 2,
    description: descriptionsAuto[i % descriptionsAuto.length],
    lieu_str: "nouadhibou",
    price: Math.floor(Math.random() * 40000) + 4000,
    image_url: "/images/voiture.jpeg",
    categorie_id: 2,
  });

  // Annonces engin
  annonces.push({
    user_id: Math.random() > 0.5 ? 1 : 2,
    description: descriptionsEngin[i % descriptionsEngin.length],
    lieu_str: "ross",
    price: Math.floor(Math.random() * 60000) + 7000,
    image_url: "/images/tracteur.jpeg",
    categorie_id: 3,
  });
}

export async function seed(db: Kysely<DatabaseInterfaces>): Promise<void> {
  // seed code goes here...
  // note: this function is mandatory. you must implement this function.
  db.insertInto("users").values([
    {
      email: "ely@gmail.com",
      password: "1234er",
    },

    {
      email: "sidi@gmail.com",
      password: "1234er",
    },

    {
      email: "ghalya@gmail.com",
      password: "1234er",
    },
  ])
    .executeTakeFirstOrThrow();
  db.insertInto("categories").values([
    { name: "immobilier" },
    { name: "auto" },
    { name: "engin" },
  ])
    .execute();

  //insert annoces
  await db.insertInto("annonces").values(annonces).execute();
}
