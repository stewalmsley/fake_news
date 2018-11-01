import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Vote from './Vote';
import * as api from '../api';

const ArticleSnapshot = ({ article, user }) => {
    const { _id, title, created_at, created_by, croppedBody, commentCount, votes, topic, belongs_to } = article;
    return (
        <div className="article">
        <span className="topic"><Link to={`/topics/${belongs_to}/articles`}>{topic} </Link></span>
        {created_by && (<span className="author"><Link to={`/users/${created_by.username}`}>{created_by.name} </Link></span>)}
            <Link to={`/articles/${article._id}`}>
                {" "}{title} <br></br>
                <p>{created_at}{croppedBody}<br></br> </p>
                <h6>Comments: {commentCount}</h6>
            </Link>
    {(user && created_by) && <Vote user_id={user._id} author_id ={created_by._id} id={_id} updateVotes={updateVotes} votes={votes}></Vote>} 
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