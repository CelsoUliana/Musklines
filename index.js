import {Blockchain} from './src/model/blockchain.js'

/*
    Just an example.
*/
let Musklines = new Blockchain()
Musklines.newTransaction('3l0n mu5k', 'random yt fan', 1337)
Musklines.newTransaction('3l0n mu5k', 'random guy on tt', 1337)
Musklines.newBlock(1337)
Musklines.newBlock(13337)
Musklines.printChain()
console.log(Musklines.lastBlock())

/*
    TODO: Do this as an API.
*/
