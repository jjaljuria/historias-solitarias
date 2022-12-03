import { RequestHandler } from "express";
import { Story } from "../models/Story";
import { Author } from "../models/Author";

export const getStories: RequestHandler = async (req, res) => {
  const { limit } = req.query;

  let result = undefined;
  if (limit) {
    result = parseInt(limit as string);

    if (isNaN(result)) {
      return res.json("Limit is not valid").status(500);
    }
  }

  const stories = await Story.find({}, null, {
    limit: result,
  }).populate("author");
  return res.render("stories", { stories: stories });
};

export const getStory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id).populate("author", "name");

  res.render("story", { story });
};
