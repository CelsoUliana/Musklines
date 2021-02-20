# Musklines
A first try of a simple typescript node.js implementation of a blockchain.

## Usage
```
	$ npm install

	$ npm run dev
```

## API
Right now, it provides a centralized API with blockchain architecture.
Still missing a lot of functionality.

```
GET /print -> 'will print the current chain'
GET /mine -> 'will mine the next block'

POST /addTransaction -> 'will add a new transaction'
POST /consesus -> 'will check if request chain is bigger than the current chain. If it is, replace it.'
```
#### Sample for json body of both POST operation can be found inside ./json-sample.

## Version
Ran with Node version => 14.15.4
