import React, { Component } from 'react';
import { insertExercise, getAllUsers } from '../api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class ExerciseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = async () => {
    await getAllUsers().then((res) => {
      if (res.data.users.length > 0) {
        this.setState({
          users: res.data.users.map((user) => user.username),
          username: res.data.users[0].username,
        });
      }
    });
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  onChangeDuration = (event) => {
    this.setState({ duration: event.target.value });
  };

  onChangeDate = (date) => {
    this.setState({ date: date });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    await insertExercise(exercise).then((res) => {
      this.setState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
      });
    });

    window.location = '/exercises';
  };

  render() {
    return (
      <div className="container">
        <h3>Log New Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <select
              className="custom-select"
              id="username"
              onChange={this.onUsernameChange}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={this.state.description}
              onChange={this.onChangeDescription}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (in minutes)</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <div id="date">
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Log Exercise
          </button>
        </form>
      </div>
    );
  }
}
