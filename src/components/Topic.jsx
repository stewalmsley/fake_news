import React, { Component } from 'react';
import ArticleSnapshot from './ArticleSnapshot';
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';

class Topic extends Component {
    state = {
        articles: [],
    }
    render() {
        const { articles } = this.state;
        console.log(this.props)
        return (
            <div>
                {articles.map(article => {
                    return <ArticleSnapshot key={article._id} article={article}></ArticleSnapshot>
                 })}
            </div>
        );
    }
    componentDidMount() {
        this.fetchArticles();
      }

    fetchArticles() {
        api.getArticles(this.props.topic_slug)
        .then(articles  => {
            const croppedArticles = utils.cropArticleBodies(articles);
            const sortedArticles = utils.sortArticles(croppedArticles);
            this.setState ({
                articles : sortedArticles,
            })
        })
    }
}

Topic.propTypes = {

};

export default Topic;