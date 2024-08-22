
import { AnnonceType } from "@/app/lib/db";
import { z } from "zod"; 

const annonceSchema = z.object({
  type: z.enum([AnnonceType.Vente, AnnonceType.Location, AnnonceType.Service, AnnonceType.Autre]),
  categorie_id: z.string().transform((v) => parseInt(v)),
  sub_categorie_id: z.string().transform((v) => parseInt(v)),
  description: z.string(),
  lieu_str: z.string(),
  image_url: z.string(),
  price: z.string().transform((v) => parseInt(v))
});


export default annonceSchema
