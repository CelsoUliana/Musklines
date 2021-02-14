import { Node } from './node'
import { Transaction } from './transactions'

export class Blockchain{

	private chain: Array<Node>
	private transactions: Array<Transaction>

	/*
        First block, no transactions (I guess could have something like transactions to investors or something) and nothing important really excluding index and hash.
    */
	constructor(){
		this.chain = new Array<Node>(this.startChain())
		this.transactions = new Array<Transaction>()
	}

	/*
		Literature calls the first block genesis block, so shall I.
	*/	
	private startChain(){
		return new Node(0, new Date().toISOString(), new Array<Transaction>(new Transaction(1, '3l0n mu5k', 'me')), 137, '0')
	}

	/*
		Well, this is weird.
		https://en.bitcoin.it/wiki/Transaction
		Also, Ethereum uses nonce on transaction as well.
		https://ethereum.stackexchange.com/questions/12779/how-do-nodes-detect-the-duplicate-transactions-when-malicious-misbehaving-miner
	*/
	public addTransaction(transaction: Transaction | number, sender?: string, receiver?: string){
		if(transaction instanceof Transaction){
			return this.transactions.push(transaction)
		}
		else{
			if(sender !== undefined && receiver !== undefined){
				let newTransaction = new Transaction(transaction, sender, receiver)
				this.transactions.push(newTransaction)
			}
		}
	}
	
	/*
		Add a new block, should only happen when one has found the proof of work.
	*/
	private addBlock(proof: number){
		let newblock = new Node(
			this.chain.length, 
			new Date().toISOString(), 
			this.transactions, 
			proof, 
			this.chain[this.chain.length - 1].getHash())
		this.transactions = new Array<Transaction>()
		this.chain.push(newblock)
	}

	public mine(nonce: number){
		if(nonce === 3){
			return this.addBlock(nonce)
		}
	}

	/*
		Just an auxiliary function for debugging and such.
	*/
	public async printChain(){
		this.chain.forEach( (value) => {
			console.log(value)
		})
	}

	public lastBlock(){
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