export interface Annonce {
  id: number;
  type: string;
  //"maison" | "voiture" | "engin";
  titre: string;
  description: string;
  prix: number;
  imageUrl: string;
}
