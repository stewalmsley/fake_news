import React from 'react';
import PropTypes from 'prop-types';

const Sort = props => {
    const { updateSort, content } = props
    return (
        <div className ="sort">
            <select onChange={updateSort}>
                {content === "articles" && <option value="commentCount">Most Comments</option>}
                <option value="votes">Most Votes</option>
                <option value="created_at">Most Recent </option>
            </select>
        </div>
    );
}

Sort.propTypes = {

};

export default Sort;