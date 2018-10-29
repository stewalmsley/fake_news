import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const ArticleSnapshot = ({ article }) => {
    return (
        <div className="article">
            <Link to={`/articles/${article._id}`}>
                <h5> {article.title} </h5>  
                <h6>{article.body}</h6>
                <h6>Comments: {article.commentCount}</h6>
            </Link>
            
        </div>
    );
};

ArticleSnapshot.propTypes = {
    
};

export default ArticleSnapshot;