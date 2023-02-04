# CryptoToCombatCorruption
UCT EEE final year project.

link to Youtube: https://youtube.com/playlist?list=PL1oUogMER8BhUgQZR8g6PvVd5O7OJzE-k


link to Report: https://www.overleaf.com/read/tyvtzkjsqzzs

# 5G Scalability
link to Report: https://www.overleaf.com/read/dmtjhqyftsyh

# Folder Description
Blockchain Network: The folder contains the genesis file, the encrypted account keystore file, and the text file with all necessary basic commands and information

Events: The folder contains javascript code for listening to events, searching emitted event records (Records.js), and code(trigger.js) to execute contract transactions with events.

Identification System Application: The code for a react Identity Application that stores information on the blockchain network. This is constantly updated to improve user experience, code, and easy installation.

Scalability: The folder contains benchmarking results (for 5G scalability). This includes node dashboards, results in an excel file, and a python multi-thread testing program.

Contracts: The folder contains Solidiy Smart Contracts. 

Migrations: The truffle migration file used to deploy and automatically link the Access and Identity Smart Contracts.

Test: The folder contains truffle script files to test the contacts and benchmark the network. The tests use Mocha and Chai frameworks.

## NodeJS Packages
Please ensure that all node packages are downloaded for the app to function properly. 
The command: `npm install` should install all used packages for the app

## IP addresses
 Ensure that IP addresses match the device you are using, current files only include the IP address used during project development.
 
## Server Error on some browsers (Cross-Origin Restrictions)
For browsers with Cross-Origin Restrictions (especially Safari) please disable this setting or the app will not work on the blockchain network

## More Info
follow YouTube guideline videos and look at the WiKi page.

## Added Features
Contracts are now automatically linked by the migration script on the migration folder. If contracts are manually deployed without the use of this migration script then use updateContracts.js on the Identity Application folder to link the addresses of the contracts.

You do not need to enter a custom network ID, the first network ID on the contract JSON will be taken when setting up Identification Blockchain Application. Only change network variables if you deployed the contracts (Identity and Access) on multiple different networks.
