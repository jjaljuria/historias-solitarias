import { describe, expect, it, vi, afterEach } from "vitest";
import * as StoryController from "./StoryController";
import request from "supertest";
import { app } from "../index";
import { Story } from "../models/Story";

const mockOffsetFunction = vi.fn((offset: number) => ({
  limit: () => Promise.resolve([]),
}));

Story.find = (): any => ({
  populate: (path: string) => ({
    skip: mockOffsetFunction,
  }),
});

Story.count = (): number => 10;

describe("StoryController", () => {
  it("should StoryController exist", () => {
    expect(StoryController).toBeDefined();
  });

  it("should have getStory method", () => {
    expect(StoryController.getStories).toBeDefined();
  });

  describe("URL /api/stories", () => {
    afterEach(() => {
      mockOffsetFunction.mockReset();
    });

    it("should return reponse 200 and have offse 0", async () => {
      const response = await request(app).get("/stories");
      expect(response.statusCode).toBe(200);
      expect(mockOffsetFunction).toHaveBeenCalledWith(0);
    });

    it.todo("should return reponse 200 and have offse 2", async () => {
      const response = await request(app)
        .get("/stories")
        .query({ offset: "2" });
      expect(response.statusCode).toBe(200);
      expect(mockOffsetFunction).toHaveBeenCalledWith(0);
    });

    it("should if offet is not number return Offset is not valid", async () => {
      const response = await request(app)
        .get("/stories")
        .query({ offset: "juan" });

      expect(response.body).toBe("Offset is not valid");
      expect(mockOffsetFunction).not.toHaveBeenCalled();
    });
  });
});
