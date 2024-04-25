import request from "supertest";
import jest from "jest-mock";
import client from "../../client";

import app from "../../app.js";
import { task } from "../fixtures/tasks.js";

describe("GET /tasks/:id endpoint", () => {
  test("throws bad request when no task is found", async () => {
    const mockFindTask = jest.fn();
    client.task.findUnique = mockFindTask;
    client.task.findUnique.mockResolvedValue(null);

    await request(app).get("/tasks/1").expect(400);
  });

  test("returns 200 when task is found", async () => {
    const mockFindTask = jest.fn();
    client.task.findUnique = mockFindTask;
    client.task.findUnique.mockResolvedValue(task);

    await request(app)
      .get("/tasks/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          ...task,
          dueDate: task.dueDate.toISOString(),
        });
      });
  });
});
