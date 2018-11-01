import axios from 'axios';
import * as utils from './utils';

const BASE_URL = `https://steve-news.herokuapp.com/api`;

export const getArticles = async (topic) =>{
  const URL = topic ? `${BASE_URL}/topics/${topic}/articles` : `${BASE_URL}/articles`;
  const { data } = await axios.get(URL);
  data.articles = utils.addKeysToArticles(data.articlesWithCommentCounts)
  return data.articles
}

export const getArticle = async (articleId) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${articleId}`);
    data.articleWithCommentCount.topic = utils.createTopicKey(data.articleWithCommentCount);
    return data.articleWithCommentCount;
  }

export const deleteArticle = async (articleId) => {
  const { status } = await axios.delete(`${BASE_URL}/articles/${articleId}`);
  return status;
}

  export const getArticleComments = async (articleId) => {
    const { data } = await axios.get(`${BASE_URL}/articles/${articleId}/comments`);
    data.comments = utils.addKeysToComments(data.comments)
    return data.comments;
  }

  export const deleteComment = async (commentId) => {
    const { status } = await axios.delete(`${BASE_URL}/comments/${commentId}`);
    return status;  
  }

  export const getUser = async (username) => {
    const { data } = await axios.get(`${BASE_URL}/users/${username}`);
    data.articles = utils.addKeysToArticles(data.articlesWithCommentCounts)
    return data;
  }

  export const getUsers = async () => {
    const { data } = await axios.get(`${BASE_URL}/users`)
    return data.users
  }

  export const getRandomUser = async () => {
    const users = await getUsers()
    const length = users.length
    const randomIndex = Math.floor(Math.random() * length);
    return users[randomIndex]
  }

  export const getTopics = async() => {
    const { data } = await axios.get(`${BASE_URL}/topics`)
    return data.topics
  }

  export const postArticle = async(topic_slug, newArticle) => {
    const { data } = await axios.post(`${BASE_URL}/topics/${topic_slug}/articles`, newArticle)
    return data.articleWithCommentCount
  } 

  export const postComment = async(articleId, newComment) => {
    const { data } = await axios.post(`${BASE_URL}/articles/${articleId}/comments`, newComment)
    data.comment.croppedBody = utils.addCroppedBody(data.comment.body, 20)
    return data.comment
  } 

  export const patchCommentVotes = async(commentId, newVotes) => {
    const direction = newVotes === 1 ? "up" : "down"
    const { status } = await axios.patch(`${BASE_URL}/comments/${commentId}?vote=${direction}`)
    return status
  }

  export const patchArticleVotes = async(articleId, newVotes) => {
    const direction = newVotes === 1 ? "up" : "down"
    const { status } = await axios.patch(`${BASE_URL}/articles/${articleId}?vote=${direction}`)
    return status
  }