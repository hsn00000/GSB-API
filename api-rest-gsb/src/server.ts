import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// 👇 AJOUT : Import du rate limiter
import rateLimit from 'express-rate-limit'; 

import { Database } from './config/database';
import { VisiteurRoutes } from './routes/Visiteur';
import { MotifRoutes } from './routes/Motif';
import { PraticienRoutes } from './routes/Praticien';
import { VisiteRoutes } from './routes/Visite';


// Chargement des variables d'environnement
dotenv.config();


/**
 * Gère la configuration et le démarrage du serveur Express
 */
class App {
  public app: Application;
  private port: number;
  private database: Database;


  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.database = Database.getInstance();
   
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
  }


  /**
   * Configure les middlewares Express
   */
  private initializeMiddlewares(): void {
    // Parse le JSON dans les requêtes
    this.app.use(express.json());
   
    // Parse les données URL-encoded
    this.app.use(express.urlencoded({ extended: true }));
   
    // Active CORS pour toutes les origines
    this.app.use(cors());

    // 👇 AJOUT : Configuration du Rate Limiter (Protection DoS)
    // Limite le nombre de requêtes pour protéger contre la surcharge serveur
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // Fenêtre de 15 minutes
      limit: 100, // Limite chaque IP à 100 requêtes par fenêtre de 15 minutes
      standardHeaders: true, // Retourne les infos de limite dans les headers `RateLimit-*`
      legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
      message: {
        success: false,
        message: "Trop de requêtes effectuées depuis cette IP, veuillez réessayer après 15 minutes."
      }
    });

    // Appliquer le limiteur uniquement aux routes de l'API (commençant par /api)
    this.app.use('/api', limiter);
  }


  /**
   * Configure les routes de l'application
   */
  private initializeRoutes(): void {
    // Route de test
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        message: 'API REST Express.js + TypeScript + MongoDB',
        version: '1.0.0',
        endpoints: {
          health: '/health'
        }
      });
    });


    // Route de santé pour vérifier que l'API fonctionne
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });

    // Routes visiteurs
    const visiteurRoutes = new VisiteurRoutes();
    this.app.use('/api/visiteurs', visiteurRoutes.router);

    // Routes motifs
    const motifRoutes = new MotifRoutes();
    this.app.use('/api/motifs', motifRoutes.router);

    // Routes praticiens
    const praticienRoutes = new PraticienRoutes();
    this.app.use('/api/praticiens', praticienRoutes.router);

    // Routes visites
    const visiteRoutes = new VisiteRoutes();
    this.app.use('/api/visites', visiteRoutes.router);

  }


  /**
   * Initialise la connexion à la base de données
   */
  private async initializeDatabase(): Promise<void> {
    await this.database.connect();
  }


  /**
   * Démarre le serveur Express
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('================================');
      console.log(`Serveur démarré sur le port ${this.port}`);
      console.log(`Environnement: ${process.env.NODE_ENV}`);
      console.log('================================');
    });
  }
}


// Création et démarrage de l'application
const app = new App();
app.listen();


process.on('SIGINT', async () => {
  console.log('\n Arrêt du serveur...');
  await Database.getInstance().disconnect();
  process.exit(0);
});