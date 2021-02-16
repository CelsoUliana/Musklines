import { Blockchain }  from './model/blockchain'
import express, { Router } from "express"

let Musklines = new Blockchain()
Musklines.addTransaction(1337, '3l0n mu5k', 'random yt fan')
Musklines.addTransaction(1337, '3l0n mu5k', 'random guy on tt')
Musklines.mine(3)
Musklines.mine(3)
Musklines.printChain()
//console.log(Musklines.lastBlock())

const router: Router = Router()

const app = express().use(router).listen(8000, () => {
    console.log('Listening on port 8000')
})

router.get("/", async (req, res) => {
     res.send(await Musklines.lastBlock())
})


