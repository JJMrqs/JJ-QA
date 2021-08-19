FROM postgres:latest

RUN mkdir /seed/

COPY csvs/*.csv /seed/

RUN chmod a+rx /seed

COPY schema.sql /docker-entrypoint-initdb.d
