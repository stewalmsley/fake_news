import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class FullArticle extends Component {
    state = {
        article: {},
        comments: {},
        loaded: false
    };
    render() {
        const { loaded } = this.state;
        const { title, created_by, created_at} = this.state.article;
        return <div>
        {loaded && <h1>{title}</h1>}
        {loaded && <h2>{created_by.name} { " " } {created_at}  </h2>}
        
        </div>
        
    }
    componentDidMount() {
        this.fetchArticle();
      }

    fetchArticle() {
        api.getArticle(this.props.articleId)
        .then(article => {
            this.setState ({
                article,
                loaded: true
            })

        })
    }
}

export default FullArticle;