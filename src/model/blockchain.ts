import { Node } from './node'
import { Transaction } from './transactions'
import { RSAKeys } from '../services/helper'
import { Serializable } from '../services/deserialize'

export class Blockchain implements Serializable<Blockchain>{
	private chain: Array<Node>
	private onHoldTransactions: Array<Transaction>
	private difficulty: number

	/*
        First block, no transactions (I guess could have something like transactions to investors or something) and nothing important really excluding index and hash.
    */
	constructor(){
		this.chain = new Array<Node>(this.startChain())
		this.onHoldTransactions = new Array<Transaction>(this.proofOfWorkTransaction('me'))
		this.difficulty = 0
	}

	/*
		Literature calls the first block genesis block, so shall I.
	*/	
	private startChain(): Node{
		return new Node(0, new Date().toISOString(), new Array<Transaction>(new Transaction(0, 1, '3l0n mu5k', 'me', 'Genesis block')), 1337, '0')
	}

	/*
		Well, this is weird.
		https://en.bitcoin.it/wiki/Transaction
		Also, Ethereum uses nonce on transaction as well.
		https://ethereum.stackexchange.com/questions/12779/how-do-nodes-detect-the-duplicate-transactions-when-malicious-misbehaving-miner
	*/
	public addTransaction(transaction: Transaction | number, sender?: string, receiver?: string, message?: string): number{
		let keys = new RSAKeys()
		if(transaction instanceof Transaction){
			return this.onHoldTransactions.push(transaction)
		}
		else{
			if(sender !== undefined && receiver !== undefined){
				let newTransaction = new Transaction(this.onHoldTransactions.length, transaction, sender, receiver, message)
				newTransaction.encryptData(keys.encrypt(newTransaction))
				let text = this.verifyTransaction(newTransaction, keys)
				console.log(text)
				console.log(newTransaction.TransactionToString())
				return this.onHoldTransactions.push(newTransaction)
			}
		}
	}
	
	/*
		Auxiliary function to return the decrypted string.
	*/
	public verifyTransaction(transaction: Transaction, keys: RSAKeys): string{
		let text = keys.decrypt(transaction.encryptedData) 
		return text
	}

	/*
		As it is right now, ongoing transactions list will start with the "mining reward", so when the block is created
		that mining reward will be the first transaction.
		Very spaghetti-like code I guess.
		Will try to change later.
	*/
	private proofOfWorkTransaction(receiver: string): Transaction{
		return new Transaction(0, 10, 'Mining reward', receiver, 'Congratulations on mining this block!')
	}

	/*
		Create a new block, should only happen when one has found the proof of work.
	*/
	private async newBlock(nonce: number): Promise<Node>{

		let newblock = new Node(
			this.chain.length, 
			new Date().toISOString(), 
			this.onHoldTransactions,
			nonce, 
			this.chain[this.chain.length - 1].getHash())

		return newblock
	}

	/*
		A leet proof of work.
	*/
	public async mine(): Promise<void>{
		let nonce = 1
		let block = await this.newBlock(nonce)
		let leet = '137'
		leet = [leet.slice(0, 1), '3'.repeat(this.difficulty), leet.slice(1)].join('')

		while(!block.getHash().startsWith(leet)){
			nonce += 1
			block = await this.newBlock(nonce)
		}

		this.onHoldTransactions = new Array<Transaction>(this.proofOfWorkTransaction('me'))
		this.chain.push(block)
	}

	/*
		Just an auxiliary function for debugging and such.
	*/
	public async printChain(): Promise<void>{
		this.chain.forEach( (value) => {
			console.log(value)
		})
	}

	public async lastBlock(): Promise<Node>{
		return this.chain[this.chain.length - 1]
	}

	public async size(): Promise<number>{
		return this.chain.length
	}

	public async consensus(blockchain: Blockchain): Promise<boolean>{
		console.log(await this.size())
		console.log(await blockchain.size())
		if(await blockchain.size() > await this.size()){
			this.chain = blockchain.chain
			this.onHoldTransactions = blockchain.onHoldTransactions
			this.difficulty = blockchain.difficulty
			return true
		}
		return false
	}

	/*
		Ugh, just Ugh.
	*/
	deserialize(input: any) {
        let chain = new Array<Node>()

		input.chain.forEach(node => {
			let arrTs = new Array<Transaction>()
			node.transactions.forEach(ts => {
				let trans: Transaction
				if(ts.description === undefined){
					trans = new Transaction(ts.index, ts.amount, ts.sender, ts.receiver)
				}
				else{
					trans = new Transaction(ts.index, ts.amount, ts.sender, ts.receiver, ts.description)
				}
				if(ts.encryptedData){
					trans.encryptedData = ts.encryptedData
				}
				arrTs.push(trans)
			})
			let newNode = Node.pseudoConstructor(node.index, node.timestampString, arrTs, node.nonce, node.link, node.hash)
			chain.push(newNode)
		})

		let arrTs = new Array<Transaction>()
		input.onHoldTransactions.forEach(ts => {
			let trans: Transaction
			if(ts.description === undefined){
				trans = new Transaction(ts.index, ts.amount, ts.sender, ts.receiver)
			}
			else{
				trans = new Transaction(ts.index, ts.amount, ts.sender, ts.receiver, ts.description)
			}
			if(ts.encryptedData){
				trans.encryptedData = ts.encryptedData
			}
			arrTs.push(trans)
		})

		this.chain = chain
		this.onHoldTransactions = arrTs
		this.difficulty = input.difficulty

        return this;
    }

	/* 
		TODO: A function that checks the integrity of the chain (iterate i and i - 1 blocks and checks the links and recomputes hash).

		TODO: Maybe try to break the integrity somehow.

		TODO: Proof of work algorithm and consensus algorithm. 
		https://www.criptofacil.com/o-que-e-e-como-funciona-o-proof-of-work/
		https://ethereum.org/en/developers/docs/consensus-mechanisms/
	*/
}