import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../app";
import { IAuthor, Author } from "../models/Author";
import { Story, IStory } from "../models/Story";

const author: IAuthor = {
  username: "jose",
  password: "123",
  description: "lorem ipsup",
};

const story: IStory = new Story({
  title: "titulo",
  text: "lorem",
  author: "123456789",
});

vi.spyOn(Author, "findOne");
vi.spyOn(Story, "find");

describe('route "/" home', () => {
  it("show page", async () => {
    Author.findOne.mockReturnValueOnce(author);
    Story.find = () => ({
      limit: (lim: number) => ({ sort: () => Promise.resolve(story) }),
    });

    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
