import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const Topics = props => {
    const { topics } = props
    return (
        <div>
            <h6>Trending Topics: </h6>
            {topics.map(topic => {
                return <Link to={`/topics/${topic.slug}/articles`}><h6>{topic.title}</h6></Link>
            })}
        </div>
    );
};

Topics.propTypes = {
    topics: PropTypes.array.isRequired
};

export default Topics;