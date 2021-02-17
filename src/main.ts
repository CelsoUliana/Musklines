import express from "express"
import { BlockChainRouter } from './routes/blockchain.router'

let router = new BlockChainRouter()

const app = express().use(router.Router()).listen(8000, () => {
    console.log('Listening on port 8000')
})