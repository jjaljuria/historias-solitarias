import { describe, expect, it, vi } from "vitest";
import * as UserController from "./AuthorController";
import { Author } from "../models/Author";
import request from "supertest";
import { app } from "../index";

Author.findById = vi.fn((id: string) => {
  if (id === "000") {
    return null;
  }

  return Promise.resolve({
    name: "jose",
    _id: id,
  });
});

describe("UserController", () => {
  it("UserController.ts has been defined", () => {
    expect(UserController).toBeDefined();
  });

  it("should UserController has getAuthor static method", () => {
    expect(UserController.getAuthor).toBeDefined();
  });

  it("should to give id to getAuthor and it return author model", async () => {
    const response = await request(app).get("/api/author/123").send();
    const author = response.body;
    expect(response.statusCode).toBe(200);
    expect(author._id).toBe("123");
    expect(author.name).toBe("jose");
  });

  it("should to give idAuthor that not exist return null", async () => {
    const response = await request(app).get("/api/author/000").send();
    const author = response.body;
    expect(response.statusCode).toBe(200);
    expect(author).toBeNull();
  });
});
