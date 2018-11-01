import React, { Component } from 'react';
import ArticleSnapshot from './ArticleSnapshot';
import Avatar from './Avatar'
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import Articles from './Articles';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import Comments from './Comments.jsx';
import { navigate } from '@reach/router';



class User extends Component {
    state = {
        user: {},
        comments: [],
        articles: [],
        loaded: false, 
        selected: "articles"
    }
    render() {
        const { loaded, articles, user, comments } = this.state;
        const { name, avatar_url, username } = user;
        const { content } = this.props
        if (!loaded) return null
        return (
            <main>
                <h2>{name} ({username})</h2>
                <Avatar avatar_url={avatar_url}></Avatar>
                <Link to={`/users/${username}/articles`}>Articles</Link>{" "}
                <Link to={`/users/${username}/comments`}>Comments</Link>
                <div>
                  {content === "articles" && <Articles articles={articles} user={user} />}
                  {content === "comments" && <Comments source="user" comments={comments} user_id={user._id} />}
                </div>
            </main>
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
            const sortedComments = utils.sortArticlesOrComments(comments, "votes");
            this.setState ({
                user,
                articles : sortedArticles,
                comments: sortedComments,
                loaded: true
            })
        })
        .catch(err => {
            navigate('/error', { replace: true, state: {
                code: 404}})
          })
    }
}

User.propTypes = {
    username: PropTypes.string
};

export default User;