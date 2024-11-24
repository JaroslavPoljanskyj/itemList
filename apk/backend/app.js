import express from 'express';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './utils/errorHandler.js';
import { checkUser } from './services/authenticateJWT.js';
import cookieParser from 'cookie-parser';


const app = express();

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

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
