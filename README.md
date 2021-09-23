# Atelier: Database System Design, RESTful API
Developed RESTful API and database for an inherited front-end E-Commerce codebase with over 25M records in CSVs

### Tech

Node.js, Express.js, PostgreSQL, Nginx, AWS, K6, Loader.io, Docker, Jest

# Performance Testing - Local
GOAL: All requests:
- Response time < 50ms / ideally 10ms

METHOD: Tested using PSQL 'explain analyze' cmd
- ProductId = 1

![alt text](./Stress-Test/singleRequest.png)


GOAL: All requests (Stress testing)
- Response time: less than 50ms / ideally 10ms
- Throughput: 1000 RPS

METHOD: Testing with K6
- Product ID: Randomized 1 - 500
- Throughput: 1000 RPS
- Duration: 1m

![alt text](https://firebasestorage.googleapis.com/v0/b/sandbox-3a2e3.appspot.com/o/table2.PNG?alt=media&token=6cd9407e-08d8-4084-b429-83d50e494a61)

# Performance Testing - Deployed in AWS EC2 (t2.micros)
GOAL: Scale to
- Response time: less than 2000ms
- Throughput: 1000 RPS

METHOD: Testing with loader.io

CONSTRAINTS:
- No AWS Services: RDS, Elastic Beanstalk, etc
- Cannot VERTICALLY scale

RESULTS:
- All queries able to handle 4000 RPS

![alt text](https://firebasestorage.googleapis.com/v0/b/sandbox-3a2e3.appspot.com/o/table3.PNG?alt=media&token=fb7404da-80f9-411d-83e3-f1717e245607)

# Next Steps AKA Season 2
- Compare performance with NoSQL database (probably MongoDB)
- Horizontally scale databases (probably replica sets)
- Monitor performance (probably New Relic)
