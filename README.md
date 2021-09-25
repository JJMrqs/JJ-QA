# Atelier: Database System Design, RESTful API
Developed RESTful API and database for an inherited front-end E-Commerce codebase with over 25M records in CSVs

## Tech

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## About

System Design Capstone for Hackreactor. This is the reviews API for an eCommerce website that was divided into a service based architecture. The API, server, and database were designed to interface with an inherited front-end. After creating and optimizing the backend, it was load tested locally, dockerized, deployed on ec2 instances, and finally load tested again. To increase the throughput, the system was horizontally scaled by adding more servers with an nginx load balancer. 


##Metrics

### Performance Testing - Local
GOAL: All requests:
- Response time < 50ms / ideally 10ms

METHOD: Tested using PSQL 'explain analyze' cmd
- ProductId = 1

![alt text](./Stress-Test/singleRequest.png)


GOAL: All requests (Stress testing)
- Response time: less than 2,000ms / ideally 200ms
- Throughput: 1,000 RPS ideally 10,000rps

METHOD: Testing with K6
- Product ID: Randomized 1 - 500
- Duration: 1m

![alt text](./Stress-Test/K6-Local.png)

### Performance Testing - Deployed in AWS EC2 (t2.micros)
GOAL: Scale to
- Response time: less than 2000ms
- Throughput: 1000 RPS

METHOD: Testing with loader.io

CONSTRAINTS:
- No AWS Services: RDS, Elastic Beanstalk, etc
- Cannot VERTICALLY scale
- Must have < 1% error rate to pass

TEST:
- Single instance of Node server

![alt text](./Stress-Test/Deployed-One-Server.png)

RESULTS:
- All queries able to handle 1,500 RPS


TEST:
- Two instances of Node Server, with Nginx Load Balancing

![alt text](./Stress-Test/with-LB.png)

Results:
- All Queries able to handle 2,400 RPS



### Future Development
- Compare performance with NoSQL database
- Scale to 4 instances for clarity on optimal Load Balancing methods
- Implement and utilize caching and worker connections on Load Balancer
