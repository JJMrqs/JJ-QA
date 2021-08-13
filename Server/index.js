const express = require('express');
const path = require('path');
const axios = require('axios');
const token = require('../config/config');
const db = require('../Database/index');

const app = express();

app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
  console.log('express server listening on port: ', PORT);
});

app.get('/api/qa/questions', db.getQuestions);
