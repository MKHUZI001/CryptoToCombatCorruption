var Contract = require('web3-eth-contract');
Contract.setProvider('http://192.168.26.122:8545');

var abi =  require('web3-eth-abi');
var web3 = require('web3');
const { message } = require('prompt');
const prompt = require('prompt-sync')();

const Identity = require("./build/contracts/Identity.json")
var networkID = "170301";
const IdentityAddress = Identity.networks[networkID].address;

const IDABI = Identity.abi;

const identity = new Contract(IDABI, IdentityAddress);
async function RegRecords()
    {   console.log("Looking for records ....\n");
        console.log("Filter by Person ID (leave empty for all records): ")
        var findID = await prompt("Find ID: ");
        if (!findID)
            {
                await identity.getPastEvents('Register', 
                {
                    //filter: {ID: web3.utils.toHex(findID)}, // Using an array means OR: e.g. 20 or 23
                    fromBlock: 0,
                    toBlock: 'latest'
                })

                .then(function(events)
                {   
                    for (var event of events)
                        {
                            var ID = web3.utils.toAscii(event.returnValues.ID);
        
                            var date = new Date(event.returnValues.date*1000);
                            var humanDateFormat = date.toLocaleString()
        
                            AccessID = event.returnValues.AccessID;
                            console.log("\nPerson ID: " + ID);
                            console.log("Date of registration: " + humanDateFormat);
                            console.log("Registered by worker with username: "+ AccessID)
                        }
                })
            }
        else
        {
        await identity.getPastEvents('Register', 
        {
            filter: {ID: web3.utils.toHex(findID)}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
            toBlock: 'latest'
        })
        .then(function(events)
        {   
            for (var event of events)
                {
                    var ID = web3.utils.toAscii(event.returnValues.ID);
                    var date = new Date(event.returnValues.date*1000);
                    var humanDateFormat = date.toLocaleString()

                    var AccessID = event.returnValues.AccessID;
                    console.log("\nPerson ID: " + ID);
                    console.log("Date of registration: " + humanDateFormat);
                    console.log("Registered by worker with username: "+ AccessID)
                }
        })
        }

        await console.log("\nComplete.......\n");
    }

async function ChangeRecords()
    {
        console.log("Looking for records ....\n");
        console.log("Filter by Person ID (leave empty for all records): ")
        var findID = await prompt("Find ID: ");
        if (!findID)
            {
                await identity.getPastEvents('Change', 
                {
                    //filter: {ID: web3.utils.toHex(findID)}, // Using an array means OR: e.g. 20 or 23
                    fromBlock: 0,
                    toBlock: 'latest'
                })

                .then(function(events)
                {   
                    for (var event of events)
                        {
                            var ID = web3.utils.toAscii(event.returnValues.ID);
                            var date = new Date(event.returnValues.date*1000);
                            var humanDateFormat = date.toLocaleString();
                            var method = web3.utils.toAscii(event.returnValues.method);
                            var AccessID = event.returnValues.AccessID;
                            var old = event.returnValues.old;
                            var change = event.returnValues.change;

                            console.log("\nChange for a Person with ID: "+ID);
                            console.log("Method of change: "+method);
                            console.log("Value before change: " + old);
                            console.log("Changed to: "+change);
                            console.log("Date of Change: "+ humanDateFormat);
                            console.log("Change done by worker with username: "+ AccessID);
                            
                        }
                })
            }
        else
            {
                await identity.getPastEvents('Change', 
                {
                    filter: {ID: web3.utils.toHex(findID)}, // Using an array means OR: e.g. 20 or 23
                    fromBlock: 0,
                    toBlock: 'latest'
                })

                .then(function(events)
                {   
                    for (var event of events)
                        {
                            var ID = web3.utils.toAscii(event.returnValues.ID);
                            var date = new Date(event.returnValues.date*1000);
                            var humanDateFormat = date.toLocaleString();
                            var method = web3.utils.toAscii(event.returnValues.method);
                            var AccessID = event.returnValues.AccessID;
                            var old = event.returnValues.old;
                            var change = event.returnValues.change;

                            console.log("\nChange for a Person with ID: "+ID);
                            console.log("Method of change: "+method);
                            console.log("Value before change: " + old);
                            console.log("Changed to: "+change);
                            console.log("Date of Change: "+ humanDateFormat);
                            console.log("Change done by worker with username: "+ AccessID);
                            
                        }
                })
            }
        await console.log("\nComplete.......\n");
    }

async function main()
    {   console.log("Welcome to the Identity Database Search\n");
        while(true)
        {
            console.log("Select the database you wish to find (Enter Number)");
            console.log("1. Look at Registration Records");
            console.log("2. Look at Changes Records");
            console.log("Enter -1 to exit \n");
            var opt = await prompt("Option: ");
            if (opt === "1")
                await RegRecords()
            else if (opt === "2")
                await ChangeRecords()
            else if (opt === "-1")
                {   console.log("Thank you!!! \n");
                    return
                }
            else
                console.log("Invalid Selection \n");
        }
    }
main();
/*
        identity.getPastEvents('Register', {
            filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ console.log(events); })
        .then(function(events){
            console.log(events) // same results as the optional callback above
        });

*/