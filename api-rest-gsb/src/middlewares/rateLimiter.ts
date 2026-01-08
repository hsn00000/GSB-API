import rateLimit from 'express-rate-limit';

/**
 * Middleware de limitation de débit (Rate Limiting)
 * Protège l'API contre les attaques par force brute et Déni de Service (DoS)
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fenêtre de 15 minutes
  limit: 100, // Limite chaque IP à 100 requêtes par fenêtre
  standardHeaders: true, // Retourne les infos de limite dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
  message: {
    success: false,
    message: "Trop de requêtes effectuées depuis cette IP, veuillez réessayer après 15 minutes."
  }
});