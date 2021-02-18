import { Blockchain }  from '../model/blockchain'
import { Router, Request, Response } from 'express'

export class BlockChainRouter{
    private router: Router
    private musklines: Blockchain

    constructor(){
        this.router = Router()
        this.musklines = new Blockchain()

        this.buildRoutes()
    }

    public Router(): Router{
        return this.router
    }
    /*
        Should be treated in a controller like class, but I have no ideia how to structure this thing right.
    */
    private buildRoutes(): void{
        this.router.post("/addTransaction", async (req: Request, res: Response) => {
            const {amount, sender, receiver} = req.body
            res.send(this.musklines.addTransaction(amount, sender, receiver).toString())
        })

        this.router.post("/consesus", async (req: Request, res: Response) => {
            let blockchain = new Blockchain().deserialize(req.body)
            res.send({'replaced' : await this.musklines.consensus(blockchain)})
        })
        
        this.router.get("/mine", async (req: Request, res: Response) => {
            await this.musklines.mine()
            res.status(200).send(await this.musklines.lastBlock())
        })
        
        this.router.get("/print", async (req: Request, res: Response) => {
           //this.musklines.printChain()
           res.json(this.musklines)
        })
    }
}