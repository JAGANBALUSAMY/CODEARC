/**
 * CORS configuration for server request handling.
 * Features:
 * - Origin validation
 * - Vercel deployment detection
 * - Header generation
 *
 * By Dulapah Vibulsanti (https://dulapahv.dev)
 */

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
] as const;

const isVercelDeployment = (_origin: string): boolean => false;

const getAllowedOrigin = (origin: string | undefined): string => {
  // For security, avoid returning '*' in production
  if (process.env.NODE_ENV === 'production' && !origin) {
    return ALLOWED_ORIGINS[0];
  }

  if (!origin) return '*';

  if (
    ALLOWED_ORIGINS.includes(origin as (typeof ALLOWED_ORIGINS)[number]) ||
    isVercelDeployment(origin)
  ) {
    return origin;
  }

  return ALLOWED_ORIGINS[0];
};

const getCorsHeaders = (origin: string | undefined) => ({
  'Access-Control-Allow-Origin': getAllowedOrigin(origin),
  'Access-Control-Allow-Methods': 'GET',
  Vary: 'Origin',
});

export { ALLOWED_ORIGINS, getCorsHeaders, isVercelDeployment };
