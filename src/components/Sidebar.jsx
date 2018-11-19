import React, { Component } from "react";
import PropTypes from "prop-types";
import Topics from "./Topics";
import Users from "./Users";
import Sort from "./Sort";

class Sidebar extends Component {
  state = {
    filteredTopics: [],
    filteredUsers: [],
    filter: ""
  };
  render() {
    const { filteredTopics, filteredUsers, filter } = this.state;
    const topics = filter ? filteredTopics : this.props.topics;
    const users = filter ? filteredUsers : this.props.users;
    return (
      <section role="navigation" className="sidebar">
        <form className="topicUserSearch">
          <input
            placeholder="Search all topics/users..."
            value={this.state.filter}
            onChange={this.handleInputChange}
            size="30"
          />
        </form>
        <div className="trending">
          <span>Trending by...</span>
          <Sort
            filter={filter}
            updateSort={this.props.updateSort}
            content="topicsAndUsers"
          />
        </div>

        <Topics topics={topics} />
        <Users users={users} />
      </section>
    );
  }
  handleInputChange = event => {
    const filter = event.target.value;
    const regex = new RegExp(filter, "i");
    const { topics, users } = this.props;
    const filteredTopics = filter
      ? topics.filter(topic => regex.test(topic.title))
      : [];
    const filteredUsers = filter
      ? users.filter(user => regex.test(user.name))
      : [];
    this.setState({
      filter,
      filteredTopics,
      filteredUsers
    });
  };
}

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  topics: PropTypes.array.isRequired
};

export default Sidebar;
