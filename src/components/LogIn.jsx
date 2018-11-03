import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LogIn extends Component {
    state = {
        logInUser: '',
        switchUser: '', 
        password: ''
    }
    render() {
        const { users } = this.props
        return (
            <div>
                <h6>Enter username and password </h6>
                <form name="logInUser" onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" name="logInUser" value={this.state.logInUser}
                    placeholder="username - eg jessjelly" size="40"/>
                    <input type="password" onChange={this.handleChange} name="password" value={this.state.password} size="40"
                    placeholder="password will be ignored"/>
                    <input type="submit"/>
                </form>
                <h6>Or Select User: </h6>
                <form name="switchUser" onSubmit={this.handleSubmit}>
                <select name="switchUser" onChange={this.handleChange}>
                    <option value="">Select User</option>
                    {users.map(user => {
                        return <option name={user.name} value={user.username} key={user._id}>{user.name}</option>
                    })}
                </select>
                <input type="submit"/>
                </form>
            </div>
        );
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const user = this.props.users.find(user => user.username === this.state[event.target.name])
        this.props.setUser(user)
        this.setState({
            logInUser: '', 
            password : ''
        })
    }

}

LogIn.propTypes = {

};

export default LogIn;