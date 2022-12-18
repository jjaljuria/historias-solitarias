import { describe, it, expect } from "vitest";
import truncate from "./truncate";

describe("Truncate helper", () => {
  const text: string = "12345678910";

  it("should return text cuted out with the limit number of the characters and add ... at end", () => {
    const limit: number = 10;
    expect(truncate(text, limit)).toBe("1234567891...");
  });

  it("should if string end with space remove el space", () => {
    const limit = 5;
    const text = "1234 567";
    expect(truncate(text, limit)).toBe("1234...");
  });

  it("should if text entry is less or equal that limit", () => {
    const limit = 5;
    const text = "12345";

    expect(truncate(text, limit)).toBe(text);
  });
});
