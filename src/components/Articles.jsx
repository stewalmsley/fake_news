import React from "react";
import PropTypes from "prop-types";
import ArticleSnapshot from "./ArticleSnapshot";
import Sort from "./Sort";

const Articles = ({
  articles,
  user,
  source,
  userProfile,
  topic_slug,
  updateSort
}) => {
  const count = articles.length;
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
      <Sort content="articles" updateSort={updateSort} />
      {articles.map(article => {
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
};

Articles.propTypes = {
  articles: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  source: PropTypes.string,
  userProfile: PropTypes.object,
  topic_slug: PropTypes.string,
  updateSort: PropTypes.func
};

export default Articles;
