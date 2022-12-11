import { RequestHandler } from "express";
import { Story } from "../models/Story";

export const getStories: RequestHandler = async (req, res) => {
  const defaultOffset: string = "0";
  const limit: number = 5;
  const offset: number = parseInt(
    (req.query.offset ?? defaultOffset) as string
  );

  if (isNaN(offset) || offset < 0) {
    return res.json("Offset is not valid").status(500);
  }

  try {
    const stories = await Story.find({})
      .populate("author")
      .skip(offset)
      .limit(limit);
    const storyTotal: number = await Story.count();

    const totalPages: number = Math.ceil(storyTotal / limit);
    const currentPage: number = Math.ceil(offset / limit);

    return res.render("stories", {
      stories: stories,
      pagination: {
        totalStories: storyTotal,
        currentPage,
        totalPages,
        storiesForPage: limit,
      },
    });
  } catch (err) {
    console.trace(err);
    return res.json("Ups have a error");
  }
};

export const getStory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id).populate("author", "name");

  res.render("story", { story });
};

export const newStory: RequestHandler = async (req, res) => {
  return res.render("newStory");
};

export const saveStory: RequestHandler = async (req, res) => {
  const { title, body } = req.body;
  try {
    const newStory = new Story({
      title,
      body,
    });

    await newStory.save();
    return res.redirect(`/story/${newStory.id}`);
  } catch (err) {
    console.trace(err);
    return res.status(500);
  }
};

export const deleteStory: RequestHandler = async (req, res) => {
  const { id } = req.body;
  try {
    const storyDeleted = await Story.findByIdAndDelete(id);
    if (!storyDeleted)
      return res.json("Story that you wanted delete not exist");

    return res.json(storyDeleted);
  } catch (err) {
    console.trace(err);
    return res.send("Ups have a error");
  }
};
