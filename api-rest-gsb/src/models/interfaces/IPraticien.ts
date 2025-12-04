/**
 * Interface représentant un praticien
 */
export interface IPraticien {
  _id?: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  rue: string;
  codePostal: string;
  ville: string;
  dateCreation?: Date;
}


/**
 * Interface pour la création d'un praticien
 */
export interface ICreatePraticien {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  rue: string;
  codePostal: string;
  ville: string;
}
