import React, { Component } from 'react';
import Articles from './Articles';
import * as api from '../api';
import * as utils from '../utils';

class Home extends Component {
  state = {
      articles: []
  };
  render() {
      const { user } = this.props
      const { articles } = this.state
      return <div>
      <main>   <Articles articles={articles} user={user} />
        </main>
    </div>
  }
  componentDidMount() {
      this.fetchArticles();
    }

  fetchArticles() {
      api.getArticles()
      .then(articles => {
          const sortedArticles = utils.sortArticlesOrComments(articles, "commentCount");
          this.setState ({
              articles: sortedArticles
          })
      })
  }
}

export default Home;
