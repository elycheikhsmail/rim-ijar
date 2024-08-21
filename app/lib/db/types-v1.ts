import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface DatabaseInterfaces {
  users: UsersTable;
  sessions: SessionsTable;
  categories: CategoriesTable;
  annonces: AnnoncesTable;
  images: ImagesTable;
  likes: LikesTable;
}

interface UsersTable {
  id: Generated<number>;
  email: string;
  password: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
  name: string;
  phone: string | null;
  avatar_url: string | null;
}

interface SessionsTable {
  id: Generated<number>;
  user_id: number;
  token:string;
  is_exp: boolean | null;
  created_at: ColumnType<Date, string | undefined, never>;
}

interface CategoriesTable {
  id: Generated<number>;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

interface AnnoncesTable {
  id: Generated<number>;
  categorie_id: number;
  user_id: number;
  description: string;
  lieu_str: string;
  price: number;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
  title: string;
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

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export type Session = Selectable<SessionsTable>;
export type NewSession = Insertable<SessionsTable>;
export type SessionUpdate = Updateable<SessionsTable>;

export type Category = Selectable<CategoriesTable>;
export type NewCategory = Insertable<CategoriesTable>;
export type CategoryUpdate = Updateable<CategoriesTable>;

export type AnnonceUI = Selectable<AnnoncesVirtualUiTable>;
export type Annonce = Selectable<AnnoncesTable>;
export type NewAnnonce = Insertable<AnnoncesTable>;

interface ImagesTable {
  id: Generated<number>;
  annonce_id: number;
  url: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export type Image = Selectable<ImagesTable>;
export type NewImage = Insertable<ImagesTable>;

interface LikesTable {
  id: Generated<number>;
  user_id: number;
  annonce_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Like = Selectable<LikesTable>;
export type NewLike = Insertable<LikesTable>;
export type AnnonceUpdate = Updateable<AnnoncesTable>;
