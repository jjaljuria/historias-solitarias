import { Schema, model } from "mongoose";

export interface IStory {
  title: string;
  text: string;
  author: Schema.Types.ObjectId;
  summary?: string;
  createdAt: string;
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
    summary: String,
  },
  {
    timestamps: true,
  }
);

storySchema.pre("save", function (next) {
  this.summary = this.text.substring(0, 240);
  next();
});

export const Story = model<IStory>("Story", storySchema);
