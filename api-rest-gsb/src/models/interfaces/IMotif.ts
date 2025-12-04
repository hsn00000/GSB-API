/**
 * Interface représentant un motif
 */
export interface IMotif {
  _id?: string;
  libelle: string;
  dateCreation?: Date;
}


/**
 * Interface pour la création d'un motif
 */
export interface ICreateMotif {
  libelle: string;
}
