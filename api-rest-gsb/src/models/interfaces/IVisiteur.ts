/**
 * Interface représentant un utilisateur
 */
export interface IVisiteur {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  dateCreation?: Date;
}


/**
 * Interface pour la création d'un utilisateur
 */
export interface ICreateVisiteur {
  nom: string;
  prenom: string;
  email: string;
}
