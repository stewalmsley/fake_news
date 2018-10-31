import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { Link } from '@reach/router';
import ArticleComments from './ArticleComments';

class FullArticle extends Component {
    state = {
        article: {},
        loaded: false
    };
    render() {
        const { loaded } = this.state;
        const { topic, title, created_at, created_by, belongs_to, body, commentCount} = this.state.article;
        return <div>
        {loaded && <h1><span className="topic"><Link to={`/topics/${belongs_to}/articles`}>{topic}: </Link></span> {title}</h1>}
        {loaded && <h2> {created_by.name} {created_at}  </h2>}
        {loaded && <p> {body}  </p>}
        <ArticleComments loaded={loaded} commentCount={commentCount} articleId={this.props.articleId}></ArticleComments>
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

FullArticle.propTypes = {
    articleId: PropTypes.string,
};

export default FullArticle;