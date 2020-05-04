import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const getAllExercises = () => api.get('/exercises');

export { getAllExercises };
