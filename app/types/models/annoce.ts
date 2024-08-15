interface Attribute {
  key: string;
  value: string;
}

export interface IAnnoceBase {
  description: string;
  lieu: Attribute[];
  price: number;
  //images:Attribute[]
}

export interface IAnnoceUI extends IAnnoceBase { // for item in list in html page
  id: number;
  categorie: string;
  images: Attribute[];
}

export interface IAnnoceItemUI extends IAnnoceUI {
  //attributes: Attribute[];
  userContact: string;
}

export interface IAnnoceForm { // the data will  be collecte from the form
  categorieId: number;
  //images:Attribute[]
}
