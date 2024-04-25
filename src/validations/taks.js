import Joi from "joi";

const createTasks = Joi.object({
  title: Joi.string().min(3).max(40).required(),
  description: Joi.string().min(3).required(),
  dueDate: Joi.date().required(),
  projectName: Joi.string().min(3).required(),
});

const updateTask = Joi.object({
  title: Joi.string().min(3).max(40),
  description: Joi.string().min(3),
  dueDate: Joi.date(),
  status: Joi.string().valid("pending", "inprogress", "abandoned", "completed"),
}).min(1);

export default {
  createTasks,
  updateTask,
};
