import { describe, it, expect, vi } from "vitest";
import hbs from "express-handlebars";
import { getAllByText } from "@testing-library/dom";
import request from "supertest";
import { app } from "../index";
import { Window } from "happy-dom";
import { IAuthor, Author } from "../models/Author";
import { Story, IStory } from "../models/Story";
import mongoose from "mongoose";

const author: IAuthor = {
  username: "jose",
  password: "123",
  description: "lorem ipsup",
};

const story: IStory = new Story({
  title: "titulo",
  text: "lorem",
  author: "123456789",
});

const homeHTML = await hbs
  .create({
    extname: ".hbs",
    defaultLayout: false,
  })
  .render("src/views/index.hbs", {
    author,
  });

const window = new Window();
const document = window.document;
document.body.innerHTML = homeHTML;

vi.spyOn(Author, "findOne");
vi.spyOn(Story, "find");

describe('route "/" home', () => {
  it("show page", async () => {
    Author.findOne.mockReturnValueOnce(author);
    Story.find.mockReturnValueOnce(story);

    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("show anything", () => {
    getAllByText(document, "jose");
  });
});
