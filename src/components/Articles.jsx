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
        return <ArticleSnapshot key={article._id} article={article}></ArticleSnapshot>
        })}</div>
    }
    componentDidMount() {
        this.fetchArticles();
      }

    fetchArticles() {
        api.getArticles()
        .then(articles => {
            const croppedArticles = this.cropArticleBodies(articles);
            const sortedArticles = this.sortArticles(croppedArticles);
            this.setState ({
                articles: croppedArticles
            })
        })
    }

    cropArticleBodies(articles) {
        return articles.map(article => {
            const body = article.body.split(' ').slice(0, 50).join(' ');
            return {...article, body};
        })
    }

    sortArticles(articles) {
        return articles.sort((article1, article2) => {
            return article2.commentCount - article1.commentCount
        })
    }
}

export default Articles;