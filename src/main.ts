import { Blockchain }  from './model/blockchain'

let Musklines = new Blockchain()
Musklines.addTransaction(1337, '3l0n mu5k', 'random yt fan')
Musklines.addTransaction(1337, '3l0n mu5k', 'random guy on tt')
Musklines.mine(3)
Musklines.mine(3)
Musklines.printChain()
console.log(Musklines.lastBlock())

