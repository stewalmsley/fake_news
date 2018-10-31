import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateArticle extends Component {
    render() {
        const { topics } = this.props
        return (
            <div>
                <h4>Create Article </h4>
                <form>
                    Choose Topic: <select>
                        {topics.map(topic => {
                            return <option value={topic.slug}>{topic.title}</option>
                        })}
                    </select><br></br>
                    <textarea placeholder="Write Article here" cols="100" rows="20"></textarea>
                </form>
            </div>
        );
    }
}

CreateArticle.propTypes = {

};

export default CreateArticle;