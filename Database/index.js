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
  const count = req.query.count || 5;
  const page = req.query.page || 1;
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
        helpful as question_helpfulness,
        reported,
        (select jsonb_object_agg(id, answer) from
          (select * from answers
          where question_id = questions.id)
          answer) as answers
        FROM questions
        WHERE product_id=($1)
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
        // res.status(404).send(err);
      })
    ));
};

// getQuestions();

module.exports = {
  getQuestions,
};
