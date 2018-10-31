import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { Link } from '@reach/router';

class CreateArticle extends Component {
    state = {
        title: '',
        body: '',
        topic_slug: '',
        createdArticle: {}
    }
    render() {
        const { topics } = this.props
        const { createdArticle } = this.state
        return (
            <div>
                <h4>Create Article </h4>
                <form onSubmit={this.handleSubmit}>
                     <select name="topic_slug" onChange={this.handleChange}>
                        <option value="">Choose Topic </option>
                        {topics.map(topic => {
                            return <option value={topic.slug}>{topic.title}</option>
                        })}
                    </select><br></br>
                    <textarea name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title" cols="100" rows="3"></textarea><br></br>
                    <textarea name="body" value={this.state.body} onChange={this.handleChange} placeholder="Write Article here" cols="100" rows="20"></textarea><br></br>
                    <input type="submit" value="Submit"></input>
                </form>
                {createdArticle.title && <p>Created article "{createdArticle.title}" at {createdArticle.created_at}.
                <Link to={`/articles/${createdArticle._id}`}>Click to view</Link> </p>}
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
        console.log(newArticle)
        api.postArticle(topic_slug, newArticle)
        .then(createdArticle => {
            this.setState({
                createdArticle, 
                body: '', 
                title: '', 
            })
        })

    }
}

CreateArticle.propTypes = {
    topics: PropTypes.array.isRequired
};

export default CreateArticle;