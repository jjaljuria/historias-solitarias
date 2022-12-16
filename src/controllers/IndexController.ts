import { RequestHandler } from "express";
import { Story } from "../models/Story";
import { Author } from "../models/Author";

export const home: RequestHandler = async (req, res) => {
  const author = await Author.findOne();

  const stories = await Story.find().limit(3).sort({ _id: "desc" });
  res.render("index", {
    author,
    stories,
  });
};
