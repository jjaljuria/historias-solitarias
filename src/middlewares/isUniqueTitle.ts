import { RequestHandler } from "express";
import { Story } from "../models/Story";

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}

export const isUniqueTitle: RequestHandler = async (req, res, next) => {
  const { title } = req.body;

  try {
    const story = await Story.findOne({ title });
    if (!story) next();
  } catch (err) {
    console.trace(err);
    return res.json("Upss hubo un problema con la base de datos.");
  }

  req.session.messages = [];
  req.session.messages.push("Story exist yet");
  return res.redirect("/new-story");
};
