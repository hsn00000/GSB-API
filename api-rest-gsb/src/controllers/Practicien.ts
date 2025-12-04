import { Request, Response } from 'express';
import { PracticienService } from '../services/Practicien';


export class PracticienController {
  private practicienService: PracticienService;

  constructor() {
    this.practicienService = new PracticienService();
  }


  /**
   * POST /api/practiciens - Créer un practicien
   */
  public createPracticien = async (req: Request, res: Response): Promise<void> => {
    try {
      const practicien = await this.practicienService.createPracticien(req.body);
      console.log(req.body);
      res.status(201).json({
        success: true,
        message: 'Practicien créé avec succès',
        data: practicien
      });
    } catch (error: any) {
         console.log(req.body);
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de la création'
      });
    }
  };
  /**
   * GET /api/practiciens - Récupérer tous les practiciens
   */
  public getAllPracticiens = async (req: Request, res: Response): Promise<void> => {
    try {
      const practiciens = await this.practicienService.getAllPracticiens();
      res.status(200).json({
        success: true,
        count: practiciens.length,
        data: practiciens
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la récupération'
      });
    }
  };
  /**
   * GET /api/practiciens/:id - Récupérer un practicien par ID
   */
  public getPracticienById = async (req: Request, res: Response): Promise<void> => {
    try {
      const practicien = await this.practicienService.getPracticienById(req.params.id);
     
      res.status(200).json({
        success: true,
        data: practicien
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Practicien introuvable'
      });
    }
  };
}
