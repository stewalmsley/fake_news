describe("home", () => {
  beforeEach(() => {
    cy.server();
    cy.fixture("testData").then(testData => {
      const {
        article1,
        article2,
        article3,
        article4,
        comment,
        jonny,
        mitch,
        newTitle,
        newBody,
        topics
      } = testData;
      cy.route({
        method: "GET",
        url: "/api/articles",
        response: {
          articlesWithCommentCounts: [article1, article2, article3, article4],
          topicsAndAuthors: {
            topics,
            authors: [ jonny, mitch ]
          }
        }
      });
      cy.route({
        method: "GET",
        url: "/api/articles/4",
        response: {
          articleWithCommentCount: article4
        }
      });
      cy.route({
        method: "GET",
        url: "/api/users",
        response: {
          users: [jonny, mitch]
        }
      });
      cy.route({
        method: "GET",
        url: "/api/topics",
        response: {
          topics
        }
      });
      cy.route({
        method: "POST",
        url: "/api/topics/cats/articles",
        response: {
          articleWithCommentCount: {
            title: newTitle,
            body: newBody,
            _id: "5",
            created_by: mitch,
            belongs_to: "cats",
            created_at: 1514093931240, 
            votes: 0
          }
        }
      });
      cy.route({
        method: "GET",
        url: "/api/articles/5",
        response: {
          article: {
            title: newTitle,
            body: newBody,
            _id: "5",
            created_by: mitch,
            votes: 0,
            commentCount: 0
          }
        }
      });
      cy.route({
        method: "GET",
        url: "/api/articles/4/comments",
        response: {
          comments: [comment]
        }
      });
      cy.route({
        method: "GET",
        url: "/api/users/butter_bridge",
        response: {
          user: jonny,
          articlesWithCommentCounts: [article1, article3],
          comments: [comment]
        }
      });
      cy.route({
        method: "GET",
        url: "/api/topics/cats/articles",
        response: { articlesWithCommentCounts: [article3, article4] }
      });
      cy.route({
        method: "POST",
        url: "/api/articles/4/comments",
        response: {
          comment: {
            body: "this is another comment",
            _id: 2,
            created_by: jonny,
            created_at: 1514093931240
          }
        }
      });
      cy.route({
        method: "PATCH",
        url: "/api/articles/4?vote=up",
        response: {
          articleWithCommentCount: { ...article4, votes: 1 }
        }
      });
      cy.route({
        method: "PATCH",
        url: "/api/articles/4?vote=down",
        response: {
          articleWithCommentCount: { ...article4, votes: 0 }
        }
      });
    });
    cy.visit("http://localhost:3000");
  });
  describe("header", () => {
    it("the header loads with the app name", () => {
      cy.get("header")
        .get("h1")
        .should("contain", "Fake News");
    });
    it("a random user is logged in", () => {
      cy.get("header")
        .get(".hello")
        .get(".username");
      expect(".username").to.be.a("string");
    });
  });
  describe("nav", () => {
    it("clicking on login/switch user navigates to the login page - logged in user can be changed", () => {
      cy.get(".navbutton")
        .eq(1)
        .click();
      cy.url().should("contain", "/login");
      cy.visit("http://localhost:3000/login");
      cy.get('select[name="switchUser"]').select("Mitch");
      cy.get('form[name="switchUser"]')
        .submit();
      cy.get("header")
        .get(".hello")
        .get(".username")
        .should("contain", "dedekind561");
    });
    it("clicking on Create Article navigates to the create page and allows for posting of an article", () => {
      cy.fixture("testData").then(testData => {
        const { newTitle, newBody } = testData;
        cy.get(".navbutton")
          .eq(0)
          .click();
        cy.url().should("contain", "/create");
        cy.visit("http://localhost:3000/create");
        cy.get('select[name="topic_slug"]').select("Cats");
        cy.get("textarea")
          .eq(0)
          .type(newTitle);
        cy.get("textarea")
          .eq(1)
          .type(newBody);
        cy.get('form[name="createArticle"]').submit();
        cy.url().should("contain", "/articles/5");
        cy.visit("http://localhost:3000/articles/5");
        cy.get(".created").should("contain", "Article Created");
        cy.get("h2").should("contain", newTitle);
      });
    });
  });
  describe("home page", () => {
    it("shows all articles", () => {
      cy.get(".article").should("have.length", 4);
    });
    it("shows articles in order of commentCount", () => {
      cy.get(".article")
        .eq(0)
        .get(".title")
        .should("contain", "UNCOVERED");
    });
    it("articles can be reordered using the sort dropdown", () => {
      cy.get('select[name="sort"]')
        .select("votes");
      cy.get(".article")
        .eq(0)
        .get(".title")
        .should("contain", "They're not exactly dogs");
    });
  });
  describe("article detailed view", () => {
    it("shows the full article body and comments, allows for posting of comments", () => {
      cy.fixture("testData").then(testData => {
        const { article4 } = testData;
        cy.get(".article")
          .eq(0)
          .get(".title")
          .eq(0)
          .click();
        cy.url().should("contain", "/articles/4");
        cy.visit("http://localhost:3000/articles/4");
        cy.get("p").should("contain", article4.body);
        cy.get(".comment").should("have.length", 1);
        cy.get("textarea").type("this is another comment");
        cy.get('form[name="addComment"]').submit();
        cy.get(".comment").should("have.length", 2);
      });
    });
  });
  describe("user profile", () => {
    it("shows the user's articles and comments", () => {
      cy.get(".butter_bridge")
        .click();
      cy.url().should("contain", "/users/butter_bridge/articles");
      cy.visit("http://localhost:3000/users/butter_bridge/articles");
      cy.get(".article").should("have.length", 2);
      cy.get(".commentsLink").click();
      cy.url().should("contain", "/users/butter_bridge/comments");
      cy.visit("http://localhost:3000/users/butter_bridge/comments");
      cy.get(".comment").should("have.length", 1);
    });
  });
  describe("topic view", () => {
    it("shows all articles for a given topic", () => {
      cy.get(".topic")
        .eq(1)
        .click();
      cy.url().should("contain", "/topics/cats/articles");
      cy.visit("http://localhost:3000/topics/cats/articles");
      cy.get(".article").should("have.length", 2);
    });
  });
  describe("voting", () => {
    it("allows users to vote up or down, and reset, only if they did not create the article", () => {
      cy.visit("http://localhost:3000/login");
      cy.get('select[name="switchUser"]').select("Jonny");
      cy.get('form[name="switchUser"]')
        .submit();
      cy.get(".voteUp")
        .eq(0)
        .click();
      cy.get(".votes")
        .eq(0)
        .should("contain", 1);
      cy.get(".reset")
        .eq(0)
        .click();
      cy.get(".votes")
        .eq(0)
        .should("contain", 0);
      cy.get(".voteDown")
        .eq(0)
        .click();
      cy.get(".votes")
        .eq(0)
        .should("contain", -1);
    });
  });
});
