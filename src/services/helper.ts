import { Transaction } from '@models/transactions'
import { generateKeyPairSync, publicEncrypt, KeyObject, constants, privateDecrypt } from 'crypto'

/*
	Helper class to generate RSA keys so I can "test" encrypting a transaction.
	Kinda works, but spaghetti code anyways.
*/
export class RSAKeys {
	public publicKey: KeyObject
	private privateKey: KeyObject

	constructor() {	
		this.generateKeysRSA()
	}

	private generateKeysRSA(): any{
		const { publicKey, privateKey } = generateKeyPairSync('rsa', {
			modulusLength: 2048,
		})

		this.privateKey = privateKey
		this.publicKey = publicKey
	}

	public encrypt(Transaction: Transaction): Buffer{
		let tsString = Transaction.TransactionToString()
		const encrypted = publicEncrypt({
			key: this.publicKey,
			padding: constants.RSA_PKCS1_OAEP_PADDING,
			oaepHash: 'sha256',
		},
		Buffer.from(tsString))

		return encrypted
	}

	public decrypt(encrypted: Buffer): string{
		let data = privateDecrypt({
			key: this.privateKey,
			padding: constants.RSA_PKCS1_OAEP_PADDING,
			oaepHash: 'sha256',
		},
		encrypted)
		return data.toString()
	}
}