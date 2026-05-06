import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Load balancer running on http://localhost:${PORT}`);
    console.log(`Simulation: http://localhost:${PORT}/api/simulate`);
});