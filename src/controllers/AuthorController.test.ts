import { describe, expect, it, vi } from "vitest";
import * as AuthorController from "./AuthorController";
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

describe("AuthorController", () => {
  it("AuthorController.ts has been defined", () => {
    expect(AuthorController).toBeDefined();
  });

  it("should AuthorController has getAuthor static method", () => {
    expect(AuthorController.getAuthor).toBeDefined();
  });

  describe("Login Page", () => {
    it("should exist AuthorController.login", () => {
      expect(AuthorController.login).toBeDefined();
    });
  });
});
