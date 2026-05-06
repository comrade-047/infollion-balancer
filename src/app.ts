import express, { Application } from 'express';
import balancerRoutes from './routes/balancer.routes.js';

const app: Application = express();

// middleware to pars JSON bodies
app.use(express.json());

app.use('/api', balancerRoutes);

export default app;