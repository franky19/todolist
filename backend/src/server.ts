// import express from 'express';
import bodyParser from 'body-parser';
// import { register, login, verify } from './controllers/authController';
const cors = require('cors');

import { CreateTodo, DeleteTodo, GetTodo, GetTodoByID, UpdateTodo } from "./controllers/todoController";

const express = require('express');

const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.json());

app.get('/todos',GetTodo)
app.get('/todos/:id',GetTodoByID)
app.post('/todos', CreateTodo)
app.put('/todos/:id',UpdateTodo)
app.delete('/todos/:id',DeleteTodo)


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

