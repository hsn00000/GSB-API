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
    // POST /api/visiteurs - Créer un visiteur
    this.router.post('/', this.visiteurController.createVisiteur);
    // GET /api/visiteurs - Récupérer tous les visiteurs
    this.router.get('/', this.visiteurController.getAllVisiteurs);
    // GET /api/visiteurs/:id - Récupérer un visiteur par ID
    this.router.get('/:id', this.visiteurController.getVisiteurById);
    // POST /api/visiteurs/:id/portefeuille - Ajouter un praticien
    this.router.post('/:id/portefeuille', this.visiteurController.ajouterPraticienAuPortefeuille);
  }
}
