import React, {Component} from "react";
import PropTypes from "prop-types";
import ArticleSnapshot from "./ArticleSnapshot";
import Sort from "./Sort";

class Articles extends Component {
  state = {
    filter: "",
    filteredArticles: []
  };
  render() {
    const { filter, filteredArticles } = this.state;
    const {
      articles,
      user,
      source,
      userProfile,
      topic_slug,
      updateSort
    } = this.props;
    const count = articles.length;
    const displayArticles = filter ? filteredArticles : articles;
    const topic = topic_slug
      ? topic_slug[0].toUpperCase() + topic_slug.substring(1)
      : null;
    const heading =
      source === "user"
        ? `Articles (${count})`
        : source === "topic"
        ? `Articles on ${topic} (${count})`
        : `All Articles (${count})`;
    return (
      <div>
        <h2>{heading}</h2>
        <div className="sortOrFilter">
          <Sort content="articles" updateSort={updateSort} filter={filter} />
          <form>
            <input
              placeholder="Filter articles..."
              value={filter}
              onChange={this.handleInputChange}
            />
          </form>
        </div>
        {displayArticles.map(article => {
          return (
            <ArticleSnapshot
              source={source}
              user={user}
              userProfile={userProfile}
              key={article._id}
              article={article}
            />
          );
        })}
      </div>
    );
  }
  handleInputChange = event => {
    const filter = event.target.value;
    const regex = new RegExp(filter, "i");
    const { articles } = this.props;
    const filteredArticles = filter
      ? articles.filter(article => {
        return (regex.test(article.title) || regex.test(article.body) || regex.test(article.topic) || regex.test(article.created_by.name))
      })
      : [];
    this.setState({
      filter,
      filteredArticles,
    });
  };
}

Articles.propTypes = {
  articles: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  source: PropTypes.string,
  userProfile: PropTypes.object,
  topic_slug: PropTypes.string,
  updateSort: PropTypes.func
};

export default Articles;
