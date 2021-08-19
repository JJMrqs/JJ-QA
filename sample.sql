SELECT
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
        FETCH NEXT ($2) ROWS ONLY


          (select jsonb_object_agg(id, answer) from
          (select *,
            (select jsonb_agg(photoArr)
            from (SELECT * FROM
            answer_photos WHERE answer_id = answers.id)
            photoArr) as photos
          from answers
          where question_id = questions.id)
          answer) as answers



        (select jsonb_object_agg(id, answer,
            (select jsonb_agg(photoArr)
              from (SELECT * FROM
              (answer_photos WHERE answer_id = answers.id)
               photoArr) as photos)
          ) from
          (select * from answers
          where question_id = questions.id)
          answer) as answers

explain analyze SELECT
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
        WHERE product_id=1 and reported = false;


