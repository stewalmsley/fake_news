import axios from 'axios';
const BASE_URL = `https://steve-news.herokuapp.com/api`;

export const getArticles = async (topic) =>{
  const URL = topic ? `${BASE_URL}/topics/${topic}/articles` : `${BASE_URL}/articles`;
  const { data } = await axios.get(URL);
  data.articles = data.articlesWithCommentCounts.map(article => {
    const topic = article.belongs_to[0].toUpperCase() + article.belongs_to.substring(1);
    return {...article, topic}
  })
  return data.articles
}

export const getArticle = async (articleId) =>{
    const { data } = await axios.get(`${BASE_URL}/articles/${articleId}`);
    return data.articleWithCommentCount;
  }

  export const getUser = async (username) =>{
    const { data } = await axios.get(`${BASE_URL}/users/${username}`);
    return data;
  }