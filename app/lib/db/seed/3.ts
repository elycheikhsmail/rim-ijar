import type { Kysely } from "kysely";
import { Database, NewCommunAnnonce, NewLocationAnnonce, AnnonceType } from "@/app/lib/db/index";
import { mycategories } from "./data-v2/v2/categories"
import {
    subCategorieServices,
    subCategorieVenteVehicule,
    subCategorielocationVehicule,
    subCategoriesVenteImmobilier,
    subcategorieLocationImmobilier

} from "./data-v2/v2/sub-categories";

// location 
import locationList from "./data/location/list.json"
import location_subcategorie_1 from "./data/location/1/list.json"
import location_subcategorie_2 from "./data/location/2/list.json"
// vente
import venteList from "./data/vente/list.json"
import vente_subcategorie_1 from "./data/vente/1/list.json"
import vente_subcategorie_2 from "./data/vente/2/list.json"


export async function seed(db: Kysely<Database>): Promise<void> {
    // new categorie version
    // location categorie
    await db.insertInto("location_categorie")
        .values(locationList.map((category) => ({
            name: category
        }))).executeTakeFirstOrThrow()
    //
    await db.insertInto("location_sub_categorie")
        .values(location_subcategorie_1.map((category) => ({
            location_categorie_id: 1,
            name: category
        }))).executeTakeFirstOrThrow()
    //
    await db.insertInto("location_sub_categorie")
        .values(location_subcategorie_2.map((category) => ({
            location_categorie_id: 2,
            name: category
        }))).execute()
    // vente categorie
    await db.insertInto("vente_categorie")
        .values(venteList.map((category) => ({
            name: category
        }))).executeTakeFirstOrThrow()
    //
    await db.insertInto("vente_sub_categorie")
        .values(vente_subcategorie_1.map((category) => ({
            vente_categorie_id: 1,
            name: category
        }))).executeTakeFirstOrThrow()
    //
    await db.insertInto("vente_sub_categorie")
        .values(vente_subcategorie_2.map((category) => ({
            vente_categorie_id: 2,
            name: category
        }))).execute()
    // annonce
    const myLocationAnnonce: NewLocationAnnonce = {
        "categorie_id": 1, // 1 = 0+1
        "categorie_name": locationList[0], // 0 = 1-1
        //"vente",
        "sub_categorie_id": 1,
        "sub_categorie_name": location_subcategorie_1[0],
        //"",

        "description": "test",
        "lieu_name": "noukchott/teyarette",
        "price": 5000,
    }
    // les deux insertions doive se realise en ensemble ou echoue
    await db.insertInto("location_annonces").values(myLocationAnnonce).executeTakeFirstOrThrow()
    const locationAnnonceInDB = await db.selectFrom("location_annonces")
        .selectAll()
        .executeTakeFirstOrThrow()
    console.log("locationAnnonceInDB")
    console.log(locationAnnonceInDB)


    const myCommunAnonce: NewCommunAnnonce = {
        "annonce_type": AnnonceType.Location,
        "categorie_name": locationAnnonceInDB.categorie_name,
        "description": locationAnnonceInDB.description,
        "lieu_name": locationAnnonceInDB.lieu_name,
        "price": locationAnnonceInDB.price,
        "subCategorie_name": myLocationAnnonce.sub_categorie_name,
        "parent_id": locationAnnonceInDB.id

    }

    await db.insertInto("commun_annonces")
        .values(myCommunAnonce)
        .executeTakeFirstOrThrow()


    //
    // categories principale
    await db.insertInto("categories").values(mycategories).executeTakeFirstOrThrow()
    // vente imoobilier
    await db.insertInto("sub_categories").values(subCategoriesVenteImmobilier).executeTakeFirstOrThrow()
    // vente vehicule
    await db.insertInto("sub_categories").values(subCategorieVenteVehicule).executeTakeFirstOrThrow()
    // location immobillier
    await db.insertInto("sub_categories").values(subcategorieLocationImmobilier).executeTakeFirstOrThrow()
    // location vehicule
    await db.insertInto("sub_categories").values(subCategorielocationVehicule).executeTakeFirstOrThrow()
    // services 
    await db.insertInto("sub_categories").values(subCategorieServices).executeTakeFirstOrThrow()
    //  

    //

    const d = await db.selectFrom("commun_annonces").selectAll().executeTakeFirstOrThrow()
    console.log(d)



}
