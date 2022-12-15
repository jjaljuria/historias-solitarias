import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import * as StoryController from "./StoryController";
import request from "supertest";
import { app } from "../app";
import { Story } from "../models/Story";
import { Author } from "../models/Author";
import { getByDisplayValue, getByRole } from "@testing-library/dom";
import { Window } from "happy-dom";

const mockOffsetFunction = vi.fn();

vi.mock("../middlewares/isAuthenticated", () => {
  const isAuthenticatedMock = (req: Request, res: Response, next: Function) =>
    next();

  return { default: isAuthenticatedMock };
});

vi.mock("../models/Story", () => {
  const Story = vi.fn();

  Story.find = (): any => ({
    populate: (path: string) => ({
      skip: (offset: number) => {
        mockOffsetFunction(offset);
        return {
          limit: (lim: number) => Promise.resolve([]),
        };
      },
    }),
  });
  Story.count = (): Promise<number> => Promise.resolve(10);
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
    const document = window.document;

    afterEach(() => (document.body.innerHTML = ""));

    it("should show titulo, contenido inputs and button Guardar", async () => {
      const response = await request(app).get("/new-story");
      document.body.innerHTML = response.text;
      getByRole(document, "textbox", { name: "titulo" });
      getByRole(document, "textbox", { name: "contenido" });
      getByRole(document, "button", { name: "Guardar" });
    });

    it("should respond a id of the story", async () => {
      const story = {
        title: "the epic story",
        body: "super content ".repeat(50),
        idAuthor: "123456789",
      };

      const response = await request(app).post("/new-story").send(story);
      expect(response.statusCode).toBe(302);
    });
  });

  describe("Delete story", () => {
    const mockFindByIdAndDelete = vi.fn();
    Story.findByIdAndDelete = mockFindByIdAndDelete;

    it("should if story not exist respond 'Story that you wanted delete not exist'", async () => {
      mockFindByIdAndDelete.mockReturnValueOnce(Promise.resolve(null));
      const response = await request(app).delete("/story").send({ id: "123" });
      expect(response.body).toBe("Story that you wanted delete not exist");
    });

    it("should respond story deleted", async () => {
      const story = {
        id: "123",
        title: "",
        body: "",
        author: "1234567890",
        createdAt: "",
      };

      mockFindByIdAndDelete.mockReturnValueOnce(Promise.resolve(story));

      const response = await request(app).delete("/story").send({
        id: story.id,
      });
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith(story.id);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(story);
    });
  });

  describe("Update story", () => {
    const window = new Window();
    const document = window.document;

    beforeEach(() => {
      document.body.innerHTML = "";
    });

    const story = {
      id: "123",
      title: "One Story",
      body: "Description Story",
      author: "1234567890",
      createdAt: "",
    };

    const mockFindById = vi.fn();
    Story.findById = mockFindById;

    it("should respond with wanted story page", async () => {
      mockFindById.mockReturnValue(Promise.resolve(story));

      const response = await request(app)
        .get("/update-story/" + story.id)
        .expect(200);

      document.body.innerHTML = response.text;
      getByDisplayValue(document, story.title);
      getByDisplayValue(document, story.body);
      getByRole(document, "button", { name: "Guardar" });
    });

    it("should respond with status code 404", async () => {
      mockFindById.mockReturnValue(Promise.resolve(null));

      const response = await request(app).get("/update-story/404").expect(404);
    });

    it("should respond with Ups have a error when throw exception", async () => {
      mockFindById.mockRejectedValueOnce(new Error("Problems on database"));

      const response = await request(app).get("/update-story/123").send();

      expect(response.body).toBe("Ups have a error");
    });

    it("should redirect to /story/id", async () => {
      mockFindById.mockReturnValueOnce(
        Promise.resolve({ ...story, save: Story.prototype.save })
      );
      const response = await request(app).put("/story").send(story).expect(302);
      expect(response.header.location).toBe(`/story/${story.id}`);
      expect(Story.prototype.save).toHaveBeenCalled();
      expect(mockFindById).toHaveBeenCalledWith(story.id);
    });

    it("should respond with Ups have a error when throw exception", async () => {
      mockFindById.mockRejectedValueOnce(new Error("Problems on database"));

      const response = await request(app).put("/story").send(story);

      expect(response.body).toBe("Ups have a error");
    });
  });
});
