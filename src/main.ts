import express from "express"
import { BlockChainRouter } from './routes/blockchain.router'

let router = new BlockChainRouter()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router.Router())

/*
    Gonna try to change to peer-to-peer connection (as should be in a decentralized network like a blockchain).
    But I am confused as heck right now.
*/
app.listen(8000, () => {
    console.log('Listening on port 8000')
})