import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const sort = (arr, sortOn) => {
  if (sortOn === "created_at") {
    return [...arr].sort((text1, text2) => {
      const diff = dayjs(text1.created_at).diff(
        dayjs(text2.created_at),
        "days"
      );
      return diff > 0 ? -1 : 1;
    });
  }
  return [...arr].sort((text1, text2) => {
    return text2[sortOn] - text1[sortOn];
  });
};

export const addKeysToArticles = articles => {
  return articles.map(article => {
    const topic = createTopicKey(article);
    const dayjsDate = convertTime(article);
    const croppedBody = createCroppedBody(article.body, 40);
    return { ...article, topic, croppedBody, dayjsDate };
  });
};

export const addKeysToComments = comments => {
  return comments.map(comment => {
    const dayjsDate = convertTime(comment);
    const croppedBody = createCroppedBody(comment.body, 20);
    return { ...comment, croppedBody, dayjsDate };
  });
};

export const createCroppedBody = (str, n) => {
  let croppedBody = str
    .split(" ")
    .slice(0, n)
    .join(" ");
  if (croppedBody.length < str.length) croppedBody += "...";
  return croppedBody;
};

export const createTopicKey = article => {
  return article.belongs_to
    ? article.belongs_to[0].toUpperCase() + article.belongs_to.substring(1)
    : "";
};

export const addTitleKeyToTopics = topics => {
  return topics.map(topic => {
    const title = topic.slug ? topic.slug[0].toUpperCase() + topic.slug.substring(1) : "";
    return {...topic, title}
  });
}

export const convertTime = articleOrComment => {
  return articleOrComment.created_at
    ? dayjs(articleOrComment.created_at).fromNow()
    : "";
};
