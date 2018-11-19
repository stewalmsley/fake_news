import axios from "axios";
import * as utils from "./utils";

const BASE_URL = `https://steve-news.herokuapp.com/api`;

export const getArticles = async topic => {
  const URL = topic
    ? `${BASE_URL}/topics/${topic}/articles`
    : `${BASE_URL}/articles`;
  const { data } = await axios.get(URL);
  const { articlesWithCommentCounts, topicsAndAuthors } = data;
  const articles = utils.addKeysToArticles(articlesWithCommentCounts);
  if (topic) return { articles };
  const { topics, authors } = topicsAndAuthors
  const topicsWithTitle = utils.addTitleKeyToTopics(topics)
  return { articles, authors, topicsWithTitle };
};

export const getArticle = async articleId => {
  const { data } = await axios.get(`${BASE_URL}/articles/${articleId}`);
  data.articleWithCommentCount.topic = utils.createTopicKey(
    data.articleWithCommentCount
  );
  data.articleWithCommentCount.dayjsDate = utils.convertTime(
    data.articleWithCommentCount
  );
  return data.articleWithCommentCount;
};

export const deleteArticle = async articleId => {
  const { status } = await axios.delete(`${BASE_URL}/articles/${articleId}`);
  return status;
};

export const getArticleComments = async articleId => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${articleId}/comments`
  );
  data.comments = utils.addKeysToComments(data.comments);
  return data.comments;
};

export const deleteComment = async commentId => {
  const { status } = await axios.delete(`${BASE_URL}/comments/${commentId}`);
  return status;
};

export const getUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  data.articles = utils.addKeysToArticles(data.articlesWithCommentCounts);
  data.comments = utils.addKeysToComments(data.comments);
  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data.users;
};

export const getRandomUser = async () => {
  const users = await getUsers();
  const length = users.length;
  const randomIndex = Math.floor(Math.random() * length);
  return users[randomIndex];
};

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

export const postArticle = async (topic_slug, newArticle) => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${topic_slug}/articles`,
    newArticle
  );
  data.articleWithCommentCount.dayjsDate = utils.convertTime(
    data.articleWithCommentCount
  );
  return data.articleWithCommentCount;
};

export const postComment = async (articleId, newComment) => {
  const { data } = await axios.post(
    `${BASE_URL}/articles/${articleId}/comments`,
    newComment
  );
  data.comment.croppedBody = utils.createCroppedBody(data.comment.body, 20);
  return data.comment;
};

export const patchVotes = async (id, newVotes, contentType) => {
  const direction = newVotes === 1 ? "up" : "down";
  const URL =
    contentType === "article"
      ? `${BASE_URL}/articles/${id}?vote=${direction}`
      : `${BASE_URL}/comments/${id}?vote=${direction}`;
  const { status } = await axios.patch(URL);
  return status;
};
