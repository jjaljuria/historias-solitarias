import { describe, expect, it, vi, beforeEach } from "vitest";
import * as AuthorController from "./AuthorController";
import { Author } from "../models/Author";
import request from "supertest";
import { app } from "../app";
import { getByRole, getByText } from "@testing-library/dom";
import { Window } from "happy-dom";
import UserEvent from "@testing-library/user-event";

const window = new Window();
const document = window.document;

vi.mock("../models/Author");

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

  describe("edit author info", () => {
    Author.findOne = vi.fn();
    const saveMock = vi.fn();

    const author = {
      username: "juan",
      description: "description number two",
      save: saveMock,
    };

    it("should show edit author info page", async () => {
      const response = await request(app).get("/edit-author").expect(200);
    });

    it("should page have a form with username, description inputs and button Guardar", async () => {
      const response = await request(app).get("/edit-author").send();
      document.body.innerHTML = response.text;

      getByRole(document, "textbox", { name: "Nombre de Usuario" });
      getByRole(document, "textbox", { name: "Descripción" });
      getByRole(document, "button", { name: "Guardar" });
    });

    it("should show current author info", async () => {
      Author.findOne.mockReturnValueOnce(author);

      const response = await request(app).get("/edit-author");
      document.body.innerHTML = response.text;

      const username = getByRole<HTMLInputElement>(document, "textbox", {
        name: "Nombre de Usuario",
      });
      const description = getByRole<HTMLTextAreaElement>(document, "textbox", {
        name: "Descripción",
      });

      expect(username.value).toBe(author.username);
      expect(description.textContent).toBe(author.description);
    });

    it("should show Ups have a problem on server", async () => {
      Author.findOne.mockRejectedValueOnce(new Error("Problems"));

      const response = await request(app).get("/edit-author");

      expect(response.body).toBe("Ups have a problem on server");
    });

    it("should get el author and save his new info", async () => {
      Author.findOne.mockReturnValueOnce(Promise.resolve(author));

      const response = await request(app).put("/author").expect(204);

      expect(Author.findOne).toHaveBeenCalled();
      expect(saveMock).toHaveBeenCalled();
    });

    it("should if ocurr one exception respond with Ups have a error on server when save changes", async () => {
      Author.findOne.mockRejectedValueOnce(new Error("Problems"));

      const response = await request(app).put("/author").send(author);

      expect(response.body).toBe(
        "Ups have a error on server when save changes"
      );
    });
  });
});
