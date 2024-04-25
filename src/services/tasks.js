import prisma from "../../client.js";
import prismaErrors from "../constants/prisma-errors.js";
import httpError from "../utils/httpError.js";

const createTask = async (taskInfo) => {
  const { dueDate, projectName, ...task } = taskInfo;

  const result = await prisma.task.create({
    data: {
      ...task,
      dueDate: new Date(dueDate),
      Project: {
        connectOrCreate: {
          where: {
            name: projectName,
          },
          create: {
            name: projectName,
          },
        },
      },
    },
  });

  return result;
};

const getTask = async (taskId) => {
  const result = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!result) {
    throw new httpError(400, "No task with id.");
  }

  return result;
};

const updateTask = async (taskId, taskInfo) => {
  const result = await prisma.task
    .update({
      where: {
        id: taskId,
      },
      data: {
        ...taskInfo,
      },
    })
    .catch((err) => {
      if (err.code === prismaErrors.RECORD_NOT_FOUND) {
        throw new httpError(400, "Task not found");
      }
      throw err;
    });

  return result;
};

const deleteTask = async (taskId) => {
  const result = await prisma.task
    .delete({
      where: {
        id: taskId,
      },
    })
    .catch((err) => {
      if (err.code === prismaErrors.RECORD_NOT_FOUND) {
        throw new httpError(400, "Task not found");
      }
      throw err;
    });

  return result;
};

const getTasks = async (params) => {
  const { beforeDueDate, afterDueDate, status } = params;

  const tasks = await prisma.task.findMany({
    where: {
      status,
      dueDate: {
        gt: new Date(afterDueDate),
        lt: new Date(beforeDueDate),
      },
    },
  });

  return tasks;
};

export default {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getTasks,
};
