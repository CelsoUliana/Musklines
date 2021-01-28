import {Node} from './node.js'

class Blockchain{
	/*
        First block, no transactions (I guess could have something like transactions to investors or something) and nothing important really excluding index and hash.
    */
	constructor(){
		this.chain = [this.startChain()]
		this.transactions = []
	}

	/*
		Literature calls the first block genesis block, so shall I.
	*/
	startChain(){
		return new Node(0, new Date().toISOString(), [{'genesisBlock': 'First Block in the chain'}], 137, '0')
	}

	/*
		For now I'll treat the transactions as a Json object, but should be a class.
		https://en.bitcoin.it/wiki/Transaction
		Also, Ethereum uses nonce on transaction as well.
		https://ethereum.stackexchange.com/questions/12779/how-do-nodes-detect-the-duplicate-transactions-when-malicious-misbehaving-miner
	*/
	newTransaction(sender, receiver, amount){
		this.transactions.push({
			'sender': sender,
			'receiver': receiver,
			'amount': amount
		})
	}
	
	/*
		Add a new block, should only happen when one has found the proof of work.
	*/
	newBlock(proof){
		let newblock = new Node(
			this.chain.length, 
			new Date().toISOString(), 
			this.transactions, 
			proof, 
			this.chain[this.chain.length - 1].hash)
		this.transactions = []
		this.chain.push(newblock)
	}

	/*
		Just an auxiliary function for debugging and such.
	*/
	printChain(){
		this.chain.forEach( (value) => {
			console.log(value)
		})
	}

	lastBlock(){
		return this.chain[this.chain.length - 1]
	}

	/* 
		TODO: A function that checks the integrity of the chain (iterate i and i - 1 blocks and checks the links and recomputes hash).

		TODO: Maybe try to break the integrity somehow.

		TODO: Proof of work algorithm and consensus algorithm. 
		https://www.criptofacil.com/o-que-e-e-como-funciona-o-proof-of-work/
		https://ethereum.org/en/developers/docs/consensus-mechanisms/
	*/
}

export {Blockchain}