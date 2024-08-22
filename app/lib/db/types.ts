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
}
//
export enum AnnonceType {
    Vente = 'vente',
    Location = 'location',
    Service = 'service',
    Autre = 'autre'
  }
  
  interface TransactionTable {
    id: Generated<number>
    type: AnnonceType 
    // autres colonnes...
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

export interface CategoryTable {
    id: Generated<number>;
    type: AnnonceType ;
    name: string; 
    created_at: ColumnType<Date, string | undefined, never>;
}

export type Category = Selectable<CategoryTable>;
export type NewCategory = Insertable<CategoryTable>;
export type CategoryUpdate = Updateable<CategoryTable>;

export interface SubCategoryTable {
    id: Generated<number>;
    name: string;
    categorie_id:number;
    created_at: ColumnType<Date, string | undefined, never>;
}

export type SubCategory = Selectable<SubCategoryTable>;
export type NewSubCategory = Insertable<SubCategoryTable>;
export type SubCategoryUpdate = Updateable<SubCategoryTable>;

export interface AnnonceTable {
    id: Generated<number>;
    type: AnnonceType ;
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
