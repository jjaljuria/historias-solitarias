import { Author } from "../models/Author";
import { RequestHandler } from "express";

export const getAuthor: RequestHandler = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const author = await Author.findById(id);
  return res.json(author);
};
