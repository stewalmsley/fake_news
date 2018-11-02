import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Vote from './Vote';
import * as api from '../api';

const ArticleSnapshot = ({ article, user, source, userProfile }) => {
    const { _id, title, dayjsDate, created_by, croppedBody, commentCount, votes, topic, belongs_to } = article;
    const author_id = source === "user" ? userProfile._id : created_by._id
    return (
        <div className="article">
        {source!== "user" && (<span className="author"><Link to={`/users/${created_by.username}/articles`}>{created_by.name} </Link></span>)}
            <Link to={`/articles/${article._id}`}>
                {" "}{title} <br></br>
                <div className="date">{dayjsDate}</div>
                <p>{croppedBody}<br></br> </p></Link>
                <div className="stats"><Link to={`/topics/${belongs_to}/articles`}>{topic}</Link>
                <Link to={`/articles/${article._id}`}>Comments: {commentCount}</Link></div>
    <Vote user_id={user._id} author_id ={author_id} id={_id} updateVotes={updateVotes} votes={votes}></Vote>
        </div>
    );
};

const updateVotes = (id, voteChange) => {
    api.patchArticleVotes(id, voteChange)
}

ArticleSnapshot.propTypes = {
    article: PropTypes.object.isRequired
};

export default ArticleSnapshot;