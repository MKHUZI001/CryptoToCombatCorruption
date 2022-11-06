pragma solidity ^0.8.2;
// SPDX-License-Identifier: MIT
import {Access} from "./Access.sol";
struct Person
    {
        string name;
        string surname;
        string gender;
        string status;
        uint license;
        bool alive;
        string photoURL;
    }

contract Identity
    {   
        // Database/Map of people with IDs
        mapping (string => Person) people;
        // Events
        event Register(bytes32 indexed ID, uint256 date,uint indexed AccessID);
        event Change(bytes32 indexed ID, uint256 date, uint indexed AccessID, bytes32 indexed method, string old, string change);
        constructor()
            {
                people["MKHUZI001"] = Person("Uzile", "Mkhumbuzi", "Male", "Single", 0, true, "");
            }
        // Accessor (Access Control Contract)
        bool lock = false;
        Access access;
        function setAccess(address _Access) public
            {
                require(!lock, "The Access System Address is locked");
                access = Access(_Access);
                lock = true;
            }
        // Function to unclock the Access System
        function unlockAccess(uint _RequestID, bytes32 _hash) public
            {
                access.access(_RequestID, _hash, 0);
                lock = false;
            }
        // 
        // Add a person to the database
        function AddPerson(string memory _ID, string memory name, string memory surname, string memory gender, uint _user, bytes32 _hash) public
            {   
                require(access.access(_user, _hash, 1), "Access is denied");
                require(!verify(_ID), "The person with this ID already exists");
                people[_ID] = Person(name, surname, gender, "Single" ,0, true, "");
                emit Register(bytes32(bytes(_ID)), block.timestamp, _user);
            }
        //
        // Verify if a person was once added
        function verify(string memory _ID) private view returns (bool)
            {   
                if (bytes(people[_ID].name).length > 0)
                    {
                        return true;
                    }
                return false;
            }
        //
        // Confirm is a person is in the database and alive
        function confirm(string memory _ID) public view returns (bool)
            {   
                require(verify(_ID), "The given ID cannot be confirmed, it is not in database");
                require(isAlive(_ID),  "The given person ID is not alive");
                return true;
            }
        //
        // Check if the person is alive
        function isAlive(string memory ID) private view returns (bool)
            {   
                return people[ID].alive;
            }
        //
        // Get the information of a person
        function getPersonInfo(string memory ID, uint _user, bytes32 _hash) public returns (string memory name, string memory surname, string memory gender, string memory status, string memory photo,uint license, bool alive)
            {   require(access.access(_user, _hash, 2), "Access is denied");
                require(verify(ID), "The person is not in the database");
                name = people[ID].name;
                surname = people[ID].surname;
                gender = people[ID].gender;
                status = people[ID].status;
                license = people[ID].license;
                alive = people[ID].alive;
                photo = people[ID].photoURL;
            }
        //
        // Change name of a person
        function nameChange(string memory ID, string memory _name, uint _user, bytes32 _hash) public
            {   
                require(access.access(_user, _hash, 1), "Access is denied");
                require(confirm(ID));
                string memory old = people[ID].name;
                people[ID].name = _name;
                emit Change(bytes32(bytes(ID)), block.timestamp,_user, bytes32(bytes("nameChange")), old, _name);
            }
        //
        // Change surname of a person
        function surnameChange(string memory ID, string memory _surname, uint _user, bytes32 _hash) public
            {   
                require(access.access(_user, _hash, 1), "Access is denied");
                require(confirm(ID));
                string memory old = people[ID].surname;
                people[ID].surname = _surname;
                emit Change(bytes32(bytes(ID)), block.timestamp, _user, bytes32(bytes("surnameChange")), old, _surname);
            }
        //
        // Set the person status to married
        function Marry(string memory ID, uint _user, bytes32 _hash) public
            {   
                require(access.access(_user, _hash, 1), "Access is denied");
                require(confirm(ID));
                require(!(keccak256(abi.encodePacked(people[ID].status)) == keccak256(abi.encodePacked("Married"))), "The given ID is already a married Person.");
                people[ID].status = "Married";
                emit Change(bytes32(bytes(ID)), block.timestamp,_user, bytes32(bytes("Marry")), "", "");
            }
        //
        // Set the person status to divorced
        function Divorce(string memory ID, uint _user, bytes32 _hash) public
            {   
                require(access.access(_user, _hash, 1), "Access is denied");
                require(confirm(ID), "The given ID cannot be confirmed to a person");
                require(keccak256(abi.encodePacked(people[ID].status)) == keccak256(abi.encodePacked("Married")), "The given ID is not of a married person.");
                people[ID].status = "Divorced";
                emit Change(bytes32(bytes(ID)), block.timestamp,_user, bytes32(bytes("Divorce")), "", "");
            }
        //
        // Set the perosn relationship as widow
        function Widow(string memory ID, uint _user, bytes32 _hash) public
            {   
                require(access.access(_user, _hash, 1), "Access is denied");
                require(confirm(ID));
                require((keccak256(abi.encodePacked(people[ID].status)) == keccak256(abi.encodePacked("Married"))), "The given ID is not a married Person.");
                people[ID].status = "Widow";
                emit Change(bytes32(bytes(ID)), block.timestamp,_user, bytes32(bytes("Widow")), "", "");
            }
        //
        // Register the death of a person
        function Death(string memory ID, uint _user, bytes32 _hash) public
            {   
                require(access.access(_user, _hash, 1), "Access is denied");
                require(verify(ID), "The person is not in the database");
                require(isAlive(ID), "The person is already dead");
                people[ID].alive = false;
                emit Change(bytes32(bytes(ID)), block.timestamp,_user, bytes32(bytes("Death")), "", "");
            }
        //
        // Rectify false Death the death of a person
        function FixDeath(string memory ID, uint _user, bytes32 _hash) public
            {   
                require(access.access(_user, _hash, 1), "Access is denied");
                require(verify(ID), "The person is not in the database");
                require(!isAlive(ID), "The person is already dead");
                people[ID].alive = true;
                emit Change(bytes32(bytes(ID)), block.timestamp,_user, bytes32(bytes("FixDeath")), "", "");
            }
        //
        // Register the licence of a person
        function Licence(string memory ID, uint license, uint _user, bytes32 _hash) public
            {
                require(access.access(_user, _hash, 2), "Access is denied");
                confirm(ID);
                people[ID].license = license;
                emit Change(bytes32(bytes(ID)), block.timestamp,_user, bytes32(bytes("Licence")), "", "");
                
            }
        //
        function PhotoUrl(string memory ID, string memory _url, uint _user, bytes32 _hash) public
            {   
                require(access.access(_user, _hash, 2), "Access is denied");
                require(confirm(ID));
                people[ID].photoURL = _url;
            }
        //
        // Check is the network is reachable, becareful not to confuse with person alive above
        function isAlive() public pure returns (bool) 
            {
                return true;
            }
    }