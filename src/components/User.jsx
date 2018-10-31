import React, { Component } from 'react';
import ArticleSnapshot from './ArticleSnapshot';
import Avatar from './Avatar'
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';

class User extends Component {
    state = {
        user: {},
        comments: [],
        articles: [],
        loaded: false
    }
    render() {
        const { loaded, articles } = this.state;
        const { name, avatar_url, username } = this.state.user;
        return (
            <div>
                {loaded && <h2>{name} ({username})</h2>}
                {loaded && <Avatar avatar_url={avatar_url}></Avatar>}
                {loaded && articles.map(article => {
                    return <ArticleSnapshot key={article._id} article={article}></ArticleSnapshot>
                 })}
            </div>
        );
    }
    componentDidMount() {
        this.fetchUser();
      }

      componentDidUpdate(prevProps) {
        if (prevProps.username !== this.props.username) {
            this.fetchUser();
          }
    }

    fetchUser() {
        api.getUser(this.props.username)
        .then(({ user, articles, comments }) => {
            const croppedArticles = utils.cropArticleOrCommentBodies(articles, 50);
            const sortedArticles = utils.sortArticlesOrComments(croppedArticles, "commentCount");
            this.setState ({
                user,
                articles : sortedArticles,
                comments,
                loaded: true
            })
        })
    }
}

User.propTypes = {
    username: PropTypes.string
};

export default User;