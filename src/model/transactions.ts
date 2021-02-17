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

    constructor(index:number, amount: number, sender: string, receiver: string, description?: string){
        this.index = index
        this.amount = amount
        this.sender = sender
        this.receiver = receiver
        this.description = description
    }
}