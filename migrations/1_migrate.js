var ID = artifacts.require("Identity");
var Access = artifacts.require("Access");

module.exports = async function(deployer)
    {
        deployer.deploy(ID);
        deployer.deploy(Access);
    }