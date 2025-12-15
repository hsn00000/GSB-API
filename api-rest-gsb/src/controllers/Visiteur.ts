import { Request, Response } from 'express';
import { VisiteurService } from '../services/Visiteur';
import { PortefeuilleService } from '../services/Portefeuille'; // On importe le service portefeuille

export class VisiteurController {
  private visiteurService: VisiteurService;
  private portefeuilleService: PortefeuilleService; // On déclare le service

  constructor() {
    this.visiteurService = new VisiteurService();
    this.portefeuilleService = new PortefeuilleService(); // On l'instancie
  }

  /**
   * POST /api/visiteurs - Créer un visiteur
   */
  public createVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.createVisiteur(req.body);
      res.status(201).json({
        success: true,
        message: 'Visiteur créé avec succès',
        data: visiteur
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la création'
      });
    }
  };

  /**
   * GET /api/visiteurs - Récupérer tous les visiteurs
   */
  public getAllVisiteurs = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurs = await this.visiteurService.getAllVisiteurs();
      res.status(200).json({
        success: true,
        count: visiteurs.length,
        data: visiteurs
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération'
      });
    }
  };

  /**
   * GET /api/visiteurs/:id - Récupérer un visiteur par ID
   */
  public getVisiteurById = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteur = await this.visiteurService.getVisiteurById(req.params.id);
      res.status(200).json({
        success: true,
        data: visiteur
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Visiteur introuvable'
      });
    }
  };

  /**
   * --- AJOUT USER STORY 1 : Gestion du Portefeuille ---
   * POST /api/visiteurs/:id/portefeuille
   * Ajoute un praticien au portefeuille du visiteur
   * Body attendu: { "praticien": "ID_DU_PRATICIEN" }
   */
  public ajouterPraticienAuPortefeuille = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurId = req.params.id; // L'ID du visiteur est dans l'URL
      const praticienId = req.body.praticien; // L'ID du praticien est dans le body

      if (!praticienId) {
        res.status(400).json({ success: false, message: "L'ID du praticien est requis dans le champ 'praticien'" });
        return;
      }

      // On utilise le PortefeuilleService pour créer le lien
      const resultat = await this.portefeuilleService.ajouter({
        visiteur: visiteurId,
        praticien: praticienId
      });

      res.status(201).json({
        success: true,
        message: 'Praticien ajouté au portefeuille avec succès',
        data: resultat
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Erreur lors de l'ajout au portefeuille"
      });
    }
  };

  /**
   * --- AJOUT USER STORY 2 : Consultation ---
   * GET /api/visiteurs/:id/portefeuille
   * Récupère la liste des praticiens associés à ce visiteur
   */
  public getPortefeuilleVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      const visiteurId = req.params.id;
      
      // On demande au service de récupérer la liste peuplée (avec les noms des médecins)
      const portefeuille = await this.portefeuilleService.getPortefeuilleByVisiteur(visiteurId);

      res.status(200).json({
        success: true,
        count: portefeuille.length,
        data: portefeuille
      });
    } catch (error: any) {
      res.status(500).json({ // 500 car c'est une erreur serveur si la récupération échoue
        success: false,
        message: error.message || "Erreur lors de la récupération du portefeuille"
      });
    }
  };

  /**
   * --- AJOUT SUPPLEMENTAIRE (Optionnel mais utile) ---
   * DELETE /api/visiteurs/:id/portefeuille/:lienId
   * Supprime un praticien du portefeuille
   */
  public retirerPraticienDuPortefeuille = async (req: Request, res: Response): Promise<void> => {
    try {
      // Attention : lienId est l'ID de la ligne dans la collection Portefeuille, pas l'ID du praticien
      await this.portefeuilleService.retirer(req.params.lienId);
      res.status(200).json({ success: true, message: "Praticien retiré du portefeuille" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };
}