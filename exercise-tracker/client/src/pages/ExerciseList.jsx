import React, { Component } from 'react';
import { getAllExercises } from '../api';

function Exercise(props) {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date}</td>
    </tr>
  );
}

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };
    this.exerciseList = this.exerciseList.bind(this);
  }

  componentDidMount = async () => {
    await getAllExercises().then((res) => {
      this.setState({ exercises: res.data.exercises });
    });
  };

  exerciseList = () => {
    return this.state.exercises.map((exercise) => (
      <Exercise exercise={exercise} key={exercise._id} />
    ));
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-3">Logged Exercises</h2>
        <br />
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>{this.exerciseList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
