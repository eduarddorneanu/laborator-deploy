import tasksService from "../services/tasks.js";
import httpError from "../utils/httpError.js";
import logger from "../utils/logger.js";

const createTask = async (req, res, next) => {
  try {
    logger.info(`Creating task for user with id: ${"3"}`);
    const result = await tasksService.createTask(req.body);

    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const id = +req.params.id;
    logger.info(`Retrieving task with id: ${id}`);
    const result = await tasksService.getTask(id);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const result = await tasksService.getTasks(req.query);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const result = await tasksService.updateTask(+req.params.id, req.body);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const result = await tasksService.deleteTask(+req.params.id);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export default {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getTasks,
};
