import { Types } from "mongoose";

/**
 * Interface représentant une visite
 */
export interface IVisite {
    _id?: string;
    visiteurs:Types.ObjectId;
    praticiens:Types.ObjectId;
    motifs:Types.ObjectId;
    dateVisite?: Date;
    commentaire?: string;
}


/**
 * Interface pour la création d'une visite
 */
export interface ICreateVisite {
    dateVisite?: Date;
    commentaire?: string;
}
