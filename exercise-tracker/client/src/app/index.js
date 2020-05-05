import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from '../components';
import { ExerciseList, ExerciseForm, UserForm } from '../pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/exercises" exact component={ExerciseList} />
      <Route path="/exercises/add" component={ExerciseForm} />
      <Route path="/users" component={UserForm} />
    </Router>
  );
}

export { App };
