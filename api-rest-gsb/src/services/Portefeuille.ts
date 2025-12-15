import { PortefeuilleModel, IPortefeuille } from '../models/Portefeuille';

export class PortefeuilleService {
  
  // Ajouter un lien
  public async ajouter(visiteurId: string, praticienId: string): Promise<IPortefeuille> {
    try {
      const lien = new PortefeuilleModel({ visiteur: visiteurId, praticien: praticienId });
      await lien.save();
      return lien; // Correction ici (c'était 'returnxh')
    } catch (error: any) {
      // Gestion de l'erreur de duplicata (code 11000 envoyé par MongoDB)
      if (error.code === 11000) {
        throw new Error("Ce praticien est déjà dans le portefeuille");
      }
      throw error;
    }
  }

  // Récupérer le portefeuille d'un visiteur
  public async getByVisiteur(visiteurId: string): Promise<IPortefeuille[]> {
    return await PortefeuilleModel.find({ visiteur: visiteurId })
      .populate('praticien') // Remplit les infos du médecin (Nom, Prénom...)
      .exec();
  }

  // Supprimer un lien
  public async retirer(lienId: string): Promise<void> {
    await PortefeuilleModel.findByIdAndDelete(lienId);
  }
}