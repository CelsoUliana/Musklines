import { sha256 } from 'js-sha256'

/*
	We need a block that stores information and computes its hash on creation.
	Also should be called block? lol
*/

class Node{
	/*
		Link equals the previous block hash so as to mean a link in the chain.
		Should have a Merkle tree root hash (used in Bitcoin) or Merkle Patricia tree hash (used in Ethereum) -
		for better performance when checking transactions hashing.
		https://en.bitcoin.it/wiki/Block
		https://en.bitcoin.it/wiki/Block_hashing_algorithm
	*/
	constructor(index, timestamp, transactions, proof, link){
		this.link = link
		this.index = index
		this.proof = proof
		this.timestamp = timestamp
		this.transactions = transactions
		this.hash = this.compute()
	}
	/*
		Compute function should be used with another function that calculates a proof of work based on some criteria.
		Also need to use proof as a nonce.
	*/
	compute(){
		return sha256(this.index + this.link + this.timestamp + JSON.stringify(this.transactions).toString())
	}
}

export {Node}