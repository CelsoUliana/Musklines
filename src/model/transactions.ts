export class Transaction{
    private amount: number
    private sender: string
    private receiver: string

    constructor(amount: number, sender: string, receiver: string){
        this.amount = amount
        this.sender = sender
        this.receiver = receiver
    }
}