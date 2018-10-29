import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const ArticleSnapshot = ({ article }) => {
    const { title, created_at, created_by, body, commentCount, votes, topic, belongs_to } = article;
    return (
        <div className="article">
        <span className="topic"><Link to={`/topics/${belongs_to}/articles`}>{topic}: </Link></span>
        {created_by.name && <span className="author"><Link to={`/users/${created_by.username}`}>{created_by.name}: </Link></span>}
            <Link to={`/articles/${article._id}`}>
                {" "}{title} <br></br>
                <p>{created_at}{body}<br></br> <span className="readMore">  ...Read More </span> </p>
                <h6>Comments: {commentCount} Votes: {votes}</h6>
            </Link>
            
        </div>
    );

    

   
};

ArticleSnapshot.propTypes = {
    
};

export default ArticleSnapshot;