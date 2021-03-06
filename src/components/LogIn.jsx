import React, { Component } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";

class LogIn extends Component {
  state = {
    logInUser: "",
    switchUser: "",
    password: "",
    incorrectUserName: false,
    welcomeUser: ""
  };
  render() {
    const { users } = this.props;
    const { incorrectUserName, welcomeUser } = this.state;

    return welcomeUser ? (
      <main>
        <div>Welcome Back {welcomeUser}</div>{" "}
      </main>
    ) : (
      <main>
        <div>
          <h2>Enter username and password </h2>
          <form name="logInUser" onSubmit={this.handleSubmit}>
            <input
              required
              onChange={this.handleChange}
              aria-label="username"
              type="text"
              name="logInUser"
              value={this.state.logInUser}
              placeholder="username - eg jessjelly"
              size="40"
            />
            <input
              type="password"
              onChange={this.handleChange}
              aria-label="password"
              name="password"
              value={this.state.password}
              size="40"
              placeholder="password will be ignored"
            />
            <input type="submit" />
          </form>
          <div className="loginError">
            {incorrectUserName && <span>Incorrect User Name</span>}
          </div>
          <h3>Or Select User: </h3>
          <form name="switchUser" onSubmit={this.handleSubmit}>
            <select
              aria-label="switchuser"
              required
              name="switchUser"
              onChange={this.handleChange}
            >
              <option value="">Select User</option>
              {users.map(user => {
                return (
                  <option name={user.name} value={user.username} key={user._id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
            <input type="submit" />
          </form>
        </div>
      </main>
    );
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const user = this.props.users.find(
      user => user.username === this.state[event.target.name]
    );
    if (!user) this.setState({ incorrectUserName: true });
    else {
      this.props.setUser(user);
      this.setState({
        logInUser: "",
        password: "",
        incorrectUserName: false,
        welcomeUser: user.username
      });
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };
}

LogIn.propTypes = {
  users: PropTypes.array.isRequired
};

export default LogIn;
