import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class FullArticle extends Component {
    state = {
        article: {}
    };
    render() {
        return <h1>{this.state.article.title}</h1>
    }
    componentDidMount() {
        this.fetchArticle();
      }

    fetchArticle() {
        api.getArticle(this.props.articleId)
        .then(article => {
            this.setState ({
                article
            })
        })
    }
}

export default FullArticle;