-- DROP DATABASE IF EXISTS qa;

-- CREATE DATABASE qa;

-- \c qa;

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
    helpful int
);

copy questions from '/Users/jjmarquis/Desktop/galvanize/sdc_csv/questions.csv' delimiter ',' csv header;


create table answers (
    id serial primary key,
    question_id int not null references questions(id),
    answer_body varchar(1000) not null,
    answer_date bigint not null,
    answerer_name varchar(60) not null,
    answerer_email varchar(60) not null,
    reported boolean,
    helpful int
);

copy answers from '/Users/jjmarquis/Desktop/galvanize/sdc_csv/answers.csv'
    delimiter ',' csv header;


create table answer_photos (
    id serial primary key,
    answer_id int references answers(id),
    url varchar(200)
);

copy answer_photos from '/Users/jjmarquis/Desktop/galvanize/sdc_csv/answers_photos.csv'
delimiter ',' csv header;

