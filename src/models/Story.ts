import { Schema, model, ObjectId } from "mongoose";

export interface IStory {
  title: string;
  text: string;
  author: Schema.Types.ObjectId;
}

const storySchema: Schema = new Schema<IStory>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    timestamps: true,
  }
);

export const Story = model<IStory>("Story", storySchema);
