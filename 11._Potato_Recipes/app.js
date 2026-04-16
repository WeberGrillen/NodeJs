import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

import recipeRouter from './routers/recipesRouter.js'
app.use(recipeRouter);

app.listen(PORT, () => {
    console.log('Server started on port:', PORT);
});