import mongoose, { Schema, Model, Document } from 'mongoose';
import { IMotif } from './interfaces/IMotif';


export type IMotifDocument = IMotif & Document;
/**
 * Schéma Mongoose pour Motif
 */
const motifSchema = new Schema<IMotifDocument>(
  {
    libelle: {
      type: String,
      required: [true, 'Le libellé est obligatoire'],
      trim: true,
      minlength: [2, 'Le libellé doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le libellé ne peut pas dépasser 50 caractères']
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire'],
      trim: true,
      minlength: [2, 'La description doit contenir au moins 2 caractères'],
      maxlength: [50, 'La description ne peut pas dépasser 50 caractères']
    },
    dateCreation: {
      type: Date,
      default: Date.now
    },
  },
  {
    versionKey: false
  }
);




export const MotifModel: Model<IMotifDocument> = mongoose.model<IMotifDocument>('Motif', motifSchema);