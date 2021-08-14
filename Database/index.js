/* eslint-disable camelcase */
const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const pool = new Pool(dbConfig);

pool.on('error', (err, client) => {
  console.error('unexpected error on idle client', err);
  process.exit(-1);
});

const getQuestions = (req, res) => {
  // const { product_id, count } = req.query;
  const productId = req.query.product_id;
  const count = parseInt(req.query.count, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * count || 0;
  console.log(productId, count, page);
  // const product_id = 1800;
  // const count = 5;
  pool
    .connect()
    .then((client) => (client
      .query(
        `SELECT
        id as question_id,
        question_body,
        question_date,
        asker_name,
        question_helpfulness,
        reported,
        (select coalesce (jsonb_object_agg(id, answer), '{}') from
          (select id, body, answer_date as date, answerer_name, helpfulness,
            (select coalesce (jsonb_agg(photoArr), '[]')
            from (SELECT * FROM
            answer_photos WHERE answer_id = answers.id)
            photoArr) as photos
          from answers
          where question_id = questions.id and reported = false)
          answer) as answers
        FROM questions
        WHERE product_id=($1) and reported = false
        OFFSET ($3) ROWS
        FETCH NEXT ($2) ROWS ONLY`,
        [productId, count, skip],
      )
      .then((result) => {
        console.log('then');
        client.release();
        // console.log(result.rows[0]);
        const sendRes = {
          product_id: productId,
          results: result.rows,
        };
        res.status(200).send(sendRes);
      })
      .catch((err) => {
        console.log('catch');
        client.release();
        console.log(err.stack);
        res.status(404).send(err);
      })
    ));
};

const getAnswers = (req, res) => {
  const { question_id } = req.params;
  const count = parseInt(req.query.count, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * count || 0;
  console.log(question_id, count, page);
  pool
    .connect()
    .then((client) => (client
      .query(
        `SELECT
            id as answer_id,
            body,
            answer_date as date,
            answerer_name,
            helpfulness,
            (select coalesce (jsonb_agg(photoArr), '[]')
            from (SELECT * FROM
            answer_photos WHERE answer_id = answers.id)
            photoArr) as photos
          from answers where question_id = ($1) and reported = false
          OFFSET ($3) ROWS FETCH NEXT ($2) ROWS ONLY`,

        [question_id, count, skip],
      )
      .then((result) => {
        console.log('then');
        client.release();
        // console.log(result.rows[0]);
        const sendRes = {
          question: question_id,
          page,
          count,
          results: result.rows,
        };
        res.send(sendRes);
      })
      .catch((err) => {
        console.log('catch');
        client.release();
        console.log(err.stack);
        res.status(404).send(err);
      })
    ));
};

const addQuestion = (req, res) => {
  // console.log(req.body);
  const {
    body, name, email, product_id, date,
  } = req.body;
  console.log(body, name, email, product_id, date);
  pool
    .connect()
    .then((client) => (client
      .query(
        'INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) values ($4, $1, $5, $2, $3, false, 0)',
        [body, name, email, product_id, date],
      )
      .then((result) => {
        console.log('then');
        client.release();
        // console.log(result.rows[0]);
        res.status(201);
      })
      .catch((err) => {
        console.log('catch');
        client.release();
        console.log(err.stack);
        res.status(404).send(err);
      })
    ));
};

const addAnswer = (req, res) => {
  // console.log(req.body);
  const { question_id } = req.params;
  const {
    body, name, email, date, photos,
  } = req.body;
  console.log(body, name, email, photos, date);
  pool
    .connect()
    .then((client) => (client
      .query(
        'INSERT INTO answers (question_id, body, answer_date, answerer_name, answerer_email, reported, helpfulness) values ($1, $2, $5, $3, $4, false, 0) returning id',
        [question_id, body, name, email, date],
      )
      .then((id) => {
        console.log('then for photos: ', photos, 'at ID: ', id.rows[0].id);
        if (photos.length) {
          photos.forEach((photo) => {
            client.query(
              'INSERT INTO answer_photos (answer_id, url) values ($1,$2)', [id.rows[0].id, photo],
            );
          });
        }
      })
      .then((result) => {
        console.log('then');
        client.release();
        // console.log(result.rows[0]);
        res.status(201).send('Created');
      })
      .catch((err) => {
        console.log('catch');
        client.release();
        console.log(err.stack);
        res.status(404).send(err);
      })
    ));
};

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
};
