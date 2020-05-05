import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const insertExercise = (payload) => api.post('/exercises', payload);
const updateExercise = (id, payload) => api.put(`/exercises/${id}`, payload);
const getAllExercises = () => api.get('/exercises');
const getExerciseById = (id) => api.get(`/exercises/${id}`);
const deleteExerciseById = (id) => api.delete(`/exercises/${id}`);

const insertUser = (payload) => api.post('/users', payload);
const getAllUsers = () => api.get('/users');

export {
  insertExercise,
  updateExercise,
  getAllExercises,
  getExerciseById,
  deleteExerciseById,
  insertUser,
  getAllUsers,
};
