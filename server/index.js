import express from 'express';
import * as dotenv from 'dotenv';  // Correct import statement
import cors from 'cors';


import dalleRoutes from './routes/dalle.routes.js';
dotenv.config();  // Correct function call
const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));  // Correct limit property

app.use('/api/v1/dalle', dalleRoutes)
app.get('/', (req, res) => {
    res.status(200).json({ message: "hello from Dall.E" });
});

app.listen(8080, () => console.log("server running on port 8080"));
