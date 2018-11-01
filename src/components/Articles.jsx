import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleSnapshot from './ArticleSnapshot';

const Articles = ({ articles, user}) => {
        return <div>{articles.map(article => {
        return <ArticleSnapshot user={user} key={article._id} article={article}></ArticleSnapshot>
        })}</div>
    }

    Articles.propTypes = {
        articles: PropTypes.array.isRequired, 
        user: PropTypes.object.isRequired
    }; 
    
export default Articles;