var Identity = artifacts.require("Identity");
var Access = artifacts.require("Access");

module.exports = async function(deployer)
    {
    await deployer.deploy(Identity);
    await deployer.deploy(Access);

    identity = await Identity.deployed();
    access = await Access.deployed();
    await identity.setAccess(Access.address);
    await access.setIDS(Identity.address); 
    }