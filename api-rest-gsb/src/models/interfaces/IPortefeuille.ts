import { Types } from "mongoose";

/**
 * Interface représentant l'association Portefeuille (Lien Visiteur <-> Praticien)
 */
export interface IPortefeuille {
  _id?: string;
  visiteur: Types.ObjectId;
  praticien: Types.ObjectId;
  dateAjout: Date;
}

/**
 * Interface pour la création (ce qu'on reçoit dans le body de la requête)
 */
export interface ICreatePortefeuille {
  visiteur: string;
  praticien: string;
}