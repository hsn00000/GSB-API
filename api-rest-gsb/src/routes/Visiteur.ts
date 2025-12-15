import { Router } from 'express';
import { VisiteurController } from '../controllers/Visiteur';

/**
 * Configuration des routes pour les visiteurs
 */
export class VisiteurRoutes {
  public router: Router;
  private visiteurController: VisiteurController;

  constructor() {
    this.router = Router();
    this.visiteurController = new VisiteurController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // --- Routes Visiteurs Classiques ---
    
    // POST /api/visiteurs - Créer un visiteur
    this.router.post('/', this.visiteurController.createVisiteur);
    
    // GET /api/visiteurs - Récupérer tous les visiteurs
    this.router.get('/', this.visiteurController.getAllVisiteurs);
    
    // GET /api/visiteurs/:id - Récupérer un visiteur par ID
    this.router.get('/:id', this.visiteurController.getVisiteurById);

    // --- Routes Portefeuille (User Stories) ---

    // Ajouter un praticien au portefeuille
    this.router.post('/:id/portefeuille', this.visiteurController.ajouterPraticienAuPortefeuille);

    // Voir le portefeuille
    this.router.get('/:id/portefeuille', this.visiteurController.getPortefeuilleVisiteur);

    // Supprimer un praticien (via l'ID du lien portefeuille)
    this.router.delete('/:id/portefeuille/:praticienId', this.visiteurController.retirerPraticienDuPortefeuille);
  }
}