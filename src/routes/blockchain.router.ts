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

    private buildRoutes(): void{
        this.router.get("/", async (req: Request, res: Response) => {
            res.send(this.musklines.addTransaction(1337, '3l0n mu5k', 'random guy on tt').toString())
        })
        
        this.router.get("/mine", async (req: Request, res: Response) => {
            await this.musklines.mine()
            res.status(200).send(await this.musklines.lastBlock())
        })
        
        this.router.get("/print", async (req: Request, res: Response) => {
           this.musklines.printChain()
           res.json(this.musklines)
        })
    }
}