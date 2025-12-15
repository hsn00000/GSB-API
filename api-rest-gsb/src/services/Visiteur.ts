import { VisiteurModel, IVisiteurDocument } from '../models/Visiteur';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';
import { PraticienModel } from '../models/Praticien';

/**
 * Service pour gérer la logique métier des visiteurs
 */
export class VisiteurService {
  /**
   * Créer un nouvel visiteur
   */
  public async createVisiteur(visiteurData: ICreateVisiteur): Promise<IVisiteurDocument> {
    try {
      // Vérifier si l'email existe déjà
      const existingVisiteur = await VisiteurModel.findOne({ email: visiteurData.email });

      if (existingVisiteur) {
        throw new Error(`Un visiteur avec l'email ${visiteurData.email} existe déjà`);
      }
      // Créer et sauvegarder le visiteur
      const visiteur = new VisiteurModel(visiteurData);
      await visiteur.save();
      return visiteur;
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
   * Récupérer tous les utilisateurs
   */
  public async getAllVisiteurs(): Promise<IVisiteurDocument[]> {
    try {
      const visiteurs = await VisiteurModel.find()
        .sort({ dateCreation: -1 })
        .exec();
      return visiteurs;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des visiteurs');
    }
  }


  /**
   * Récupérer un utilisateur par son ID
   */
  public async getVisiteurById(id: string): Promise<IVisiteurDocument | null> {
  try {
    const visiteur = await VisiteurModel.findById(id)
      // 👇 C'est cette ligne qui récupère les données du portefeuille
      .populate({
        path: 'portefeuille',
        populate: { path: 'praticien' } // Pour voir les noms des médecins
      })
      .exec();

    if (!visiteur) {
      throw new Error(`Visiteur avec l'ID ${id} introuvable`);
    }
    return visiteur;
  } catch (error: any) {
    if (error.name === 'CastError') {
      throw new Error(`ID invalide: ${id}`);
    }
    throw error;
  }
}

  /**
     * --- AJOUT USER STORY 1 ---
     * Ajouter un praticien au portefeuille d'un visiteur
     */
    public async ajouterPraticien(idVisiteur: string, idPraticien: string): Promise<IVisiteurDocument> {
      
      // 1. Vérifier si le praticien existe
      const praticien = await PraticienModel.findById(idPraticien);
      if (!praticien) {
        throw new Error(`Praticien avec l'ID ${idPraticien} introuvable`);
      }

      // 2. Vérifier si le visiteur existe
      const visiteur = await VisiteurModel.findById(idVisiteur);
      if (!visiteur) {
        throw new Error(`Visiteur avec l'ID ${idVisiteur} introuvable`);
      }

      // 3. Ajouter le praticien au portefeuille (s'il n'y est pas déjà)
      // $addToSet est une commande Mongo magique qui évite les doublons automatiquement
      const updatedVisiteur = await VisiteurModel.findByIdAndUpdate(
        idVisiteur,
        { $addToSet: { portefeuille: idPraticien } },
        { new: true } // Pour récupérer l'objet mis à jour
      ).exec();

      if (!updatedVisiteur) {
         throw new Error("Erreur lors de la mise à jour du portefeuille");
      }

      return updatedVisiteur;
    }

    /**
   * --- AJOUT USER STORY 2 ---
   * Récupérer tous les praticiens du portefeuille d'un visiteur
   */
  public async getPortefeuille(idVisiteur: string): Promise<any> {
    // On cherche le visiteur par son ID
    // .populate('portefeuille') va automatiquement aller chercher les infos dans la collection Praticiens
    const visiteur = await VisiteurModel.findById(idVisiteur)
      .populate('portefeuille') 
      .exec();

    if (!visiteur) {
      throw new Error(`Visiteur avec l'ID ${idVisiteur} introuvable`);
    }

    // On retourne uniquement le tableau de praticiens
    return visiteur.portefeuille;
  }

}
