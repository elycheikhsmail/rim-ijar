import type { Kysely } from "kysely";
import { AnnonceType, Database} from "@/app/lib/db/index";
//import { DatabaseInterfaces } from "../types-v1";



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
    { "name": "immobilier", type:AnnonceType.Location   }, //1
  { "name": "véhicule",  type:AnnonceType.Location  },//1
  // vente
  { "name": "immobilier", type:AnnonceType.Vente},//3
  { "name": "véhicule", type:AnnonceType.Vente },//4
  // services
  { "name": "électricité", type:AnnonceType.Service} //5

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

const categories = await db.selectFrom("categories").selectAll().execute()
console.log("categories"); console.log(categories)

const subcategories = await db.selectFrom("sub_categories").selectAll().execute()
console.log("sub_categories"); console.log(subcategories)






     
}
