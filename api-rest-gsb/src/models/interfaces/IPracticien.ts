/**
 * Interface représentant un practicien
 */
export interface IPracticien {
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
 * Interface pour la création d'un practicien
 */
export interface ICreatePracticien {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  rue: string;
  codePostal: string;
  ville: string;
}
