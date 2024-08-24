import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  users: UserTable;
  sessions: SessionTable;
  categories: CategoryTable;
  sub_categories: SubCategoryTable;
  annonces: AnnonceTable;
  commun_annonces: CommunAnnonceTable;
  location_categorie: LocationCategorie;
  location_sub_categorie: LocationSubCategorie;
  location_annonces: LocationAnnonceTable;
  vente_categorie: VenteCategorie;
  vente_sub_categorie: VenteSubCategorie;
  vente_annonces: VenteAnnonce;
  service_categorie: ServiceCategorie;
  service_sub_categorie: ServiceSubCategorie;
  service_annonces: ServiceAnnonce;
}


export enum AnnonceType {
  Vente = 'vente',
  Location = 'location',
  Service = 'service',
  Autre = 'autre'
}


// Description des tables pour Kysely
export interface UserTable {
  id: Generated<number>;
  email: string;
  password: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface SessionTable {
  id: Generated<number>;
  user_id: number;
  token: string;
  is_exp: boolean;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;

export interface CommunAnnonceTable {
  //id: Generated<number>;

  id: Generated<number>;

  annonce_type: string;
  categorie_name: string;
  subCategorie_name: string;
  description: string;
  price: number;
  lieu_name: string;
  parent_id: number;

  date_ajout: ColumnType<Date, string | undefined, never>; 
}

export type CommunAnnonce = Selectable<CommunAnnonceTable>;
export type NewCommunAnnonce = Insertable<CommunAnnonceTable>;
export type CommunAnnonceUpdate = Updateable<CommunAnnonceTable>;

 

export interface LocationCategorie {
  id: Generated<number>;
  name: string;
}

export interface LocationSubCategorie {
  id: Generated<number>;
  name: string;
  location_categorie_id: number;
}

export interface LocationAnnonceTable {
  id: Generated<number>;
  categorie_id: number;
  categorie_name: string;

  sub_categorie_id: number;
  sub_categorie_name: string;

  description: string;
  price: number;  
  lieu_name: string;

  date_ajout:  ColumnType<Date, string | undefined, never>; 
}

export type LocationAnnonce = Selectable<LocationAnnonceTable>;
export type NewLocationAnnonce = Insertable<LocationAnnonceTable>;
export type LocationAnnonceUpdate = Updateable<LocationAnnonceTable>;


export interface VenteCategorie {
  id: Generated<number>;
  name: string;
}

export interface VenteSubCategorie {
  id: Generated<number>;
  name: string;
  vente_categorie_id: number;
}

export interface VenteAnnonce {

  id: Generated<number>;
  categorie_id: number;
  categorie_name: string;
  sub_categorie_id: number;
  sub_categorie_name: string;
  description: string;
  price: number;
  date_ajout:    ColumnType<Date, string | undefined, never>; 
  lieu_name: string;
}

export interface ServiceCategorie {

  id: Generated<number>;
  name: string;
}

export interface ServiceSubCategorie {

  id: Generated<number>;
  name: string;
  service_categorie_id: number;
}

export interface ServiceAnnonce {

  id: Generated<number>;
  categorie_id: number;
  categorie_name: string;
  sub_categorie_id: number;
  sub_categorie_name: string;
  description: string;
  price: number;
  date_ajout:    ColumnType<Date, string | undefined, never>; 
  lieu_name: string;
}

export interface CategoryTable {
  id: Generated<number>;
  type: AnnonceType;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Category = Selectable<CategoryTable>;
export type NewCategory = Insertable<CategoryTable>;
export type CategoryUpdate = Updateable<CategoryTable>;

export interface SubCategoryTable {
  id: Generated<number>;
  name: string;
  categorie_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type SubCategory = Selectable<SubCategoryTable>;
export type NewSubCategory = Insertable<SubCategoryTable>;
export type SubCategoryUpdate = Updateable<SubCategoryTable>;

export interface AnnonceTable {
  id: Generated<number>;
  type: AnnonceType;
  categorie_id: number;
  sub_categorie_id: number;
  options_object?: JSONColumnType<Record<string, any>>; // Ajustez selon la structure JSON spécifique
  user_id: number;
  description: string;
  price: number;
  lieu_str: string;
  lieu_object?: JSONColumnType<Record<string, any>>;
  //JSONColumnType<Record<string, any[]>>; // Ajustez selon la structure JSON spécifique
  // JSONColumnType<Record<string, any>[]>;
  image_url: string;
  image_object?: string;
  created_at: ColumnType<Date, string | undefined, never>;
}


interface AnnoncesVirtualUiTable {
  id: Generated<number>;
  categorie: string;
  user_id: number;
  description: string;
  lieu_str: string;
  image_url: string;
  price: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

interface AnnoncesVirtualUiDetailsTable {
  id: Generated<number>;
  categorie: string;
  user_id: number;
  categorie_id: number;
  sub_categorie_id: number;

  description: string;
  options_object?: JSONColumnType<Record<string, any>>; // Ajustez selon la structure JSON spécifique
  lieu_str: string;
  image_url: string;
  price: number;
  created_at: ColumnType<Date, string | undefined, never>;

}


export type AnnonceUI = Selectable<AnnoncesVirtualUiTable>;
export type AnnonceDetailsUI = Selectable<AnnoncesVirtualUiDetailsTable>;

export type Annonce = Selectable<AnnonceTable>;
export type NewAnnonce = Insertable<AnnonceTable>;
export type AnnonceUpdate = Updateable<AnnonceTable>;