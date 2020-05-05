import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllExercises, deleteExerciseById } from '../api';

function Exercise(props) {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link
          to={`/exercises/${props.exercise._id}/edit`}
          className="btn btn-warning btn-sm"
          role="button"
        >
          Edit
        </Link>{' '}
        |{' '}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.deleteExercise(props.exercise._id)}
        >
          Delete
        </button>
      </td>
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
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount = async () => {
    await getAllExercises().then((res) => {
      this.setState({ exercises: res.data.exercises });
    });
  };

  exerciseList = () => {
    return this.state.exercises.map((exercise) => (
      <Exercise
        exercise={exercise}
        deleteExercise={this.deleteExercise}
        key={exercise._id}
      />
    ));
  };

  deleteExercise = (id) => {
    console.log(id);
    deleteExerciseById(id);
    this.setState({
      exercises: this.state.exercises.filter((exercise) => exercise._id !== id),
    });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-4">Logged Exercises</h2>
        <br />
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{this.exerciseList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
