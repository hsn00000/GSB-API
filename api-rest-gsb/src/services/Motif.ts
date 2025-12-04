import { MotifModel, IMotifDocument } from '../models/Motif';
import { ICreateMotif } from '../models/interfaces/IMotif';
/**
 * Service pour gérer la logique métier des motifs
 */
export class MotifService {
  /**
   * Créer un nouveau motif
   */
  public async createMotif(motifData: ICreateMotif): Promise<IMotifDocument> {
    try {
      // Vérifier si le motif existe déjà
      const existingMotif = await MotifModel.findOne({ libelle: motifData.libelle });

      if (existingMotif) {
        throw new Error(`Un motif avec le libellé ${motifData.libelle} existe déjà`);
      }
      // Créer et sauvegarder le motif
      const motif = new MotifModel(motifData);
      await motif.save();
      return motif;
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
  public async getAllMotifs(): Promise<IMotifDocument[]> {
    try {
      const motifs = await MotifModel.find()
        .sort({ dateCreation: -1 })
        .exec();
      return motifs;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des motifs');
    }
  }


  /**
   * Récupérer un motif par son ID
   */
  public async getMotifById(id: string): Promise<IMotifDocument | null> {
    try {
      const motif = await MotifModel.findById(id).exec();

      if (!motif) {
        throw new Error(`Motif avec l'ID ${id} introuvable`);
      }
      return motif;
    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }
}
