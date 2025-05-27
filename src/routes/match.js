import { Router } from 'express';
import { matchDesksHandler } from '../controllers/matchController.js';

const router = Router();

/**
 * @swagger
 * /api/match:
 *   post:
 *     summary: Get desk recommendations
 *     description: Returns recommended desks based on a natural-language query and optional employee ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *               query:
 *                 type: string
 *             required:
 *               - query
 *     responses:
 *       200:
 *         description: A list of desk objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 */

router.post('/', (matchDesksHandler));

export default router;