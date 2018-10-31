import axios from 'axios';
import * as utils from './utils';

const BASE_URL = `https://steve-news.herokuapp.com/api`;

export const getArticles = async (topic) =>{
  const URL = topic ? `${BASE_URL}/topics/${topic}/articles` : `${BASE_URL}/articles`;
  const { data } = await axios.get(URL);
  data.articles = utils.addKeysToArticles(data.articlesWithCommentCounts)
  return data.articles
}

export const getArticle = async (articleId) =>{
    const { data } = await axios.get(`${BASE_URL}/articles/${articleId}`);
    data.articleWithCommentCount.topic = utils.createTopicKey(data.articleWithCommentCount);
    return data.articleWithCommentCount;
  }

  export const getArticleComments = async (articleId) =>{
    const { data } = await axios.get(`${BASE_URL}/articles/${articleId}/comments`);
    data.comments = utils.addKeysToComments(data.comments)
    return data.comments;
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