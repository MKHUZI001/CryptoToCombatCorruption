pragma solidity ^0.8.2;
// SPDX-License-Identifier: MIT
import {Identity} from "./Identity.sol";
import {Business} from "./Business.sol";

struct Asset
    {   
        string reg;
        string name;
        uint value;
        string description;
        string[] POwners;
        uint[] BOwners;
    }

struct PrivateOwner
    {
        string[] assets;
    }
struct BusinessOwner
    {
        string[] assets;
    }

contract Property
    {
        mapping(string=>PrivateOwner) POwners; // Map ID to propery
        mapping(uint=>BusinessOwner) BOwners; // Map ID to propery
        mapping(string=>Asset) assets; //Register Asset to database
        Identity IDS;
        Business BRS;
        // Add the identification system
        function setIDS(address _IDS) public
            {
                IDS = Identity(_IDS);
            }
        //
        //Set the Business registration system
        function setBRS(address _BRS) public
            {
                BRS = Business(_BRS);
            }
        //
        // Add property to private/Person
        function AddProperty(string memory _reg, string memory _name, uint _value, string memory _description) public
            {   
                require(!verify(_reg), "Assets with this registration already exists.");
                Asset memory asset = Asset(_reg, _name, _value, _description, new string[](0), new uint[](0));
                assets[_reg] = asset;
            }
        //
        // Function Attach Person Ownership
        function AddPrivateOwner(string memory _reg, string memory _ID) public
            {
                require(IDS.confirm(_ID), "Cannot confirm person");
                require(!(isPrivateOwner(_reg, _ID)), "The person is already an owner");
                assets[_reg].POwners.push(_ID);
                POwners[_ID].assets.push(_reg);
            }
        //
        //Add Busineness Owner
        function AddBusinessOwner(string memory _reg, uint _Breg ) public
            {
                require(BRS.confirm(_Breg), "Cannot confirm person");
                require(!(isBusinessOwner(_reg, _Breg)), "The person is already an owner");
                assets[_reg].BOwners.push(_Breg);
                BOwners[_Breg].assets.push(_reg);
            }
        //
        // Function to check if person is owner of the property (Dead or Alive)
        function isPrivateOwner(string memory _reg, string memory _ID) public view returns (bool)
            {
                require(verify(_reg), "propery not in database");
                for (uint i=0; i<assets[_reg].POwners.length; i++)
                    {
                        if (keccak256(abi.encodePacked(assets[_reg].POwners[i])) == keccak256(abi.encodePacked(_ID)))
                            {
                                return true;
                            }
                    }
                return false;
            }
        //
        // Function to check if the business is the Owner
        function isBusinessOwner(string memory _reg, uint _Breg) public view returns (bool)
            {
                require(verify(_reg), "propery not in database");
                for (uint i=0; i<assets[_reg].BOwners.length; i++)
                    {
                        if (assets[_reg].BOwners[i] == _Breg)
                            {
                                return true;
                            }
                    }
                return false;
            }
        //
        // Verify if the property is in the database
        function verify(string memory _reg) private view returns (bool)
            {
                return (bytes(assets[_reg].reg).length > 0);
            }
        //
        // Get the properties a person owns
        function PrivateAssets(string memory _ID) public view returns (string[] memory)
            {
                require((POwners[_ID].assets.length > 0), "No property attached to this person");
                return POwners[_ID].assets;
            }
        // 
        // Get the properties a business owns
        function BusinessAssets(uint _Breg) public view returns (string[] memory)
            {
                require((BOwners[_Breg].assets.length > 0), "No property attached to this business");
                return BOwners[_Breg].assets;
            }
        // Get the details of an asset
        function getAssetInfo(string memory _reg) public view returns (string memory reg, string memory _name, uint _value, string memory _description, string[] memory _POwners, uint[] memory _BOwners)
            {
                require(verify(_reg), "Property not in database");
                reg = assets[_reg].reg;
                _name = assets[_reg].name;
                _value = assets[_reg].value;
                _description = assets[_reg].description;
                _POwners = assets[_reg].POwners;
                _BOwners = assets[_reg].BOwners;
            }
    }