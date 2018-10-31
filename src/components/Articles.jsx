import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import ArticleSnapshot from './ArticleSnapshot';

class Articles extends Component {
    state = {
        articles: []
    };
    render() {
        return <div>{this.state.articles.map(article => {
        return <ArticleSnapshot key={article._id} article={article}></ArticleSnapshot>
        })}</div>
    }
    componentDidMount() {
        this.fetchArticles();
      }

    fetchArticles() {
        api.getArticles()
        .then(articles => {
            const sortedArticles = utils.sortArticlesOrComments(articles, "commentCount");
            this.setState ({
                articles: sortedArticles
            })
        })
    }
}

export default Articles;