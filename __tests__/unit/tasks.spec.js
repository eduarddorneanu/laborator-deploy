import tasks from "../../src/services/tasks";
import jest from "jest-mock";
import client from "../../client";
import { task } from "../fixtures/tasks.js";

describe("tasks getTask function", () => {
  test("should return task", async () => {
    const mockFindTask = jest.fn();
    client.task.findUnique = mockFindTask;
    client.task.findUnique.mockResolvedValue(task);

    await expect(tasks.getTask(task.id)).resolves.toEqual(task);

    expect(client.task.findUnique).toHaveBeenCalledWith({
      where: { id: task.id },
    });
  });

  test("should throw error if task not found", async () => {
    const mockFindTask = jest.fn();
    client.task.findUnique = mockFindTask;
    client.task.findUnique.mockResolvedValue(null);

    await tasks.getTask(task.id).catch((err) => {
      expect(err.statusCode).toEqual(400);
      expect(err.errorMessage).toEqual("No task with id.");
    });
  });
});
