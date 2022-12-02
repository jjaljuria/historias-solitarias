import { describe, it, expect } from "vitest";
import hbs from "express-handlebars";
import { screen, getAllByText } from "@testing-library/dom";
import request from "supertest";
import { app } from "../index";
import { Window } from "happy-dom";

const homeHTML = await hbs
  .create({
    extname: ".hbs",
    defaultLayout: false,
  })
  .render("src/views/index.hbs");

const window = new Window();
const document = window.document;
document.body.innerHTML = homeHTML;

describe('route "/" home', () => {
  it("show page", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("show anything", () => {
    getAllByText(document, "jjaljuria");
  });
});
