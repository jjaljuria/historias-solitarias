import { IAuthor, Author } from "../models/Author";
import moongose from "mongoose";

export default class UserController {
  static async getAuthor(id: string) {
    const author = (await Author.findById(id)) ?? null;
    return author;
  }
}
