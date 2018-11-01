import React, { Component } from 'react';
import ArticleSnapshot from './ArticleSnapshot';
import PropTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import Articles from './Articles';
import { navigate } from '@reach/router';
import Sort from './Sort'

class Topic extends Component {
    state = {
        articles: [],
    }
    render() {
        const { user } = this.props
        const { articles } = this.state
        return <div>
            <Sort content="articles" updateSort={this.updateSort}></Sort>
        <main>   <Articles articles={articles} user={user} />
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
    topic_slug: PropTypes.string
};

export default Topic;