import React, { Component } from 'react';
import ArticleSnapshot from './ArticleSnapshot';
import Avatar from './Avatar'
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import Articles from './Articles';

class User extends Component {
    state = {
        user: {},
        comments: [],
        articles: [],
        loaded: false, 
        selected: "articles"
    }
    render() {
        const { loaded, articles, user } = this.state;
        const { name, avatar_url, username } = user;
        return (
            <main>
                {loaded && <h2>{name} ({username})</h2>}
                {loaded && <Avatar avatar_url={avatar_url}></Avatar>}
                <div>
                  <Articles articles={articles} user={user} />
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