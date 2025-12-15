import { PortefeuilleModel, IPortefeuille } from '../models/Portefeuille';

export class PortefeuilleService {
  
  // Ajouter un lien (Initialise dateDebutSuivi à maintenant, dateFinSuivi à null)
  public async ajouter(visiteurId: string, praticienId: string): Promise<IPortefeuille> {
    try {
      const lien = new PortefeuilleModel({ 
        visiteur: visiteurId, 
        praticien: praticienId 
        // dateDebutSuivi est mis par défaut par Mongoose
      });
      await lien.save();
      return lien;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Ce praticien est déjà dans le portefeuille");
      }
      throw error;
    }
  }

  // Récupérer le portefeuille (Trié par date de début de suivi)
  // Optionnel : Tu pourrais vouloir filtrer ceux qui n'ont pas de dateFinSuivi (actifs)
  public async getByVisiteur(visiteurId: string): Promise<IPortefeuille[]> {
    return await PortefeuilleModel.find({ visiteur: visiteurId })
      .populate('praticien') 
      .sort({ dateDebutSuivi: -1 }) // Mise à jour du champ de tri
      .exec();
  }

  /**
   * Suppression (Hard Delete)
   * Si tu veux utiliser dateFinSuivi (Soft Delete), il faudrait faire un update ici.
   * Mais attention à l'index unique si tu veux le réajouter plus tard.
   * Pour l'instant, on garde la suppression physique comme avant.
   */
  public async retirer(visiteurId: string, praticienId: string): Promise<void> {
  const result = await PortefeuilleModel.findOneAndDelete({
    visiteur: visiteurId,
    praticien: praticienId
  });

  if (!result) {
    throw new Error("Ce praticien n'est pas dans le portefeuille de ce visiteur.");
  }
}
}