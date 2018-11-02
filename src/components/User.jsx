import React, { Component } from 'react';
import Avatar from './Avatar'
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import Articles from './Articles';
import { Link } from '@reach/router';
import Comments from './Comments.jsx';
import { navigate } from '@reach/router';
import Sort from './Sort'

class User extends Component {
    state = {
        userProfile: {},
        comments: [],
        articles: [],
        loaded: false, 
        selected: "articles"
    }
    render() {
        const { loaded, articles, userProfile, comments } = this.state;
        const { name, avatar_url, username } = userProfile;
        const { content, user } = this.props
        if (!loaded) return <div className="loader"></div>
        return (
            <main>
                <Avatar avatar_url={avatar_url} height="100px" width="100px"></Avatar>
                {name} ({username})
                <div className="userContentControl">
                    <Sort content={content} updateSort={this.updateSort}></Sort>
        <div>{content==="comments" && <Link to={`/users/${username}/articles`}>Show {name}'s Articles</Link>}{" "}
        {content==="articles" && <Link to={`/users/${username}/comments`}>Show {name}'s Comments</Link>}</div>
                    </div>
                <div>
                  {content === "articles" && <Articles source="user" articles={articles} userProfile={userProfile} user={user} />}
                  {content === "comments" && <Comments source="user" comments={comments} userProfile={userProfile} user={user} />}
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
                userProfile: user,
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

    updateSort = event => {
        const items = this.props.content
        const sortedItems = utils.sortArticlesOrComments(this.state[items], event.target.value)
        this.setState({
            [items]: sortedItems
        })
      }
}

User.propTypes = {
    username: PropTypes.string, 
    content: PropTypes.string
};

export default User;