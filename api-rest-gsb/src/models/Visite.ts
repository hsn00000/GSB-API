import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisite } from './interfaces/IVisite';

export type IVisiteDocument = IVisite & Document;

/**
 * Schéma Mongoose pour Visite
 */
const visiteSchema = new Schema<IVisiteDocument>(
  {
    dateVisite: {
      type: Date,
      default: Date.now
    },
    commentaire: {
      type: String,
      trim: true,
      maxlength: [500, 'Le commentaire ne peut pas dépasser 500 caractères']
    },
    visiteurs: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: [true, 'Le visiteur est obligatoire']
    },
    praticiens: {
      type: Schema.Types.ObjectId,
      ref: 'Praticien',
      required: [true, 'Le praticien est obligatoire']
    },
    motifs: {
      type: Schema.Types.ObjectId,
      ref: 'Motif',
      required: [true, 'Le motif est obligatoire']
    }
  },
  {
    versionKey: false
  }
);

export const VisiteModel: Model<IVisiteDocument> = mongoose.model<IVisiteDocument>('Visite', visiteSchema);