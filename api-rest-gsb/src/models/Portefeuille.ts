import mongoose, { Schema, Model, Document } from 'mongoose';
import { IPortefeuille } from './interfaces/IPortefeuille';

export type IPortefeuilleDocument = IPortefeuille & Document;

const portefeuilleSchema = new Schema<IPortefeuilleDocument>(
  {
    visiteur: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: [true, 'Le visiteur est obligatoire']
    },
    praticien: {
      type: Schema.Types.ObjectId,
      ref: 'Praticien',
      required: [true, 'Le praticien est obligatoire']
    },
    dateAjout: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

// Index unique composé : Un visiteur ne peut avoir qu'une seule fois le même praticien dans son portefeuille
portefeuilleSchema.index({ visiteur: 1, praticien: 1 }, { unique: true });

export const PortefeuilleModel: Model<IPortefeuilleDocument> = mongoose.model<IPortefeuilleDocument>('Portefeuille', portefeuilleSchema);