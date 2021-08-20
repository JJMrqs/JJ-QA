const express = require('express');

const db = require('../Database/index');

const app = express();

app.use(express.json());
const PORT = 3001;

app.listen(PORT, () => {
  console.log('express server listening on port: ', PORT);
});

app.get('/api/qa/questions', db.getQuestions);
// app.get('/api/qa/questions', (req, res) => {
//   console.log('req.params: ', req.params, 'req.query: ', req.query);
// });

app.get('/api/qa/questions/:question_id/answers', db.getAnswers);

app.post('/api/qa/questions', db.addQuestion);

app.post('/api/qa/questions/:question_id/answers', db.addAnswer);

app.put('/api/qa/questions/:question_id/helpful', db.updateHelpful);

app.put('/api/qa/questions/:question_id/report', db.updateReported);

app.put('/api/qa/answers/:answer_id/helpful', db.updateHelpful);

app.put('/api/qa/answers/:answer_id/report', db.updateReported);

app.get('/loaderio-50a1efd35ab2c91bba56c9cac4ac1e63/', (req, res) => {
  res.send(/loaderio-50a1efd35ab2c91bba56c9cac4ac1e63/);
});
