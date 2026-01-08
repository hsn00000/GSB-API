import { Router } from 'express';
import { VisiteurController } from '../controllers/Visiteur';
import { validateCreateVisiteur } from '../middlewares/validators/visiteurValidator';

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
    this.router.post('/', validateCreateVisiteur,this.visiteurController.createVisiteur);
    
    // GET /api/visiteurs - Récupérer tous les visiteurs
    this.router.get('/', this.visiteurController.getAllVisiteurs);
    
    // GET /api/visiteurs/:id - Récupérer un visiteur par ID
    this.router.get('/:id', this.visiteurController.getVisiteurById);

    // --- Routes Portefeuille (User Stories) ---

    // Ajouter un praticien au portefeuille
    this.router.post('/:id/portefeuille', this.visiteurController.ajouterPraticienAuPortefeuille);

    // Voir le portefeuille
    this.router.get('/:id/portefeuille', this.visiteurController.getPortefeuilleVisiteur);

    // Supprimer un praticien (Hard Delete - US 3)
    this.router.delete('/:id/portefeuille/:praticienId', this.visiteurController.retirerPraticienDuPortefeuille);

    // Clôturer le suivi d'un praticien (Soft Delete - US 4)
    this.router.patch('/:id/portefeuille/:praticienId', this.visiteurController.cloturerSuiviPraticien);
  }
}