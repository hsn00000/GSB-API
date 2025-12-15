import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IPortefeuille extends Document {
  visiteur: mongoose.Types.ObjectId;
  praticien: mongoose.Types.ObjectId;
  dateAjout: Date;
}

const portefeuilleSchema = new Schema<IPortefeuille>(
  {
    visiteur: { type: Schema.Types.ObjectId, ref: 'Visiteur', required: true },
    praticien: { type: Schema.Types.ObjectId, ref: 'Praticien', required: true },
    dateAjout: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

// Index unique pour empêcher qu'un visiteur ajoute 2 fois le même médecin
portefeuilleSchema.index({ visiteur: 1, praticien: 1 }, { unique: true });

export const PortefeuilleModel: Model<IPortefeuille> = mongoose.model<IPortefeuille>('Portefeuille', portefeuilleSchema);