import { describe, expect, it, vi, afterEach } from "vitest";
import * as StoryController from "./StoryController";
import request from "supertest";
import { app } from "../index";
import { Story } from "../models/Story";
import { Author } from "../models/Author";
import { getByRole } from "@testing-library/dom";
import { Window } from "happy-dom";

const mockOffsetFunction = vi.fn();

vi.mock("../models/Story", () => {
  const Story = vi.fn();

  Story.prototype.find = (): any => ({
    populate: (path: string) => ({
      skip: (offset: number) => {
        mockOffsetFunction(offset);
        return {
          limit: (lim: number) => Promise.resolve([]),
        };
      },
    }),
  });
  Story.prototype.count = (): number => 10;
  Story.prototype.save = vi.fn();

  return { Story };
});

Author.findById = vi.fn((id: string) => {
  if (id === "000") {
    return null;
  }

  return Promise.resolve({
    name: "jose",
    _id: id,
  });
});

describe("StoryController", () => {
  it("should StoryController exist", () => {
    expect(StoryController).toBeDefined();
  });

  it("should have getStory method", () => {
    expect(StoryController.getStories).toBeDefined();
  });

  describe("URL /stories", () => {
    afterEach(() => {
      mockOffsetFunction.mockReset();
    });

    it("should return reponse 200 and have offse 0", async () => {
      const response = await request(app).get("/stories");
      expect(response.statusCode).toBe(200);
      expect(mockOffsetFunction).toHaveBeenCalledWith(0);
    });

    it("should return reponse 200 and have offse 2", async () => {
      const response = await request(app).get("/stories").query({ offset: 2 });
      expect(response.statusCode).toBe(200);
      expect(mockOffsetFunction).toHaveBeenCalledWith(2);
    });

    it("should if offet is not number return Offset is not valid", async () => {
      const response = await request(app)
        .get("/stories")
        .query({ offset: "juan" });

      expect(response.body).toBe("Offset is not valid");
      expect(mockOffsetFunction).not.toHaveBeenCalled();
    });
  });

  describe("URL /new-story", () => {
    const window = new Window();
    document = window.document;

    afterEach(() => (document.body.innerHTML = ""));

    it("should exist newStory", () => {
      expect(StoryController.newStory).toBeDefined();
    });

    it("should respond status code 200", async () => {
      const response = await request(app).get("/new-story");
      expect(response.ok).toBeTruthy();
    });

    it("should show titulo, contenido inputs and button Guardar", async () => {
      const response = await request(app).get("/new-story");
      document.body.innerHTML = response.text;
      getByRole(document, "textbox", { name: "titulo" });
      getByRole(document, "textbox", { name: "contenido" });
      getByRole(document, "button", { name: "Guardar" });
    });

    it("should exist saveStory handler", () => {
      expect(StoryController.saveStory).toBeDefined();
    });

    it.only("should respond a id of the story", async () => {
      const story = {
        title: "the epic story",
        body: "super content ".repeat(50),
        idAuthor: "123456789",
      };

      const response = await request(app).post("/new-story").send(story);
      expect(response.statusCode).toBe(204);
    });
  });
});
