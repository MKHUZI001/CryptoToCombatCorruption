const { message } = require("prompt");

const Identity = artifacts.require("Identity");
const Access = artifacts.require("Access");
var identity;
var access;
//balance = await metaCoinInstance.getBalance.call(accounts[0]);
//assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");

contract("Identity", (accounts) => {
  it("Test 1: Linking Identity and Access control smart contracts", async () => {
    identity = await Identity.deployed();
    access = await Access.deployed();
    await identity.setAccess(access.address);
    await access.setIDS(identity.address); 
  })

  it("Test 2: Logging in an access user ", async () => {
    await access.login(1, "abcde");
  })

  it ('Test 3: Testing if the identity contract can save and retrieve a persons information using ID', async () => 
  {   
    var Ahash = await access.getHash(1);
    await identity.AddPerson("Siya2000", "Siya", "Morena", "Male", 1, Ahash);
    Ahash = await access.getHash(1);
    var person1 = await identity.getPersonInfo.call("Siya2000", 1, Ahash);
    var name =  person1.name;
    var surname =  person1.surname;
    var gender =  person1.gender;
      
      assert.equal(name, 'Siya', "Returned name does not match expected name");
      assert.equal(surname, 'Morena', "Returned surname does not match expected surname");
      assert.equal(gender, "Male", "The returned gender does not match expected gender");
  }
)

it ( 'Test 4: Testing if a persons death can be recorded, and that they cannot be confirmed once dead', async () => 
{
    var Ahash = await access.getHash(1);
    assert.equal(await identity.confirm("Siya2000"), true, "A alive valid person can be confirmed"); // Still Alive
    await identity.Death("Siya2000", 1, Ahash); // Now the person is dead
    try
        {
            assert.equal(await identity.confirm("Siya2000"), true, "A dead person is falsely confirmed");
            throw "False confirmation of a dead person"
        }

    catch(e)
        {   
            if (e.message === "Returned error: execution reverted: The given person ID is not alive")
                return true;

            if (e.message === "Returned error: VM Exception while processing transaction: revert The given person ID is not alive")
                return true;

            else
                console.log(e.message)
                throw e
        }
}
)

it ( 'Test 5: Testing if we can change the name of a person in the database', async() =>
{
    var Ahash = await access.getHash(1);
    await identity.nameChange("MKHUZI001", "Sbuda", 1, Ahash);
    var Ahash = await access.getHash(1);
    var person1 = await identity.getPersonInfo.call("MKHUZI001", 1, Ahash);
    var name = await person1.name;
    assert.equal(name, 'Sbuda', "Name change was not successful, names do not match");
}
)

it ( 'Test 6: Testing if we can change the surname of a person in the database', async() =>
{
var Ahash = await access.getHash(1);
await identity.surnameChange("MKHUZI001", "DeBryune", 1, Ahash);
var Ahash = await access.getHash(1);
var person1 = await identity.getPersonInfo.call("MKHUZI001",1, Ahash);
var surname = await person1.surname;
assert.equal(surname, 'DeBryune', "Surname change was not successful, names do not match");
var Ahash = await access.getHash(1);
}
)

 it ( 'Test 7: Testing if we can change the relationship status of a person', async() =>
{var Ahash = await access.getHash(1);
await identity.AddPerson("Jack1", "Jack", "Nkosi", "Male", 1, Ahash);
Ahash = await access.getHash(1);
var person1 = await identity.getPersonInfo.call("Jack1",1, Ahash);
var status = await person1.status;
assert.equal(status, 'Single', "The status of a recently added person is incorrect");

    // Person gets married
Ahash = await access.getHash(1);
await identity.Marry("Jack1", 1, Ahash);
Ahash = await access.getHash(1);
person1 = await identity.getPersonInfo.call("Jack1", 1, Ahash);
status = await person1.status;
assert.equal(status, 'Married', "The status of a recently added person is incorrect");

    // Person gets divorced
Ahash = await access.getHash(1);
await identity.Divorce("Jack1", 1, Ahash);
Ahash = await access.getHash(1);
person1 = await identity.getPersonInfo.call("Jack1", 1, Ahash);
status = await person1.status;
assert.equal(status, 'Divorced', "The status of a recently added person is incorrect");

    // Person is now a widow
Ahash = await access.getHash(1);
await identity.Marry("Jack1", 1, Ahash);
var Ahash = await access.getHash(1);
await identity.Widow("Jack1", 1, Ahash);
Ahash = await access.getHash(1);
person1 = await identity.getPersonInfo.call("Jack1", 1, Ahash);
status = await person1.status;
assert.equal(status, 'Widow', "The status of a recently added person is incorrect");

Ahash = await access.getHash(1);
await identity.Marry("Jack1", 1, Ahash);
Ahash = await access.getHash(1);
person1 = await identity.getPersonInfo.call("Jack1", 1, Ahash);
status = await person1.status;
assert.equal(status, 'Married', "The status of a recently added person is incorrect");
}

)

it ( 'Test 8: Testing if a person licence can be changed, recorded and retrieved', async() =>
{

  
Ahash = await access.getHash(1);
var person1 = await identity.getPersonInfo.call("Jack1", 1, Ahash);
var licence = Number(await person1.license);
assert.equal(licence, 0, "The licence of a recently added person is incorrect");

    // Give a person code 8 licence
    Ahash = await access.getHash(1);
await identity.Licence("Jack1", 8, 1, Ahash);
Ahash = await access.getHash(1);
var person1 = await identity.getPersonInfo.call("Jack1", 1, Ahash);
licence = Number(await person1.license);
assert.equal(licence, 8, "Code 8 Licence was not given to a person");

    // Give a person code 14 licence
    Ahash = await access.getHash(1);
await identity.Licence("Jack1", 14, 1, Ahash);
Ahash = await access.getHash(1);
var person1 = await identity.getPersonInfo.call("Jack1", 1, Ahash);
licence = Number(await person1.license);
assert.equal(licence, 14, "Code 14 Licence was not given to a person");
}
)
    

})

