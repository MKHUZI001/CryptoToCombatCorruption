var Contract = require('web3-eth-contract');
Contract.setProvider('ws://192.168.26.122:8545'); //Macbook Address
var abi =  require('web3-eth-abi');
var web3 = require('web3');

const Identity = require("./build/contracts/Identity.json")
var networkID = 170301; 
const IdentityAddress = Identity.networks[networkID].address;

const IDABI = Identity.abi;

const identity = new Contract(IDABI, IdentityAddress);

identity.events.Register(() => {})
.on("connected", function(subscriptionId){
    console.log('SubID: ',subscriptionId);
})
.on('data', function(event){
    //console.log(event);
    var ID = web3.utils.toAscii(event.returnValues.ID);
    console.log(event.returnValues.ID);
    console.log('Event ID:', ID);
    console.log("Byted: ", web3.utils.toHex(ID));
})

.on('error', function(error, receipt) {
    console.log('Error:', error, receipt);
});;


//Find Date in Human Format
//var date = new Date(event.returnValues.date*1000);
//var humanDateFormat = date.toLocaleString()
//console.log("Date: " +  humanDateFormat);