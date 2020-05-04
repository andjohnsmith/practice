import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from '../components';
import { ExerciseList } from '../pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={ExerciseList} />
    </Router>
  );
}

export { App };
