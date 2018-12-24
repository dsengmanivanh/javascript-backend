# Javascript backend

A sample backend with Javascript es6 + async + mocha + chai + sinon

## Installation

```
$ npm install
```

## Running Locally

```
$ npm start
```


## Prod

```
$ npm run prod
```

This command line create a dist with your bundle


## Docker

To create the image
```
docker build -t <your username>/javascriptbackend .
```

To run the image
```
docker run -p 3000:3000 -d <your username>/javascriptbackend
```