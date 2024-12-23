import express from 'express';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './utils/errorHandler.js';
import { checkUser } from './services/authenticateJWT.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Povolit cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use('*', checkUser); // Ověří token, ale nevyžaduje ho

// Routes
app.use('/users', userRoutes);

// app.use(authenticateJWT);
app.use('/lists', listRoutes);
app.use('/lists/:listId/items', itemRoutes);

// Error handling
app.use(errorHandler);

app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
