import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { Link } from '@reach/router';
import ArticleComments from './ArticleComments';

class FullArticle extends Component {
    state = {
        article: {},
        loaded: false, 
        deleted: false
    };
    render() {
        const { loaded, deleted } = this.state;
        const { _id, topic, title, created_at, created_by, belongs_to, body, commentCount} = this.state.article;
        const { user } = this.props;
        return <div>
        {(loaded && created_by._id === user._id) && <button onClick={this.deleteArticle}>Delete</button> }
        {(deleted) && <h5>Article Deleted</h5> }
        {loaded && <h1><span className="topic"><Link to={`/topics/${belongs_to}/articles`}>{topic}: </Link></span> {title}</h1>}
        {loaded && <h2> {created_by.name} {created_at}  </h2>}
        {loaded && <h2> {_id} </h2>}
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

    deleteArticle = () => {
        api.deleteArticle(this.props.articleId)
        .then(status => {
            if (status < 300)
            this.setState({
            deleted: true
            })
        })
    }
}

FullArticle.propTypes = {
    articleId: PropTypes.string,
    user: PropTypes.object.isRequired
};

export default FullArticle;