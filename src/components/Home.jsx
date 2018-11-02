import React, { Component } from 'react';
import Articles from './Articles';
import Sort from './Sort'
import * as api from '../api';
import * as utils from '../utils';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';

class Home extends Component {
  state = {
      articles: [], 
      loaded: false, 
      trendingAuthors: []
  };
  render() {
      const { user } = this.props
      const { articles, loaded, trendingAuthors } = this.state
      if (!loaded) return <div className="loader"></div>
      return <div>
      <main>  
          {trendingAuthors[0].receivedCommentCount}
          {trendingAuthors[0].name}
          <Sort content="articles" updateSort={this.updateSort}></Sort>
           <Articles articles={articles} user={user} />
        </main>
    </div>
  }
  componentDidMount() {
      this.fetchArticles();
    }

  fetchArticles() {
      api.getArticles()
      .then(({ articles, trendingAuthors } ) => {
          const sortedArticles = utils.sortArticlesOrComments(articles, "commentCount");
          this.setState ({
              articles: sortedArticles, 
              trendingAuthors,
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

Home.propTypes = {
    user: PropTypes.object.isRequired, 
};

export default Home;
