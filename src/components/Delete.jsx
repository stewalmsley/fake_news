import React from 'react';
import PropTypes from 'prop-types';

const Delete = props => {
    const { deleteItem, commentId, user_id, author_id, newArticle } = props
    if (!newArticle && user_id !== author_id) return null
    return (
        <div>
            <button onClick={()=> deleteItem(commentId)}>Delete</button>
        </div>
    );
};

Delete.propTypes = {
    deleteItem: PropTypes.func.isRequired,
    commentId: PropTypes.string
};

export default Delete;