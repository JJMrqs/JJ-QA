const questionSchema = new Schema({
  question_id: Number,
  product_id: Number,
  question_body: String,
  question_date: Date,
  question_helpfulness: Number,
  reported: Boolean,
  answers: {
    answer_id: {
      Number,
      answer_body: String,
      answer_date: String,
      answerer_name: String,
      helpfulness: Number,
      photos: [
        {
          id: Number,
          url: String,
        },
      ],
    },
  },
});

const answerSchema = new Schema({
  question_id: Number,
  answer_id: Number,
  answer_body: String,
  answer_date: Date,
  answererName: String,
  helpfulness: Number,
  photos: [{ id: Number, url: String }],
});
