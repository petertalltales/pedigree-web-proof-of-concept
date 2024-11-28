// src/controllers/dataController.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/AppError';
import {
  fetchData,
  clearData,
  insertData,
  getIndividual,
  updateInbreedingCoefficient,
} from '../services/data/dataService';
import {
  calculateBirthDates,
  calculateDeathDates,
} from '../services/calculations/calculateDateService';
import { calculateFounders } from '../services/calculations/calculateFounderService';
import { calculateUnknownFathers } from '../services/calculations/calculateUnknownFathersService';
import { calculateInbreedingForAll } from '../services/calculations/calculateInbreedingService';

/**
 * Fetch all temporary data.
 */
export const getData: RequestHandler = asyncHandler(async (_req, res) => {
  const data = await fetchData();
  res.json(data);
});

/**
 * Clear all temporary data.
 */
export const deleteData: RequestHandler = asyncHandler(async (_req, res) => {
  await clearData();
  res.send('Temporary data cleared.');
});

/**
 * Insert or update individual records.
 */
export const postData: RequestHandler = asyncHandler(async (req, res) => {
  const individuals = req.body;

  if (!Array.isArray(individuals) || individuals.length === 0) {
    throw new AppError('Invalid data. Expected an array of individuals.', 400);
  }

  await insertData(individuals);
  res.status(201).send('Data inserted or updated successfully.');
});

/**
 * Fetch an individual by ID.
 */
export const getIndividualById: RequestHandler = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError('ID is required.', 400);
    }

    const individual = await getIndividual(id);

    if (!individual) {
      throw new AppError(`Individual with ID ${id} not found.`, 404);
    }

    res.json(individual);
  }
);

/**
 * Update an individual's inbreeding coefficient.
 */
export const setInbreedingCoefficient: RequestHandler = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const { inbreeding } = req.body;

    if (!id || inbreeding === undefined) {
      throw new AppError('ID and inbreeding coefficient are required.', 400);
    }

    await updateInbreedingCoefficient(id, inbreeding);
    res.status(200).send(`Inbreeding coefficient updated for ID: ${id}`);
  }
);

/**
 * Estimate and update death dates.
 */
export const setDeathdates: RequestHandler = asyncHandler(async (_req, res) => {
  await calculateDeathDates();
  res.send('Death dates estimated successfully.');
});

/**
 * Estimate and update birth dates.
 */
export const setBirthdates: RequestHandler = asyncHandler(async (_req, res) => {
  await calculateBirthDates();
  res.send('Birth dates estimated successfully.');
});

/**
 * Set unknown fathers.
 */
export const setUnknownFathers: RequestHandler = asyncHandler(
  async (_req, res) => {
    await calculateUnknownFathers();
    res.send('Unknown fathers set successfully.');
  }
);

/**
 * Update founder statuses.
 */
export const setFounders: RequestHandler = asyncHandler(async (_req, res) => {
  await calculateFounders();
  res.send('Founder status updated successfully.');
});

/**
 * Calculate and update inbreeding coefficients for all individuals.
 */
export const setInbreedingForAll: RequestHandler = asyncHandler(
  async (_req, res) => {
    await calculateInbreedingForAll();
    res.send('Inbreeding coefficients calculated for all individuals.');
  }
);
