import { Schema, model, ObjectId, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAuthorModel extends Model<IAuthor> {
  encryptPassword(password: string): string;
  matchPassword(password: string): boolean;
}

export interface IAuthor {
  username: string;
  password: string;
  description: string;
}

const authorSchema: Schema = new Schema<IAuthor>(
  {
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

authorSchema.statics.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

authorSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const Author = model<IAuthor, IAuthorModel>("Author", authorSchema);
