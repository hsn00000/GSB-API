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

    // POST /api/visiteurs/:id/portefeuille - Ajouter un praticien
    this.router.post('/:id/portefeuille', this.visiteurController.ajouterPraticienAuPortefeuille);
    
    // GET /api/visiteurs/:id/portefeuille - Voir le portefeuille
    this.router.get('/:id/portefeuille', this.visiteurController.getPortefeuilleVisiteur);

    // DELETE /api/visiteurs/:id/portefeuille/:lienId - Retirer un praticien du portefeuille
    // (Note: :lienId correspond à l'ID de la liaison dans la collection 'portefeuilles')
    this.router.delete('/:id/portefeuille/:lienId', this.visiteurController.retirerPraticienDuPortefeuille);
  }
}