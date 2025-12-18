import { PortefeuilleModel, IPortefeuille } from '../models/Portefeuille';

export class PortefeuilleService {
  
  // Ajouter
  public async ajouter(visiteurId: string, praticienId: string): Promise<IPortefeuille> {
    try {
      const lien = new PortefeuilleModel({ 
        visiteur: visiteurId, 
        praticien: praticienId 
      });
      
      await lien.save();

      // AJOUT : On charge les infos du praticien (et du visiteur si besoin)
      await lien.populate('praticien');
      // await lien.populate('visiteur'); // Décommentez si vous voulez aussi les infos du visiteur
      
      return lien;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Ce praticien est déjà dans le portefeuille de ce visiteur");
      }
      throw error;
    }
  }

  // MODIFICATION ICI : On ajoute le filtre { dateFinSuivi: null }
  public async getByVisiteur(visiteurId: string): Promise<IPortefeuille[]> {
    return await PortefeuilleModel.find({ 
        visiteur: visiteurId,
        dateFinSuivi: null  // <--- C'est cette ligne qui filtre les "actifs" uniquement
      })
      .populate('praticien') 
      .sort({ dateDebutSuivi: -1 })
      .exec();
  }

  // Supprimer (Si tu gardes le hard delete, ça reste comme ça)
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