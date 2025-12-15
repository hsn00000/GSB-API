import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisiteur } from './interfaces/IVisiteur';

export type IVisiteurDocument = IVisiteur & Document;

const visiteurSchema = new Schema<IVisiteurDocument>(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now },
    dateEmbauche: { type: Date },
    visites: [{ type: Schema.Types.ObjectId, ref: 'Visite' }]
  },
  {
    versionKey: false,
    // 👇 INDISPENSABLE : Pour que le champ 'portefeuille' apparaisse
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// 👇 INDISPENSABLE : Le lien magique vers la collection Portefeuille
visiteurSchema.virtual('portefeuille', {
  ref: 'Portefeuille',      
  localField: '_id',        
  foreignField: 'visiteur'  
});

export const VisiteurModel: Model<IVisiteurDocument> = mongoose.model<IVisiteurDocument>('Visiteur', visiteurSchema);