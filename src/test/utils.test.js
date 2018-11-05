const {
  sortArticlesOrComments,
  addKeysToArticles,
  addKeysToComments,
  createCroppedBody,
  createTopicKey,
  convertTime
} = require("../utils");

describe("sortArticlesOrComments()", () => {
  const obj1 = {
    title: "article1",
    commentCount: 0,
    votes: 1,
    created_at: "01/01/2018"
  };
  const obj2 = {
    title: "article2",
    commentCount: 1,
    votes: 2,
    created_at: "01/01/2016"
  };
  const obj3 = {
    title: "article3",
    commentCount: 2,
    votes: 0,
    created_at: "01/01/2017"
  };
  const originalArr = [obj1, obj2, obj3];
  const arrSortedByVotes = [obj2, obj1, obj3];
  const arrSortedByComments = [obj3, obj2, obj1];
  const arrSortedByDate = [obj1, obj3, obj2];
  it("returns an array of objects ordered by the provided key", () => {
    expect(sortArticlesOrComments(originalArr, "votes")).toEqual(
      arrSortedByVotes
    );
    expect(sortArticlesOrComments(originalArr, "commentCount")).toEqual(
      arrSortedByComments
    );
    expect(sortArticlesOrComments(originalArr, "created_at")).toEqual(
      arrSortedByDate
    );
  });
  it("returns a blank array when provided with a blank array", () => {
    expect(sortArticlesOrComments([], "votes")).toEqual([]);
  });
  it("does not mutate the original array", () => {
    sortArticlesOrComments(originalArr);
    expect(originalArr).not.toEqual(arrSortedByVotes);
  });
});

describe("addKeysToArticles()", () => {
  const originalArr = [
    {
      body: "this is a test article",
      title: "test",
      created_at: "01/01/2018",
      belongs_to: "football"
    }
  ];
  it("adds all relevant keys to array of article objects", () => {
    expect(addKeysToArticles(originalArr)[0].croppedBody).toBe(
      "this is a test article"
    );
    expect(addKeysToArticles(originalArr)[0].topic).toBe("Football");
    expect(typeof addKeysToArticles(originalArr)[0].dayjsDate).toBe("string");
  });
  it("returns a blank array when provided with a blank array", () => {
    expect(addKeysToArticles([])).toEqual([]);
  });
  it("does not mutate the original array", () => {
    addKeysToArticles(originalArr);
    expect(originalArr.croppedBody).toBe(undefined);
  });
});

describe("addKeysToComments()", () => {
  const originalArr = [
    { body: "this is a test comment", created_at: "01/01/2018" }
  ];
  it("adds all relevant keys to array of comment objects", () => {
    expect(addKeysToComments(originalArr)[0].croppedBody).toBe(
      "this is a test comment"
    );
    expect(typeof addKeysToComments(originalArr)[0].dayjsDate).toBe("string");
  });
  it("returns a blank array when provided with a blank array", () => {
    expect(addKeysToComments([])).toEqual([]);
  });
  it("does not mutate the original array", () => {
    addKeysToComments(originalArr);
    expect(originalArr.croppedBody).toBe(undefined);
  });
});

describe("createCroppedBody()", () => {
  it("returns the first n words of a string plus three dots if the string was longer than n words", () => {
    expect(createCroppedBody("this is a test", 2)).toBe("this is...");
  });
  it("returns an empty string unchanged", () => {
    expect(createCroppedBody("", 2)).toBe("");
  });
  it("returns a string unchanged if it has fewer than n words", () => {
    expect(createCroppedBody("this is a test string", 20)).toBe(
      "this is a test string"
    );
  });
});

describe("createTopicKey()", () => {
  it("returns a string with the first letter capitalized, when provided with an object with the belongs_to property", () => {
    expect(createTopicKey({ belongs_to: "coding" })).toBe("Coding");
  });
  it("returns an empty string if the object key contains an empty string or is not present", () => {
    expect(createTopicKey({ belongs_to: "" })).toBe("");
    expect(createTopicKey({})).toBe("");
  });
  it("returns a string with capitalised first letter unchanged", () => {
    expect(createTopicKey({ belongs_to: "Coding" })).toBe("Coding");
  });
});

describe("convertTime()", () => {
  it("returns a string when provided with an object containing a created_at key with a date/time", () => {
    expect(typeof convertTime({ created_at: "01/01/2018" })).toBe("string");
  });
  it("returns an empty string when the created_at key is missing", () => {
    expect(convertTime({})).toBe("");
  });
});
