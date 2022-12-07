import { Author } from "../models/Author";
import { RequestHandler } from "express";
import { faker } from "@faker-js/faker";
import { Story } from "../models/Story";

export const getAuthor: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let author = null;
  try {
    author = await Author.findById(id);
  } catch (err) {
    console.error(err);
  }

  return res.json(author);
};

export const logUp: RequestHandler = async (req, res) => {
  try {
    let newAuthor = await Author.findOne({ username: "jose" });
    if (!newAuthor) {
      newAuthor = await Author.create({
        username: "jose",
        description: faker.lorem.paragraph(),
        password: await Author.encryptPassword("12345"),
      });
    }

    for (let i = 0; i < 5; i++) {
      await Story.create({
        title: faker.lorem.words(),
        text: faker.lorem.paragraphs(5),
        author: newAuthor.id,
      });
    }
  } catch (err) {
    return res.json(err);
  }

  return res.send("Success Operation");
};

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}

export const login: RequestHandler = (req, res) => {
  const { messages } = req.session;
  req.session.messages = undefined;
  return res.render("login", { errors: messages });
};

export const verifyAuthor: RequestHandler = (req, res) => {
  return res.redirect("/");
};
