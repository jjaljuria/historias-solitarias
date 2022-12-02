import { RequestHandler } from "express";
import { Story } from "../models/Story";
import { Author } from "../models/Author";

export const home: RequestHandler = async (req, res) => {
  const author = await Author.findOne();

  const stories = await Story.find({ author: author?.id }, null, { limit: 3 });
  res.render("index", {
    author,
    stories,
  });
};
