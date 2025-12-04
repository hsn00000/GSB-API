/**
 * Interface représentant une visite
 */
export interface IVisite {
  _id?: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  dateCreation?: Date;
  dateEmbauche?: Date;
}


/**
 * Interface pour la création d'une visite
 */
export interface ICreateVisite {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}
