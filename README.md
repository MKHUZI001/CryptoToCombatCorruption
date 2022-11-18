# CryptoToCombatCorruption
UCT EEE final year project.

link to Youtube: https://youtube.com/playlist?list=PL1oUogMER8BhUgQZR8g6PvVd5O7OJzE-k


link to Report: https://www.overleaf.com/read/tyvtzkjsqzzs

# Folder Description
contracts: contains smart contract (compile and deploy this file to get contract ABI)
test: Truffle suite test codes to ensure that contracts function as intended
APP: Developed Identification System Application
Events: Scripts for searching records or listening to events.

## NodeJS Packages
Please ensure that all node packages are downloaded for the app to fucntion properly. 
The command: `npm install` should install all used packages for the app

## IP addresses
 Ensure that IP addresses macth the device you are using, current files only include IP address used during project development
 
## Server Error on some browsers (Cross-Origin Restrictions)
For browers with Cross-Origin Restrictions (espetially Safari) please disable this setting or the app will not work the blockchain network

## More Info
follow YouTube guideline videos and look at the WiKi page.

## Added Features
Contract are now automatically linked by the migrate script on the migration folder. If contract are manually deployed without the use of this script then use updateContracts.js on the App/ folder to link the addresses of the contracts.

You do not need to enter custom network ID, the first network ID on the contract JSON will be taken when setting up Identification Blockchain Application. Only change if you deployed the contracts (Identity and Access) to multiple different networks using same contract JSON (file in build folder)
