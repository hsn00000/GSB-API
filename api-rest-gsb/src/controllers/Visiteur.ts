import { Request, Response } from 'express';
import { VisiteurService } from '../services/Visiteur';


export class VisiteurController {
  private visiteurService: VisiteurService;


  constructor() {
    this.visiteurService = new VisiteurService();
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
   * GET /api/users - Récupérer tous les utilisateurs
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
   * GET /api/users/:id - Récupérer un utilisateur par ID
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
     * --- AJOUT USER STORY 1 ---
     * POST /api/visiteurs/:id/portefeuille
     * Body: { idPraticien: "..." }
     */
    public ajouterPraticienAuPortefeuille = async (req: Request, res: Response): Promise<void> => {
      try {
        const idVisiteur = req.params.id; // Récupéré depuis l'URL
        const { idPraticien } = req.body; // Récupéré depuis le JSON envoyé

        if (!idPraticien) {
           res.status(400).json({ success: false, message: "L'ID du praticien est requis" });
           return;
        }

        const visiteur = await this.visiteurService.ajouterPraticien(idVisiteur, idPraticien);

        res.status(200).json({
          success: true,
          message: 'Praticien ajouté au portefeuille avec succès',
          data: visiteur
        });
      } catch (error: any) {
        res.status(400).json({
          success: false,
          message: error.message || "Erreur lors de l'ajout au portefeuille"
        });
      }
    };

    /**
   * --- AJOUT USER STORY 2 ---
   * GET /api/visiteurs/:id/portefeuille
   */
  public getPortefeuilleVisiteur = async (req: Request, res: Response): Promise<void> => {
    try {
      const idVisiteur = req.params.id;
      
      const portefeuille = await this.visiteurService.getPortefeuille(idVisiteur);

      res.status(200).json({
        success: true,
        count: portefeuille.length, // On indique combien il y en a
        data: portefeuille
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || "Erreur lors de la récupération du portefeuille"
      });
    }
  };

}
