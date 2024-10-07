import express from 'express';
import taskRoutes from './routes/TaskRoutes.js';

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);

export default app;
