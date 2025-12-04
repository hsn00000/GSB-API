import { Router } from 'express';
import { PraticienController } from '../controllers/Praticien';


/**
 * Configuration des routes pour les praticiens
 */
export class PraticienRoutes {
  public router: Router;
  private praticienController: PraticienController;

  constructor() {
    this.router = Router();
    this.praticienController = new PraticienController();
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // POST /api/practiciens - Créer un practicien
    this.router.post('/', this.praticienController.createPraticien);
    // GET /api/practiciens - Récupérer tous les practiciens
    this.router.get('/', this.praticienController.getAllPraticiens);
    // GET /api/praticiens/:id - Récupérer un praticien par ID
    this.router.get('/:id', this.praticienController.getPraticienById);
  }
}
