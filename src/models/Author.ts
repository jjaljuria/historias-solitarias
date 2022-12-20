import { Schema, model, ObjectId, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAuthorModel extends Model<IAuthor, {}, IAuthorMethods> {
  encryptPassword(password: string): Promise<string>;
}

interface IAuthorMethods {
  matchPassword(password: string): Promise<boolean>;
}

export interface IAuthor {
  username: string;
  password: string;
  description: string;
  email: string;
}

type AuthorModel = Model<IAuthor, {}, IAuthorMethods>;

const authorSchema: Schema = new Schema<IAuthor, AuthorModel, IAuthorMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

authorSchema.statics.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

authorSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const Author = model<IAuthor, IAuthorModel>("Author", authorSchema);
