import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const ArticleSnapshot = ({ article }) => {
    return (
        <div className="article">
        <Link to={`/users/${article.created_by.username}`}>{article.created_by.name}: </Link>
            
            <Link to={`/articles/${article._id}`}>
                {" "}{article.title}  
                <h6>{article.body}<br></br> <span className="readMore">  ...Read More </span> </h6>
                <h6>Comments: {article.commentCount} Votes: {article.votes}</h6>
            </Link>
            
        </div>
    );

    

   
};

ArticleSnapshot.propTypes = {
    
};

export default ArticleSnapshot;