DROP DATABASE IF EXISTS qa;

CREATE DATABASE qa;

\c qa;

drop table if exists answer_photos;
drop table if exists answers;
drop table if exists questions;

create table questions (
    id serial primary key,
    product_id int not null,
    question_body varchar(1000) not null,
    question_date bigint not null,
    asker_name varchar(60) not null,
    asker_email varchar(60) not null,
    reported boolean,
    question_helpfulness int
);

copy questions from '/Users/jjmarquis/Desktop/galvanize/sdc/csvs/questions.csv' delimiter ',' csv header;

SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions)+1);


create table answers (
    id serial primary key,
    question_id int not null references questions(id),
    body varchar(1000) not null,
    answer_date bigint not null,
    answerer_name varchar(60) not null,
    answerer_email varchar(60) not null,
    reported boolean,
    helpfulness int
);

copy answers from '/Users/jjmarquis/Desktop/galvanize/sdc/csvs/answers.csv'
    delimiter ',' csv header;

SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'id'), (SELECT MAX(id) FROM answers)+1);

create table answer_photos (
    id serial primary key,
    answer_id int references answers(id),
    url varchar(200)
);

copy answer_photos from '/Users/jjmarquis/Desktop/galvanize/sdc/csvs/answers_photos.csv'
delimiter ',' csv header;

SELECT pg_catalog.setval(pg_get_serial_sequence('answer_photos', 'id'), (SELECT MAX(id) FROM answer_photos)+1);

CREATE index questions_productid on questions (product_id);
create index answers_questionid on answers (question_id);
create index photos_answerid on answer_photos (answer_id);
