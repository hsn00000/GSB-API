import { PortefeuilleModel, IPortefeuilleDocument } from '../models/Portefeuille';
import { ICreatePortefeuille } from '../models/interfaces/IPortefeuille';

export class PortefeuilleService {

  /**
   * Ajouter un praticien au portefeuille
   */
  public async ajouter(data: ICreatePortefeuille): Promise<IPortefeuilleDocument> {
    try {
      const entry = new PortefeuilleModel(data);
      await entry.save();
      return entry;
    } catch (error: any) {
      // Gestion de l'erreur de duplicata (code 11000)
      if (error.code === 11000) {
        throw new Error('Ce praticien est déjà dans le portefeuille de ce visiteur');
      }
      throw error;
    }
  }

  /**
   * Récupérer la liste des praticiens pour un visiteur donné
   */
  public async getPortefeuilleByVisiteur(visiteurId: string): Promise<IPortefeuilleDocument[]> {
    try {
      return await PortefeuilleModel.find({ visiteur: visiteurId })
        .populate('praticien') // On remplit les infos du praticien
        .sort({ dateAjout: -1 })
        .exec();
    } catch (error) {
      throw new Error('Erreur lors de la récupération du portefeuille');
    }
  }

  /**
   * Retirer un praticien du portefeuille
   */
  public async retirer(id: string): Promise<void> {
    const result = await PortefeuilleModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Lien introuvable");
    }
  }
}