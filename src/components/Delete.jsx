import React from 'react';
import PropTypes from 'prop-types';

const Delete = props => {
    const { deleteItem, commentId } = props
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