# Async-Workshop
An interactive workshop about testing asynchronous messaging systems

## Requirements
1. internet access
2. *nix terminal
3. docker
4. docker-compose

## Setup
```bash
$ git clone git@github.com:calvinmo/NTD2020.git
$ cd NTD2020
$ docker-compose run --rm tests npm ci
```

## Workshop steps
1. `docker-compose run tests npm run test -- 1-basic --watchAll`
2. `docker-compose run tests npm run test -- 2-basic --watchAll`
