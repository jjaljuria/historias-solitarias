import { Author } from "../models/Author";
import { RequestHandler } from "express";

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
