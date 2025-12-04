import { Router } from 'express';
import { PracticienController } from '../controllers/Practicien';


/**
 * Configuration des routes pour les practiciens
 */
export class PracticienRoutes {
  public router: Router;
  private practicienController: PracticienController;

  constructor() {
    this.router = Router();
    this.practicienController = new PracticienController();
    this.initializeRoutes();
  }


  private initializeRoutes(): void {
    // POST /api/practiciens - Créer un practicien
    this.router.post('/', this.practicienController.createPracticien);
    // GET /api/practiciens - Récupérer tous les practiciens
    this.router.get('/', this.practicienController.getAllPracticiens);
    // GET /api/practiciens/:id - Récupérer un practicien par ID
    this.router.get('/:id', this.practicienController.getPracticienById);
  }
}
