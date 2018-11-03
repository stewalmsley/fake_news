import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import Articles from './Articles';
import { navigate } from '@reach/router';

class Topic extends Component {
    state = {
        articles: [],
        loaded: false
    }
    render() {
        const { user, topic_slug } = this.props
        const { articles, loaded} = this.state
        if (!loaded) return <div className="loader"></div>
        return <div>
        <main>   <Articles source="topic" updateSort={this.updateSort} topic_slug={topic_slug} articles={articles} user={user} />
          </main>
      </div>
    }
    componentDidMount() {
        this.fetchArticles();
      }
    
    componentDidUpdate(prevProps) {
        if (prevProps.topic_slug !== this.props.topic_slug) {
            this.fetchArticles();
          }
    }

    fetchArticles() {
        api.getArticles(this.props.topic_slug)
        .then(articles  => {
            const croppedArticles = utils.cropArticleOrCommentBodies(articles, 50);
            const sortedArticles = utils.sortArticlesOrComments(croppedArticles, "commentCount");
            this.setState ({
                articles : sortedArticles,
                loaded: true
            })
        })
        .catch(err => {
            navigate('/error', { replace: true, state: {
                code: 404}})
          })
    }
    updateSort = event => {
        const sortedArticles = utils.sortArticlesOrComments(this.state.articles, event.target.value)
        this.setState({
            articles: sortedArticles
        })
      }
}

Topic.propTypes = {
    topic_slug: PropTypes.string, 
    user: PropTypes.object.isRequired
};

export default Topic;