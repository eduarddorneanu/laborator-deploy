import express from "express";
import validate from "../middlewares/validate.js";
import tasksValidations from "../validations/taks.js";
import tasksController from "../controllers/tasks.js";

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     description: Create tasks
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createTaskDTO'
 *     responses:
 *       201:
 *         description: Created task
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error
 *   get:
 *     description: Get list of tasks
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, inprogress, abandoned, completed]
 *         description: Numeric ID of the task to get
 *       - in: query
 *         name: afterDueDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: after due date
 *       - in: query
 *         name: beforeDueDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: before due date
 *     responses:
 *       200:
 *         description: task
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error
 */
router
  .route("/")
  .post(validate(tasksValidations.createTasks), tasksController.createTask)
  .get(tasksController.getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     description: Get tasks by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the task to get
 *     responses:
 *       200:
 *         description: task
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error
 */
router.route("/:id").get(tasksController.getTask);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     description: Update task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the task to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateTaskDTO'
 *     responses:
 *       200:
 *         description: Updated task
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error
 *   delete:
 *     description: Delete tasks by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the task to get
 *     responses:
 *       200:
 *         description: task
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error
 */
router
  .route("/:id")
  .patch(validate(tasksValidations.updateTask), tasksController.updateTask)
  .delete(tasksController.deleteTask);

export default router;
