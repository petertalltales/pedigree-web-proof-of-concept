// Barrel files here aswell, aswell as combining several edgecase calls into one modular

import { Router } from 'express';
import {
  getData,
  deleteData,
  postData,
  getIndividualById,
  setDeathdates,
  setBirthdates,
  setUnknownFathers,
  setFounders,
  setInbreeding,
  setInbreedingForAll,
  setInbreedingCoefficient,
} from '../controllers/dataController';

const router = Router();

// GET: Fetch all temporary data
router.get('/', getData);

// POST: Insert or update individual records
router.post('/', postData);

// GET: Fetch a single individual by ID
router.get('/:id', getIndividualById);

// PATCH: Update inbreeding coefficient for an individual
router.patch('/:id/inbreeding', setInbreedingCoefficient);

// DELETE: Clear all temporary data
router.delete('/', deleteData);

// POST: Estimate and update death dates
router.post('/set_death_dates', setDeathdates);

// POST: Estimate and update birth dates
router.post('/set_birth_dates', setBirthdates);

// POST: Set and update unknown fathers
router.post('/set_unknown_fathers', setUnknownFathers);

// POST: Update founder status
router.post('/set_founders', setFounders);

// POST: Trigger inbreeding analysis for all individuals
router.post('/set_inbreeding/all', setInbreedingForAll);

// POST: Trigger inbreeding analysis for a specific individual by ID
router.post('/set_inbreeding/:id', setInbreeding);

export default router;
