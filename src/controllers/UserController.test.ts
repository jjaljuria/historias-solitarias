import { describe, expect, it, vi } from "vitest";
import UserController from "./UserController";
import { Author } from "../models/Author";

Author.findById = vi.fn((id: string) => {
  if (id === "") {
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
    const author = await UserController.getAuthor("123");
    expect(author._id).toBe("123");
    expect(author.name).toBe("jose");
  });

  it("should to give idAuthor that not exist return null", async () => {
    const author = await UserController.getAuthor("");
    expect(author).toBeNull();
  });
});
