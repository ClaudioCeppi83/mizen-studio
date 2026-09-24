/**
 * 🏛️ MIZEN Studio — Cloud Functions v2 Entry Point
 * 
 * Expone la API serverless 'api' en la región europe-west1, enlazada
 * transparentemente con Firebase Hosting mediante rewrites Same-Origin.
 */

import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import express from 'express';
import { processLeadSubmission } from './leads/leadHandler';

// Inicialización idempotente del Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const app = express();
app.use(express.json({ limit: '64kb' }));

const handleLeadRequest = async (req: express.Request, res: express.Response) => {
  const rawIp = req.headers['x-forwarded-for'];
  const clientIp = (Array.isArray(rawIp) ? rawIp[0] : typeof rawIp === 'string' ? rawIp.split(',')[0] : '')?.trim() || req.ip || '127.0.0.1';
  const userAgent = (req.headers['user-agent'] as string) || 'unknown';

  const result = await processLeadSubmission(req.body, clientIp, userAgent);
  res.status(result.status).json(result.body);
};

// Compatibilidad total con Firebase Hosting Rewrites (/api/**)
app.post('/api/leads', handleLeadRequest);
app.post('/leads', handleLeadRequest);

app.get(['/api/health', '/health'], (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    project: process.env.GCLOUD_PROJECT || 'mizen-studio-os-21dd9',
    runtime: 'Node.js 20 on Cloud Run (v2)',
    timestamp: new Date().toISOString(),
  });
});

export const api = onRequest(
  {
    region: 'europe-west1',
    cors: false, // Same-origin servido a través de Firebase Hosting CDN
    maxInstances: 10,
    memory: '256MiB',
    timeoutSeconds: 30,
  },
  app
);
