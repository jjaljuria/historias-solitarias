import { describe, expect, it, vi, beforeEach } from "vitest";
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

    it("should response with a 200 status code when login page loaded", async () => {
      const response: request.Response = await request(app)
        .get("/login")
        .send();
      expect(response.statusCode).toBe(200);
    });

    it("should when success authenticate redirect to / ", async () => {
      const author = {
        id: "12345",
        username: "jose",
        password: "12345",
        description: "",
        matchPassword: (password: boolean) => Promise.resolve(true),
      };

      const mockFindOne = vi.spyOn(Author, "findOne");
      mockFindOne.mockReturnValueOnce(author);
      const response = await request(app).post("/login").send(author);
      expect(response.redirect).toBeTruthy();
      expect(response.header.location).toBe("/");
    });

    it("should when fail authenticate redirect to /login", async () => {
      const bodyData = [{ username: "username" }, { password: "password" }];

      for (const body of bodyData) {
        const response = await request(app).post("/login").send(body);
        expect(response.redirect).toBeTruthy();
        expect(response.header.location).toBe("/login");
      }
    });
  });
});
