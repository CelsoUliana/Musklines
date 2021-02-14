import { createHash } from 'crypto'
import { Transaction } from './transactions'

/*
	We need a block that stores information and computes its hash on creation.
	Also should be called block? lol
*/

export class Node{

	private index: number
	private link: string
	private hash: string
	private proof: number
	private timestampString: string
	private transactions: Array<Transaction>
	/*
		Link equals the previous block hash so as to mean a link in the chain.
		Should have a Merkle tree root hash (used in Bitcoin) or Merkle Patricia tree hash (used in Ethereum) -
		for better performance when checking transactions hashing.
		https://en.bitcoin.it/wiki/Block
		https://en.bitcoin.it/wiki/Block_hashing_algorithm
	*/
	constructor(index: number, timestampString: string, transactions: Array<Transaction>, proof: number, link: string){
		this.link = link
		this.index = index
		this.proof = proof
		this.timestampString = timestampString
		this.transactions = transactions
		this.hash = this.compute()
	}

	public getHash(){
		return this.hash
	}

	/*
		Compute function should be used with another function that calculates a proof of work based on some criteria.
		Also need to use proof as a nonce.
	*/
	private compute(){
		/*let hash = createHash('sha256').update(this.index + 
											   this.link  + 
											   this.timestampString + 
											   JSON.stringify(this.transactions).toString() +
											   this.proof)*/
		return "1"
		//return hash.digest().toString()
	}
}