import React from 'react';
import PropTypes from 'prop-types';

const Failing = ({ location }) => {
    if (location.state) return (
    <div>
            <h1> Error: {location.state.code} </h1>
        </div>
    )
    return (
        <div>
            <h1>Sorry you seem to have used a Fake URL </h1>
        </div>
    );
};

Failing.propTypes = {
    
};

export default Failing;