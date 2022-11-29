import { Schema, model, ObjectId } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAuthor {
  _id: ObjectId;
  name: string;
  password: string;
  description: string;
}

const authorSchema: Schema = new Schema<IAuthor>(
  {
    name: {
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

authorSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(100);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

authorSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const Author = model<IAuthor>("Author", authorSchema);
