import { RequestHandler } from "express";
import { Story } from "../models/Story";
import { Author } from "../models/Author";

export const getStories: RequestHandler = async (req, res) => {
  const { author } = req.params;
  const { limit } = req.query;

  let result = undefined;
  if (limit) {
    result = parseInt(limit as string);

    if (isNaN(result)) {
      return res.json("Limit is not valid").status(500);
    }
  }

  const authorFound = await Author.findOne({ name: author });

  if (!authorFound) {
    return res.send("Author not found").status(404);
  }

  const stories = await Story.find({ author: authorFound._id }, null, {
    limit: result,
  }).populate("author");
  return res.json({ stories: stories });
};
