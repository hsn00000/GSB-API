import { PracticienModel, IPracticienDocument } from '../models/Practicien';
import { ICreatePracticien } from '../models/interfaces/IPracticien';
/**
 * Service pour gérer la logique métier des practiciens
 */
export class PracticienService {
  /**
   * Créer un nouveau practicien
   */
  public async createPracticien(practicienData: ICreatePracticien): Promise<IPracticienDocument> {
    try {
      // Vérifier si le practicien existe déjà
      const existingPracticien = await PracticienModel.findOne({ email: practicienData.email });

      if (existingPracticien) {
        throw new Error(`Un practicien avec l'email ${practicienData.email} existe déjà`);
      }
      // Créer et sauvegarder le practicien
      const practicien = new PracticienModel(practicienData);
      await practicien.save();
      return practicien;
    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        throw new Error(`Validation échouée: ${messages.join(', ')}`);
      }
      throw error;
    }
  }


  /**
   * Récupérer tous les motifs
   */
  public async getAllPracticiens(): Promise<IPracticienDocument[]> {
    try {
      const practiciens = await PracticienModel.find()
        .sort({ dateCreation: -1 })
        .exec();
      return practiciens;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des practiciens');
    }
  }


  /**
   * Récupérer un practicien par son ID
   */
  public async getPracticienById(id: string): Promise<IPracticienDocument | null> {
    try {
      const practicien = await PracticienModel.findById(id).exec();
      if (!practicien) {
        throw new Error(`Practicien avec l'ID ${id} introuvable`);
      }
      return practicien;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }
}
