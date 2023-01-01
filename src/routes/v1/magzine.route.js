const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const magzineValidation = require('../../validations/magzine.validation');
const magzineController = require('../../controllers/magzine.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(magzineValidation.createmagzine), magzineController.createmagzine)
  .get(validate(magzineValidation.getmagzines), magzineController.getmagzines);

router.route("/download/csv").get(magzineController.downloadCsv)

router
  .route('/:magzineId')
  .get(validate(magzineValidation.getmagzine), magzineController.getmagzine)
  .patch(validate(magzineValidation.updatemagzine), magzineController.updatemagzine)
  .delete(validate(magzineValidation.deletemagzine), magzineController.deletemagzine);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: magzines
 *   description: magzine management and retrieval
 */

/**
 * @swagger
 * /magzines:
 *   post:
 *     summary: Create a magzine
 *     description: Only admins can create other magzines.
 *     tags: [magzines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [magzine, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: magzine
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/magzine'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all magzines
 *     description: Only admins can retrieve all magzines.
 *     tags: [magzines]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: magzine name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: magzine role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of magzines
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/magzine'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /magzines/{id}:
 *   get:
 *     summary: Get a magzine
 *     description: Logged in magzines can fetch only their own magzine information. Only admins can fetch other magzines.
 *     tags: [magzines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: magzine id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/magzine'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a magzine
 *     description: Logged in magzines can only update their own information. Only admins can update other magzines.
 *     tags: [magzines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: magzine id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/magzine'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a magzine
 *     description: Logged in magzines can delete only themselves. Only admins can delete other magzines.
 *     tags: [magzines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: magzine id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
