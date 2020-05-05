import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const insertExercise = (payload) => api.post('/exercises', payload);
const getAllExercises = () => api.get('/exercises');
const deleteExerciseById = (id) => api.delete(`/exercises/${id}`);

const insertUser = (payload) => api.post('/users', payload);
const getAllUsers = () => api.get('/users');

export {
  insertExercise,
  getAllExercises,
  deleteExerciseById,
  insertUser,
  getAllUsers,
};
