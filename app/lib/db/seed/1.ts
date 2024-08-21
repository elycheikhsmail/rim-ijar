import type { Kysely } from "kysely";
import { Annonce,Database,  NewAnnonce } from "@/app/lib/db/index";
//import { DatabaseInterfaces } from "../types-v1";

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
    sub_categorie_id:Math.random() > 0.5 ? 1 : 2,
  });

  // Annonces auto
  annonces.push({
    user_id: Math.random() > 0.5 ? 1 : 2,
    description: descriptionsAuto[i % descriptionsAuto.length],
    lieu_str: "nouadhibou",
    price: Math.floor(Math.random() * 40000) + 4000,
    image_url: "/images/voiture.jpeg",
    categorie_id: 2,
    sub_categorie_id:Math.random() > 0.5 ? 1 : 2,
  });

  // Annonces engin
  annonces.push({
    user_id: Math.random() > 0.5 ? 1 : 2,
    description: descriptionsEngin[i % descriptionsEngin.length],
    lieu_str: "ross",
    price: Math.floor(Math.random() * 60000) + 7000,
    image_url: "/images/tracteur.jpeg",
    categorie_id: 3,
    sub_categorie_id:Math.random() > 0.5 ? 1 : 2,
  });
}

export async function seed(db: Kysely<Database>): Promise<void> {
  // seed code goes here...
  // note: this function is mandatory. you must implement this function.
  await db.insertInto("users").values([
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
    // categories principale
    await  db.insertInto("categories").values([
    //location
    { "name": "immobilier-location", "is_location": true, "is_service": false, "is_vente": false }, //1
  { "name": "véhicule-location", "is_location": true, "is_service": false, "is_vente": false },//1
  // vente
  { "name": "immobilier-vente", "is_location": false, "is_service": false, "is_vente": true },//3
  { "name": "véhicule-vente", "is_location": false, "is_service": false, "is_vente": true },//4
  // services
  { "name": "électricité", "is_location": false, "is_service": true, "is_vente": false } //5

  ])
    .execute();
    // vente imoobilier
    await  db.insertInto("sub_categories")
    .values( 
      [
        {
            "name": "maison",
            "categorie_id": 1
        },
        {
            "name": "appartement",
            "categorie_id": 1
        },
        {
            "name": "bureau/commerce",
            "categorie_id": 1
        },
        {
            "name": "terrain",
            "categorie_id": 1
        },
        {
            "name": "autre",
            "categorie_id": 1
        }
    ]
    
    )
    .execute()
    // vente vehicule
    await  db.insertInto("sub_categories").values(
      [
        {
            "name": "voiture",
            "categorie_id": 2
        },
        {
            "name": "moto",
            "categorie_id": 2
        },
        {
            "name": "bus,camion,caravanne",
            "categorie_id": 2
        },
        {
            "name": "Engins de construction et agricoles",
            "categorie_id": 2
        },
        {
            "name": "scooter",
            "categorie_id": 2
        },
        {
            "name": "autre",
            "categorie_id": 2
        }
    ]
    )
    .execute()
    // location immobillier
    await  db.insertInto("sub_categories")
    .values( 
      [
        {
          "name": "maison",
          "categorie_id": 3
      },
      {
          "name": "appartement",
          "categorie_id": 3
      },
      {
          "name": "bureau/commerce",
          "categorie_id": 3
      },
      {
          "name": "terrain",
          "categorie_id": 3
      },
      {
          "name": "autre",
          "categorie_id": 3
      }
      ])
      .execute()
      // location vehicule
    await  db.insertInto("sub_categories").values(
      [
        {
            "name": "voiture",
            "categorie_id": 4
        },
        {
            "name": "moto",
            "categorie_id": 4
        },
        {
            "name": "bus,camion,caravanne",
            "categorie_id": 4
        },
        {
            "name": "Engins de construction et agricoles",
            "categorie_id": 4
        },
        {
            "name": "scooter",
            "categorie_id": 4
        },
        {
            "name": "autre",
            "categorie_id": 4
        }
    ]
    )
    .execute()
    // services 
    await  db.insertInto("sub_categories").values(
      [
        {
            "name": "electricite",
            "categorie_id": 5
        },
        {
            "name": "plomberie",
            "categorie_id": 5
        },
        {
            "name": "enseignant",
            "categorie_id": 2
        },
        {
            "name": "autre",
            "categorie_id": 2
        },
        
    ]
    )
    .execute()



    

  //insert annoces
  await db.insertInto("annonces").values(annonces).execute();
}
