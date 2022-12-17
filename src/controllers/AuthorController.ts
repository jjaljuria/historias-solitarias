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
        body: faker.lorem.paragraphs(5),
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

export const logout: RequestHandler = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.trace(err);
    }

    res.redirect("/");
  });
};

export const verifyAuthor: RequestHandler = (req, res) => {
  return res.redirect("/");
};

export const editAuthor: RequestHandler = async (req, res) => {
  try {
    const author = await Author.findOne();
    return res.render("editAuthor", { author });
  } catch (err) {
    return res.json("Ups have a problem on server");
  }
};

export const updateAuthor: RequestHandler = async (req, res) => {
  const { username, description } = req.body;

  try {
    const author = await Author.findOne();

    if (!author) {
      return res.sendStatus(404);
    }

    author.username = username;
    author.description = description;

    await author.save();
  } catch (err) {
    return res.json("Ups have a error on server when save changes");
  }
  return res.sendStatus(204);
};
