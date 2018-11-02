import React from 'react';
import PropTypes from 'prop-types';
import ArticleSnapshot from './ArticleSnapshot';

const Articles = ({ articles, user, source, userProfile}) => {
        return <div> Articles ({articles.length})
        {articles.map(article => {
        return <ArticleSnapshot source={source} user={user} userProfile={userProfile} key={article._id} article={article}></ArticleSnapshot>
        })}</div>
    }

    Articles.propTypes = {
        articles: PropTypes.array.isRequired, 
        user: PropTypes.object.isRequired, 
        source: PropTypes.string, 
        userProfile: PropTypes.object
    }; 
    
export default Articles;