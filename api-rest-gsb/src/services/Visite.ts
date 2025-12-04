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
    // Pas besoin de vérifier l'email ici car une visite est un événement, pas un utilisateur unique.
    const visite = new VisiteModel(visiteData);

    // 2. Sauvegarde en base de données
    await visite.save();
    
    return visite;

  } catch (error: any) {
    // Gestion des erreurs de validation Mongoose (ex: ID manquant, commentaire trop long)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      throw new Error(`Validation échouée: ${messages.join(', ')}`);
    }
    
    // Autres erreurs (ex: connexion DB perdue)
    throw error;
  }
  }


  /**
   * Récupérer tous les motifs
   */
  public async getAllVisites(): Promise<IVisiteDocument[]> {
    
    try {
      const visites = await VisiteModel.find()
        .sort({ dateCreation: -1 })
        .exec();
      return visites;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des visites');
    }
  }


  /**
   * Récupérer un praticien par son ID
   */
  public async getVisiteById(id: string): Promise<IVisiteDocument | null> {
    try {
      const visite = await VisiteModel.findById(id).exec();
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
