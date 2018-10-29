import React, { Component } from 'react';
import ArticleSnapshot from './ArticleSnapshot';
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
        const { loaded, articles, comments } = this.state;
        const { name, avatar_url, username } = this.state.user
        return (
            <div>
                {loaded && <h2>{name} ({username})</h2>}
                {loaded && <img src={avatar_url}></img>}
                {loaded && articles.map(article => {
                    return <ArticleSnapshot key={article._id} article={article}></ArticleSnapshot>
                 })}
            </div>
        );
    }
    componentDidMount() {
        this.fetchUser();
      }

    fetchUser() {
        api.getUser(this.props.username)
        .then(({ user, articlesWithCommentCounts, comments }) => {
            const croppedArticles = utils.cropArticleBodies(articlesWithCommentCounts);
            const sortedArticles = utils.sortArticles(croppedArticles);
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

};

export default User;