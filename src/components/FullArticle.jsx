import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { Link } from '@reach/router';
import ArticleComments from './ArticleComments';
import Delete from './Delete';
import Vote from './Vote';
import { navigate } from '@reach/router';

class FullArticle extends Component {
    state = {
        article: {},
        loaded: false, 
        deleted: false
    };
    render() {
        const { loaded, deleted } = this.state;
        const { topic, title, dayjsDate, created_by, belongs_to, body, commentCount, votes} = this.state.article;
        const { user, articleId } = this.props;
        return <div>
        {(loaded && created_by._id === user._id) && <Delete deleteItem={this.deleteArticle}></Delete> }
        {(deleted) && <h5>Article Deleted</h5> }
        {loaded && <h1><span className="topic"><Link to={`/topics/${belongs_to}/articles`}>{topic}: </Link></span> {title}</h1>}
        {loaded && <h2> {created_by.name} {dayjsDate}  </h2>}
        {loaded && <Vote user_id={user._id} author_id ={created_by._id} updateVotes={this.updateVotes} votes={votes}></Vote>}
        {loaded && <p> {body}  </p>}
        {loaded && <ArticleComments loaded={loaded} commentCount={commentCount} articleId={articleId} user={user}></ArticleComments>}
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
        .catch(err => {
            navigate('/error', { replace: true, state: {
                code: 404}})
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

    updateVotes = (id, voteChange) => {
        api.patchArticleVotes(id, voteChange)
    }
}

FullArticle.propTypes = {
    articleId: PropTypes.string,
    user: PropTypes.object.isRequired
};

export default FullArticle;