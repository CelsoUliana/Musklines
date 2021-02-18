import { sha256 } from 'js-sha256'
import { Transaction } from './transactions'

/*
	We need a block that stores information and computes its hash on creation.
	Also should be called block? lol
*/

export class Node{
	private index: number
	private link: string
	private hash: string
	private nonce: number
	private timestampString: string
	private transactions: Array<Transaction>
	/*
		Link equals the previous block hash so as to mean a link in the chain.
		Should have a Merkle tree root hash (used in Bitcoin) or Merkle Patricia tree hash (used in Ethereum) -
		for better performance when checking transactions hashing.
		https://en.bitcoin.it/wiki/Block
		https://en.bitcoin.it/wiki/Block_hashing_algorithm
	*/
	constructor(index: number, timestampString: string, transactions: Array<Transaction>, nonce: number, link: string){
		this.link = link
		this.index = index
		this.nonce = nonce
		this.transactions = transactions
		this.timestampString = timestampString
		this.hash = this.compute()
	}

	public static pseudoConstructor(index: number, timestampString: string, transactions: Array<Transaction>, nonce: number, link: string, hash:string): Node{
		let node = new Node(index, timestampString, transactions, nonce, link)
		node.setHash(hash)
		return node
	}
	/*
		Workaround for deserialize.
	*/
	private setHash(hash: string){
		this.hash = hash
	}

	public getHash(): string{
		return this.hash
	}

	/*
		Compute function should be used with another function that calculates a nonce of work based on some criteria.
		Also need to use nonce as a nonce.
	*/
	private compute(): string{
		let temp = sha256(	this.index + 
							this.link  + 
							this.nonce +
							this.timestampString + 
							JSON.stringify(this.transactions).toString()
						  )
		return temp
	}
}