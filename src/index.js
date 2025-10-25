import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import  createUserTableQuery from './data/createUserTable.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//MIDDLEWARE
app.use(express.json());
app.use(cors());


//ROUTES
app.use("/api", userRoutes);


//Error Handling Middleware
app.use(errorHandler);

// create tables on server startup
createUserTableQuery();


// testing postgres connection
app.get('/test-db', async (req, res) => {
    const result =  await pool.query('SELECT current_database()');
    res.send(`Connected to database: ${result.rows[0].current_database}`);
});


//START THE SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

