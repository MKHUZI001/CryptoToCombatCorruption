pragma solidity ^0.8.2;
// SPDX-License-Identifier: MIT
import {Identity} from "./Identity.sol";

struct Accessor
    {
        string ID;
        uint AccessID;
        string password;
        uint access;
        bool status;
        bytes32 AccessHash;   
    }
//
contract Access
    {
        // Instance Variables
            int rand = 0;
            mapping (uint => Accessor) users;
            Identity IDS;
            bool lock = false;

        //
        // Create a high priority user
        constructor() 
            {
                users[1] = Accessor("MKHUZI001", 1, "abcde", 0, false, "");
            }
        //
        // Setup the Identification System
        function setIDS(address _IDS) public
            {   
                require(!lock, "The Identification System Address is locked");
                IDS = Identity(_IDS);
                lock = true;
            }
        //
        //Unlock the Identification Contract Address
        function unlockIDS(uint _RequestID, bytes32 _hash) public
            {
                access(_RequestID, _hash, 0);
                lock = false;
            }
        //
        // Create/Add a User who will have access
        function add(uint _RequestID,bytes32 _hash, string memory ID, uint _AccessID, string memory _password, uint _access) public
            {
                require(access(_RequestID, _hash, 0), "Only High Priority Accounts can add new users");
                require(IDS.confirm(ID), "You can only add a person with confirmed ID");
                rand++;
                users[_AccessID] = Accessor(ID, _AccessID, _password, _access, false, "");
            }
        //
        // Remove a user
        function remove(uint _user ,uint _RequestID, bytes32 _hash) public
            {
                access(_RequestID, _hash, 0);
                require(verify(_user), "The user provided is not registred");
                delete users[_user];
            }
        //
        // Verify that the Access Person is valid in the database
        function verify(uint _RequestID) private returns (bool)
            {
                rand++;
                return  IDS.confirm(users[_RequestID].ID);
            }
        //
        // Approve/Reject requested permission
        function access(uint _RequestID, bytes32 _hash, uint _access) public returns (bool)
            {
                rand++;
                require(verify(_RequestID), "The user provided is not registred");
                require(users[_RequestID].status, "The person is not logged in");
                require(users[_RequestID].access <= _access, "User does not have priviledges of requested access");
                require(users[_RequestID].AccessHash == _hash, "The access hash is not correct");
                hashGenerator(_RequestID);
                return true;
            }
        //
        // Login an Accessor
        function login(uint _RequestID, string memory _password) public
            {
                require(verify(_RequestID), "_RequestID not in user database.");
                require(keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(users[_RequestID].password)), "Denied: Incorrect Password");
                require(!users[_RequestID].status, "user already active");
                rand--; 
                users[_RequestID].status = true;
                hashGenerator(_RequestID);
            }
        //
        // Logof an Accessor
        function logoff(uint _RequestID, bytes32 _hash) public
            {
                require(verify(_RequestID), "The person is not verified");
                require(users[_RequestID].status, "The person is not logged in");
                require(users[_RequestID].AccessHash == _hash, "The access hash do not match");
                rand--;
                users[_RequestID].status = false;
                users[_RequestID].AccessHash = "";
            }
        //
        // Generate hash for a given accessor
        function hashGenerator(uint _RequestID) private 
            {   require(users[_RequestID].status, "The user is not online cannot generate hash.");
                uint[] memory code = new uint[](10);
                for (uint i = 0; i<10; i++)
                    {
                        code[i] = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, rand))) % 10;
                        rand++;
                    }
                users[_RequestID].AccessHash = (keccak256(abi.encodePacked(code)));
          }
        //
        // View hash of a person
        function getHash(uint _RequestID) public view returns (bytes32)
            {
                return users[_RequestID].AccessHash;
            }
        //
        // Get the human of the aacces account
        function getID(uint _RequestID, bytes32 _hash, uint _FindUser) public returns (string memory ID)
            {
                require(access(_RequestID, _hash, 1), "Access is denied");
                verify(_FindUser);
                return users[_RequestID].ID;

            }
        //
        // Check network status
        function isAlive() public pure returns (bool) 
            {
                return true;
            }
    }