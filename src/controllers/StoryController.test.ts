import { describe, expect, it, vi, afterEach } from "vitest";
import * as StoryController from "./StoryController";
import request from "supertest";
import { app } from "../index";
import { Story } from "../models/Story";

const mockLimitFunction = vi.fn((lim: number) => Promise.resolve([]));

Story.find = (): any => ({
  populate: (path: string) => ({
    skip: (s: number) => ({
      limit: mockLimitFunction,
    }),
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
      mockLimitFunction.mockReset();
    });

    it("should return reponse 200 and have offse 0", async () => {
      const response = await request(app).get("/stories");
      expect(response.statusCode).toBe(200);
      expect(mockLimitFunction).toHaveBeenCalledWith(0);
    });

    it("should return reponse 200 and have offse 2", async () => {
      const response = await request(app).get("/stories").query({ limit: 2 });
      expect(response.statusCode).toBe(200);
      expect(mockLimitFunction).toHaveBeenCalledWith(2);
    });

    it("should return reponse 200 and have offse 2", async () => {
      const response = await request(app)
        .get("/stories")
        .query({ limit: "juan" });

      expect(response.body).toBe("Limit is not valid");
      expect(mockLimitFunction).not.toHaveBeenCalled();
    });
  });
});
