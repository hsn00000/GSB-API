import { VisiteModel, IVisiteDocument } from '../models/Visite';
import { ICreateVisite } from '../models/interfaces/IVisite';

/**
 * Service pour gérer la logique métier des visites
 */
export class VisiteService {
  
  /**
   * Créer une nouvelle visite
   */
  public async createVisite(visiteData: ICreateVisite): Promise<IVisiteDocument> {
    try {
      // 1. On crée directement l'instance de la visite
      const visite = new VisiteModel(visiteData);

      // 2. Sauvegarde en base de données
      await visite.save();
      
      return visite;

    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        throw new Error(`Validation échouée: ${messages.join(', ')}`);
      }
      
      // Autres erreurs
      throw error;
    }
  }

  /**
   * Récupérer toutes les visites (avec les détails peuplés)
   */
  public async getAllVisites(): Promise<IVisiteDocument[]> {
    try {
      const visites = await VisiteModel.find()
        .populate('visiteurs')   // Remplace l'ID par l'objet Visiteur complet
        .populate('praticiens')  // Remplace l'ID par l'objet Praticien complet
        .populate('motifs')      // Remplace l'ID par l'objet Motif complet
        .sort({ dateVisite: -1 }) // Tri du plus récent au plus ancien
        .exec();
        
      return visites;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des visites');
    }
  }

  /**
   * Récupérer une visite par son ID (avec les détails peuplés)
   */
  public async getVisiteById(id: string): Promise<IVisiteDocument | null> {
    try {
      const visite = await VisiteModel.findById(id)
        .populate('visiteurs')
        .populate('praticiens')
        .populate('motifs')
        .exec();

      if (!visite) {
        throw new Error(`Visite avec l'ID ${id} introuvable`);
      }
      return visite;

    } catch (error: any) {
      if (error.name === 'CastError') {
        throw new Error(`ID invalide: ${id}`);
      }
      throw error;
    }
  }
}