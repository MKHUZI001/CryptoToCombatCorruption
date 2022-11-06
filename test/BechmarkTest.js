const Identity = artifacts.require("Identity");
const Access = artifacts.require("Access");
var identity;
var access;
//balance = await metaCoinInstance.getBalance.call(accounts[0]);
//assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");

var N =20; // Number of uploads to make for test 3
var Ahash = 5;
var person1 = 87;
var ID = "";
console.log("number of iterative uploads for Test 3 is = " + N);
contract("Network Benchmarking", (accounts) => {
  it("Test 1: Linking Identity and Access control smart contracts", async () => {
    identity = await Identity.deployed();
    access = await Access.deployed();
    await identity.isAlive();
    await access.isAlive();
    await identity.setAccess(access.address);
    await access.setIDS(identity.address); 
  })

  it("Test 2: Logging in an access user ", async () => {
    await access.login(1, "abcde");
  })
  it ('Test 3: Testing if the identity contract can save and retrieve a persons information using ID, iterating N times', async () => 
  {   
    for (let i = 0; i < N; i++) { 
         ID = i + "ID";
     Ahash = await access.getHash(1);
    await identity.AddPerson(ID, "Siya", "Morena", "Male", 1, Ahash);
    Ahash = await access.getHash(1);
    person1 = await identity.getPersonInfo.call(ID, 1, Ahash);
    }
  }
)

})