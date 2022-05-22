# Async-Workshop
An interactive workshop about testing asynchronous messaging systems

## Requirements
1. internet access
2. *nix terminal
3. [docker](https://www.docker.com/)
4. [docker-compose](https://docs.docker.com/compose/)

## Tools we using:
1. [Jest](https://jestjs.io/)
2. [amqplib](https://amqp-node.github.io/amqplib/channel_api.html)
3. [RabbitMQ](https://www.rabbitmq.com/)

## Setup
```bash
$ git clone git@github.com:calvinmo/NTD2020.git
$ cd NTD2020
$ docker-compose run tests npm ci
$ docker-compose up -d rabbitmq consumer
```

## Workshop steps
1. `docker-compose run tests npm run test -- 1 --watchAll`
