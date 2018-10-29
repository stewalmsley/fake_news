import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import ArticleSnapshot from './ArticleSnapshot';

class Articles extends Component {
    state = {
        articles: []
    };
    render() {
        return <div>{this.state.articles.map(article => {
        return <ArticleSnapshot article={article}></ArticleSnapshot>
        })}</div>
    }
    componentDidMount() {
        this.fetchArticles();
      }

    fetchArticles() {
        api.getArticles()
        .then(articles => {
            this.setState ({
                articles
            })
        })
    }
}

export default Articles;