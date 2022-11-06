pragma solidity ^0.8.2;
// SPDX-License-Identifier: MIT
import {Identity} from "./Identity.sol";

struct Company
    {   
        uint reg;
        string name;
        string location;
        string license;
        bool status;
        string[] Pshareholders;
        uint[] Bshareholders;
    }

contract Business
    {   
        mapping(uint=>Company) companies;
        Identity IDS;
        //
        function setIDS(address _IDS) public
            {
                IDS = Identity(_IDS);
            }
        //
        // Register a new company
        function Register(uint _reg ,string memory name, string memory location, string memory _licence) public
            {   require(!verify(_reg), "Company with this ID already exists");
                companies[_reg] = Company(_reg, name, location,_licence,false, new string[](0),  new uint[](0));
            }
        //
        // Get the information about the business
        function getInfo(uint _reg) public view returns (string memory name, string memory location, string memory license, bool status)
            {
                verify(_reg);
                name = companies[_reg].name;
                location = companies[_reg].location;
                license = companies[_reg].license;
                status = companies[_reg].status;
            }
        //
        // Add a Person ShareHolder, thus confirms business
        function AddPShareholder(uint _reg, string memory _ID) public
            {
                require(!(isPOwner(_reg, _ID)), "The person is already part of the shareholders");
                companies[_reg].Pshareholders.push(_ID);
            }
        //
        // Add a Business Shareholder, thus confirms business
        function AddBShareholder(uint _reg, uint _bus) public
            {
                require(!(isBOwner(_reg, _bus)), "The person is already part of the shareholders");
                companies[_reg].Bshareholders.push(_bus);
            }
        //
        // Verify if a company was once registred
        function verify(uint _reg) private view returns (bool)
            {
                if (companies[_reg].reg == 0)
                    {
                        return false;
                    }
                return true;
            }
        //
        // Confirms if a company is registred and has owners
        function confirm(uint _reg) public view returns (bool)
            {
                require(verify(_reg), "The company is not registred");
                return companies[_reg].status;
            }
        //
        // Check is a persom is a shareholder of a company
        function isPOwner(uint _reg, string memory _ID) public view returns (bool)
            {   
                require(IDS.confirm(_ID), "cannot confirm the _ID on person database");
                require(confirm(_reg), "The company has not been confirmed please attach shareholder to it");
                for (uint i = 0; i<companies[_reg].Pshareholders.length; i++)
                    {
                        if (keccak256(abi.encodePacked(_ID)) == keccak256(abi.encodePacked(companies[_reg].Pshareholders[i])))
                            {
                                return true;
                            }
                    }
                return false;
            }
        //
        // Check is a business is a shareholder of the other business
        function isBOwner(uint _reg, uint _bus) public view returns (bool)
            {
                require(confirm(_reg), "The company has not been confirmed please add shareholder to it");
                require(confirm(_bus), "An uncofirmed company cannot be a shareholder of a comany");
                for (uint i = 0; i<companies[_reg].Bshareholders.length; i++)
                    {
                        if (_bus == companies[_reg].Bshareholders[i])
                            {
                                return true;
                            }
                    }
                return false;
            }
        //
        // Get Person Ownwers
        function getPOwners(uint _reg) public view returns (string[] memory)
            {
                confirm(_reg);
                return companies[_reg].Pshareholders;
            }
        //
        // Get Business Owners
        function getBOwners(uint _reg) public view returns (uint[] memory)
            {
                require(confirm(_reg), "The business is not confirmed");
                return companies[_reg].Bshareholders;
            }
        //
        // Remove status
        function Revoke(uint _reg) public
            {
                require(confirm(_reg), "The business is not confirmed");
                companies[_reg].status = false;
            }
        //
        // Ratify company status
        function Ratify(uint _reg) public
            {
                require(!(confirm(_reg)), "The company is already confirmed");
                companies[_reg].status = true;
            }
    }