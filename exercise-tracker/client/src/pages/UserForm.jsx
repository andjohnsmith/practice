import React, { Component } from 'react';
import { insertUser } from '../api';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username: this.state.username,
    };

    await insertUser(user).then((res) => {
      window.alert('User inserted successfully');
      this.setState({ username: '' });
    });
  };

  render() {
    return (
      <div className="container">
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={this.onUsernameChange}
              required
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        </form>
      </div>
    );
  }
}
