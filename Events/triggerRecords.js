const prompt = require('prompt-sync')();
const {ethers} = require('ethers')

const Identity = require("./build/contracts/Identity.json")
const Access = require("./build/contracts/Access.json")
NetworkId = 170301;

const IdentityAddress = Identity.networks[NetworkId].address;
const AccessAddress = Access.networks[NetworkId].address;


const IDABI = Identity.abi;
const ACABI = Access.abi;

const provider = new ethers.providers.JsonRpcProvider("http://192.168.26.242:8545"); //RaspberryPi
const signer = provider.getSigner();

const identity = new ethers.Contract(IdentityAddress, IDABI, signer);
const access = new ethers.Contract(AccessAddress, ACABI, signer);

async function main()
    {   console.log("Starting event Triggers")
        await access.setIDS(identity.address);
        await identity.setAccess(access.address);
        await access.login(1, "abcde");
        var Ahash = await access.getHash(1);
        await identity.AddPerson("Siya2000", "Siya", "Morena", "Male", 1, Ahash);

        Ahash = await access.getHash(1);
        await identity.Death("Siya2000", 1, Ahash); // Now the person is dead

        Ahash = await access.getHash(1);
        await identity.nameChange("MKHUZI001", "Sbuda", 1, Ahash);

        Ahash = await access.getHash(1);
        await identity.surnameChange("MKHUZI001", "DeBryune", 1, Ahash);

        var Ahash = await access.getHash(1);
        await identity.AddPerson("Jack1", "Jack", "Nkosi", "Male", 1, Ahash);
        Ahash = await access.getHash(1);
        await identity.Marry("Jack1", 1, Ahash);
        Ahash = await access.getHash(1);
        await identity.Divorce("Jack1", 1, Ahash);
        Ahash = await access.getHash(1);
        await identity.Marry("Jack1", 1, Ahash);
        var Ahash = await access.getHash(1);
        await identity.Widow("Jack1", 1, Ahash);
        Ahash = await access.getHash(1);
        await identity.Marry("Jack1", 1, Ahash);

        Ahash = await access.getHash(1);
        await identity.Licence("Jack1", 8, 1, Ahash);

        Ahash = await access.getHash(1);
        await identity.Licence("Jack1", 14, 1, Ahash);

        var Ahash = await access.getHash(1);
        await identity.AddPerson("AKM001", "Amit", "Mishra", "Male", 1, Ahash);

        Ahash = await access.getHash(1);
        await access.logoff(1, Ahash);
        
        console.log(".....Finished")
    }
main();