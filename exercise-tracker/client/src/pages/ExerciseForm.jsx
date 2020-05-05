import React, { Component } from 'react';
import {
  insertExercise,
  updateExercise,
  getExerciseById,
  getAllUsers,
} from '../api';
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
      isEdit: false,
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    if (id) {
      await getExerciseById(id).then((res) => {
        this.setState({
          username: res.data.exercise.username,
          description: res.data.exercise.description,
          duration: res.data.exercise.duration,
          date: new Date(res.data.exercise.date),
          isEdit: true,
        });
      });
    }
    await getAllUsers().then((res) => {
      if (res.data.users.length > 0) {
        this.setState({
          users: res.data.users.map((user) => user.username),
          username: this.state.username || res.data.users[0].username,
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

    if (this.state.isEdit) {
      await updateExercise(this.props.match.params.id, exercise).then(
        () => (window.location = '/exercises'),
      );
    } else {
      await insertExercise(exercise).then(
        () => (window.location = '/exercises'),
      );
    }
  };

  render() {
    return (
      <div className="container">
        <h3>{(this.state.isEdit && 'Edit') || 'Log New'} Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <select
              className="custom-select"
              id="username"
              onChange={this.onChangeUsername}
              value={this.state.username}
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
            {(this.state.isEdit && 'Edit') || 'Log'} Exercise
          </button>
        </form>
      </div>
    );
  }
}
