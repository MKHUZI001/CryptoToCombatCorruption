pragma solidity ^0.8.2;
// SPDX-License-Identifier: MIT
import {Business} from "./Business.sol";
struct Tender
    {
        uint ID;
        string name;
        string location;
        string services;
        uint amount;
        uint[] Business;
        bool completed;
        bool paid;   
    }

contract Tenders
    {   
        mapping(uint=> Tender) Bidding;
        uint[] paid;
        uint[] completed;
        Business BRG;
        uint funds = 0;
        //
        // Set Business Registration System
        function setBRG(address _IDS) public
            {
                BRG = Business(_IDS);
            }
        //
        // Add a tender/contract bidding
        function AddBid(uint ID, string memory name, string memory location, string memory services, uint amount) public
            {   
                Bidding[ID] = Tender(ID, name, location, services, amount, new uint[](0), false, false);
            }
        //
        //Add Business to tender
        function AddBusiness(uint _ID, uint _reg) public
            {
                require(BRG.confirm(_reg), "The business is not confirmed or operational");
                require(verify(_ID), "The tender is not registred in the database");
                Bidding[_ID].Business.push(_reg);
            }
        //
        // Verify if a tender was once registred
        function verify(uint _ID) private view returns (bool)
            {
                if (Bidding[_ID].ID == 0)
                    {
                        return false;
                    }
                return true;
            }
        //
        // Pay the tender/Contract
        function pay(uint _ID) public 
            {
               require(verify(_ID), "The tender is not registred in the database");
               Bidding[_ID].paid = true;
               funds = funds + Bidding[_ID].amount;
               paid.push(_ID); 
            }
        //
        // Set the tender to be completed
        function complete (uint _ID) public 
            {
                require(verify(_ID), "The tender is not registred in the database");
                require(Bidding[_ID].paid, "Cannot complete a tender that is not paid");
                Bidding[_ID].completed = true;
                completed.push(_ID);
            }
        //
        // Get the Bidding Information
        function getBidInfo(uint _ID) public view returns (string memory name, string memory location, string memory services, uint amount,uint[] memory _Business, bool _paid, bool _completed)
            {
                require(verify(_ID), "The tender is not registred in the database");
                name = Bidding[_ID].name;
                location = Bidding[_ID].location;
                services = Bidding[_ID].services;
                amount = Bidding[_ID].amount;
                _Business = Bidding[_ID].Business;
                _paid = Bidding[_ID].paid;
                _completed = Bidding[_ID].completed;

            }
        //
        // View the amount of funds used/payed to tenders
        function viewFunds() public view returns (uint)
            {
                return funds;
            }
        //
        // Get completed tenders
        function getCompleted() public view returns (uint[] memory)
            {
                return completed;
            }
        //
        // Get paid tenders
        function getPaid() public view returns (uint[] memory)
            {
                return paid;
            }
    }