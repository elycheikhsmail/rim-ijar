 
import { z } from "zod";
const annonceSchema = z.object({
    categorie_id: z.string().transform((v) => parseInt(v)),  
    description: z.string(),
    lieu_str: z.string(),
    image_url: z.string(),
    price: z.string().transform((v) => parseInt(v))  
  });


export default   annonceSchema
  