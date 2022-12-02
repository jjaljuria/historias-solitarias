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
    let newAuthor = await Author.findOne({ name: "jose" });
    if (!newAuthor) {
      newAuthor = await Author.create({
        name: "jose",
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
