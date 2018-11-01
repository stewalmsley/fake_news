import React, { Component } from 'react';
import Articles from './Articles';
import Sort from './Sort'
import * as api from '../api';
import * as utils from '../utils';
import { navigate } from '@reach/router';

class Home extends Component {
  state = {
      articles: [], 
  };
  render() {
      const { user } = this.props
      const { articles } = this.state
      return <div>
      <main>  
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
      .then(articles => {
          const sortedArticles = utils.sortArticlesOrComments(articles, this.state.sort);
          this.setState ({
              articles: sortedArticles
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

export default Home;
