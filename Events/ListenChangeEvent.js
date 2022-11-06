var Contract = require('web3-eth-contract');
Contract.setProvider('ws://192.168.26.242:8545');
var web3 = require('web3');

const Identity = require("./build/contracts/Identity.json")

var networkID = 170301; 
const IdentityAddress = Identity.networks[networkID].address;

const IDABI = Identity.abi;

const identity = new Contract(IDABI, IdentityAddress);

identity.events.Change(() => {})
.on("connected", function(subscriptionId){
    console.log('SubID: ',subscriptionId);
})
.on('data', function(event){
    console.log('Event:', event);
})

.on('error', function(error, receipt) {
    console.log('Error:', error, receipt);
});;