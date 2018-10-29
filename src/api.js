import axios from 'axios';
const BASE_URL = `https://steve-news.herokuapp.com/api`;

export const getArticles = async () =>{
  const {data} = await axios.get(`${BASE_URL}/articles`);
  return data.articlesWithCommentCounts;
}

export const getArticle = async (articleId) =>{
    const {data} = await axios.get(`${BASE_URL}/articles/${articleId}`);
    return data.articleWithCommentCount;
  }

  export const getUser = async (username) =>{
    const {data} = await axios.get(`${BASE_URL}/users/${username}`);
    return data.user;
  }