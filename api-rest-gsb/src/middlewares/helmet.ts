import helmet from 'helmet';

/**
 * Middleware de sécurité HTTP (Helmet)
 * Ajoute automatiquement divers en-têtes HTTP pour sécuriser l'application :
 * - X-DNS-Prefetch-Control : Désactive la prélecture DNS
 * - X-Frame-Options : Protège contre le Clickjacking
 * - Strict-Transport-Security (HSTS) : Force l'HTTPS
 * - X-Content-Type-Options : Empêche le reniflage de type MIME
 * - Et bien d'autres protections XSS...
 */
export const securityHeaders = helmet();