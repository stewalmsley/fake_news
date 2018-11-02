import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { navigate } from '@reach/router';

class CreateArticle extends Component {
    state = {
        title: '',
        body: '',
        topic_slug: '',
    }
    render() {
        const { topics } = this.props
        return (
            <div>
                <h4>Create Article </h4>
                <form onSubmit={this.handleSubmit}>
                     <select required name="topic_slug" onChange={this.handleChange}>
                        <option value="">Choose Topic </option>
                        {topics.map(topic => {
                            return <option key={topic._id} value={topic.slug}>{topic.title}</option>
                        })}
                    </select><br></br>
                    <textarea required name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title" cols="100" rows="3"></textarea><br></br>
                    <textarea required name="body" value={this.state.body} onChange={this.handleChange} placeholder="Write Article here" cols="100" rows="20"></textarea><br></br>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { topic_slug, body, title } = this.state
        const user_id = this.props.user._id
        const newArticle = { title, body, created_by: user_id}
        api.postArticle(topic_slug, newArticle)
        .then(createdArticle => {
            navigate(`/articles/${createdArticle._id}`, {state: createdArticle})
        })
    }
}

CreateArticle.propTypes = {
    topics: PropTypes.array.isRequired
};

export default CreateArticle;