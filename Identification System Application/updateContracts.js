const {ethers} = require('ethers')
const Identity = require("./src/contracts/Identity.json")
const Access = require("./src/contracts/Access.json")
var networkID = 170301;
const IdentityAddress = Identity.networks[networkID].address;
const AccessAddress = Access.networks[networkID].address;

const provider = new ethers.providers.JsonRpcProvider("http://192.168.27.187:8545");

async function main()
    {
        const signer = provider.getSigner();
        const IDABI = Identity.abi;
        const ACABI = Access.abi;
        console.log("Configuring contracts........");
        const identity = new ethers.Contract(IdentityAddress, IDABI, signer);
        const access = new ethers.Contract(AccessAddress, ACABI, signer);
        console.log("..... Setting Access to Identity");
        await access.setIDS(IdentityAddress);
        console.log("Identity address:" + IdentityAddress);
        console.log("..... Setting Identity to Access");
        await identity.setAccess(AccessAddress);
        console.log("Access address:" + AccessAddress);
        console.log(":) Complete.");
    }
main();