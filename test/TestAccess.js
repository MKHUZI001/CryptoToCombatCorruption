const Identity = artifacts.require("Identity");
const Access = artifacts.require("Access");
var identity;
var access;
//balance = await metaCoinInstance.getBalance.call(accounts[0]);
//assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");

describe("Testing Access Control Smart Contract", (accounts) => {
it("Test 1: Linking Identity and Access control smart contracts", async () => {
    identity = await Identity.deployed();
    access = await Access.deployed();
    await identity.setAccess(access.address);
    await access.setIDS(identity.address); 
  })

it("Test 1B (Must Fail): Re-Linking Identity and Access control smart contracts without unlocking", async () => {
    await identity.setAccess(access.address);
    await access.setIDS(identity.address); 

  })

it("Test 2(Must Fail): Logging in an access user with incorrect password", async () => {
    await access.login(1, "no password");
  })

it("Test 3(Must Fail): Logging in an access user with incorrect username", async () => {
    await access.login(86646, "abcde");
  })

it("Test 4(Must Pass): Logging in an access user with correct password and test access", async () => {
    await access.login(1, "abcde");
    var Ahash = await access.getHash(1); 
    await access.access(1, Ahash, 2);
  })

it("Test 5(Must Fail): Requesting access with incorrect hash", async () => {
    var Ahash = '0xd203de42c1ad4d540556f7a0b002dbbf39c890251848779f8772a03c75ecfa15';  //Some random hash
    await access.access(1, Ahash, 2);
  })

it("Test 6(Must Fail): Requesting access twice with the same hash", async () => {
    var Ahash = await access.getHash(1); 
    await access.access(1, Ahash, 2);
    await access.access(1, Ahash, 2);
  })

it("Test 7(Must Pass): Adding new Access user", async () => {
    var Ahash = await access.getHash(1);  //Some random hash
    await identity.AddPerson("Siya2000", "Siya", "Morena", "Male", 1, Ahash);
    var Ahash = await access.getHash(1);
    var newAccessID = 2;
    var userID = "Siya2000"; //Id in the identity database
    var password = "uzile";
    var accesslevel = 2;
    await access.add(1, Ahash, userID, newAccessID, password, accesslevel);
  })

it("Test 8(Must Pass): logging in new user and test access", async () => {
    await access.login(2, "uzile");
    Ahash = await access.getHash(2);
    await access.access(2, Ahash, 2);
  })

it("Test 9(Must Fail): Using hash of user in another user to request access", async () => {
    Ahash = await access.getHash(1);
    await access.access(2, Ahash, 2);
  })

it("Test 10(Must Fail): Using hash of user in another user to request access", async () => {
    Ahash = await access.getHash(1);
    await access.access(2, Ahash, 2);
  })

it("Test 11(Must Fail): Trying to log off with incorrect hash", async () => {
    var Ahash = '0xd203de42c1ad4d540556f7a0b002dbbf39c890251848779f8772a03c75ecfa15';  //Some random hash;
    await access.access(2, Ahash, 2);
  })

it("Test 12(Must Pass): Trying to log off users with correct hash", async () => {
    var Ahash = await access.getHash(2);  //Some random hash;
    await access.logoff(2, Ahash);
    var Ahash = await access.getHash(1);  //Some random hash;
    await access.logoff(1, Ahash);
  })

it("Test 13(Must Fail): Trying to access with an offline user", async () => {
    var Ahash = await access.getHash(2);  //Some random hash;
    await access.access(2, Ahash, 2);
  })
  }
)