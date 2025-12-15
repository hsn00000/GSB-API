import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IPortefeuille extends Document {
  visiteur: mongoose.Types.ObjectId;
  praticien: mongoose.Types.ObjectId;
  dateDebutSuivi: Date;     // Remplacé dateAjout par dateDebutSuivi
  dateFinSuivi?: Date;      // Ajouté (optionnel)
}

const portefeuilleSchema = new Schema<IPortefeuille>(
  {
    visiteur: { type: Schema.Types.ObjectId, ref: 'Visiteur', required: true },
    praticien: { type: Schema.Types.ObjectId, ref: 'Praticien', required: true },
    dateDebutSuivi: { type: Date, default: Date.now },
    dateFinSuivi: { type: Date, default: null, required: false }
  },
  { versionKey: false }
);

// Index unique : Un visiteur ne peut avoir qu'une seule fiche active pour un praticien donné
// Note : Si tu veux gérer un historique (ajouter/retirer/réajouter le même médecin), 
// il faudra peut-être revoir cet index unique.
portefeuilleSchema.index({ visiteur: 1, praticien: 1 }, { unique: true });

export const PortefeuilleModel: Model<IPortefeuille> = mongoose.model<IPortefeuille>('Portefeuille', portefeuilleSchema);