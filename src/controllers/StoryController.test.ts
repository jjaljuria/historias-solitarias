import { describe, expect, it, vi, afterEach, MockInstance } from "vitest";
import * as StoryController from "./StoryController";
import request from "supertest";
import { app } from "../index";
import { Story } from "../models/Story";
import { Author } from "../models/Author";

Author.findOne = vi.fn(({ name }: { name: string }) => {
  return Promise.resolve({
    name: "jose",
    _id: "123",
  });
});

vi.spyOn(Story, "find");

describe("StoryController", () => {
  afterEach(() => {
    Story.find.mockReset();
  });
  it("should StoryController exist", () => {
    expect(StoryController).toBeDefined();
  });

  it("should have getStory method", () => {
    expect(StoryController.getStories).toBeDefined();
  });

  describe("URL /api/stories", () => {
    it("should return reponse 200", async () => {
      Story.find.mockReturnValueOnce({ populate: () => Promise.resolve([]) });
      const response = await request(app).get("/api/stories/jose");
      expect(response.statusCode).toBe(200);
    });

    it("should return a Array", async () => {
      Story.find.mockReturnValueOnce({ populate: () => Promise.resolve([]) });
      const response = await request(app).get("/api/stories/jose");
      const { stories } = response.body;

      expect(Story.find).toHaveBeenCalled();
      expect(stories).toBeInstanceOf(Array);
      expect(stories.length).toBe(0);
    });

    it("should return a Array with one Story", async () => {
      Story.find.mockReturnValueOnce({
        populate: () =>
          Promise.resolve([
            {
              title: "Perfect Dream",
              text: "",
            },
          ]),
      });
      const response = await request(app).get("/api/stories/jose");
      const { stories } = response.body;

      expect(stories[0].title).toBe("Perfect Dream");
      expect(stories[0].text).toBe("");
    });
  });

  describe("URL /api/stories/jose?limit", () => {
    it("limit query will be recive equal 2", async () => {
      Story.find.mockReturnValueOnce({
        populate: () =>
          Promise.resolve([
            {
              title: "Perfect Dream",
              text: "lorem",
            },
            {
              title: "Perfect Dream",
              text: "lorem",
            },
          ]),
      });
      const response = await request(app).get("/api/stories/jose").query({
        limit: 2,
      });
      const { stories } = response.body;
      expect(stories.length).toBe(2);
      expect(Story.find.calls[0][2].limit).toBe(2);
    });

    it("limit query will be recive a not number and should return limit is not valid", async () => {
      Story.find.mockReturnValueOnce({
        populate: () =>
          Promise.resolve([
            {
              title: "Perfect Dream",
              text: "lorem",
            },
            {
              title: "Perfect Dream",
              text: "lorem",
            },
          ]),
      });
      const response = await request(app).get("/api/stories/jose").query({
        limit: "lorem",
      });
      expect(response.body).toBe("Limit is not valid");
    });
  });
});
