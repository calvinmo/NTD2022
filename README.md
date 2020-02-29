# Jest-Workshop
An interactive workshop about the many uses of Jest

Clone the repo:
---------------
git clone https://github.com/DevTesterThings/JestWSCodeX.git

Move to Project:
-----------------
cd JestWSCodeX

Install the jest package:
-------------------------
```bash
$  docker-compose run --rm tests npm ci
```

To run a test/s:
```bash
$ docker-compose run --rm tests npm run test -- --watchAll
```

---------------

Jest will look for test files with any of the following naming conventions:
Files with .js suffix in __tests__ folders.
Files with .test.js suffix.
Files with .spec.js suffix.

npm start - recompiles the code
npm test - runs the tests
