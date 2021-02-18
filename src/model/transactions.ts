export class Transaction{
    /*
        Needs a index to keep it "unique" even if the sender, receiver, amount, and description or no description 
        is a duplicate of a existing transaction.
    */
    private readonly index: number
    private readonly amount: number
    private readonly sender: string
    private readonly receiver: string
    private readonly description: string

    /*
        The buffer containing RSA encrypted data.
    */
    public encryptedData: Buffer

    constructor(index:number, amount: number, sender: string, receiver: string, description?: string){
        this.index = index
        this.amount = amount
        this.sender = sender
        this.receiver = receiver
        this.description = description
    }

    /*
        Maybe should be in the constructor, but code is kinda messy right now, so I'll leave this here for now.
    */
    public encryptData(buff: Buffer): void{
        this.encryptedData = buff
    }

    /*
        Convert the entire object into a string to encrypt using RSA.
    */
    public TransactionToString(): string{
        let temp = this.index.toString() + ',' + this.amount.toString() + ',' + this.sender + ',' + this.receiver + ',' + this.description
        return temp
    }

    /*
        Maybe future aux function or something.
        Not even tested this.
    */
    public stringToTransaction(decrypted: string): Transaction{
        let string = decrypted.split(',')
        if(string[4] === undefined){
            return new Transaction(parseInt(string[0]), parseInt(string[1]), string[2], string[3])
        }
        return new Transaction(parseInt(string[0]), parseInt(string[1]), string[2], string[3], string[4])
    }
}