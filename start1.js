const cp = require('child_process');
const Web3 = require('web3');

(async () => {
    let portNumber = 3314;
    let containerName = 'belt_bsc_fork2';
    let addHost = 'api.bsc5.ozys.net:3.34.253.103';
    let RPC = 'http://api.bsc5.ozys.net';
    let web3 = new Web3(RPC);
    let blockNumber = process.env.BLOCK_NUMBER || await web3.eth.getBlockNumber();
    let unlockAddresses = '0x816b6B0EC36Bc8Ac7BB6E9f3AE8B5455bA654418,0x7111D0F651A331BC2b9eeFCFE56D8A03F92601a1,0xF68a4b64162906efF0fF6aE34E2bB1Cd42FEf62d,0xfDf6Aa725457C9695C4a6FAC12818a16507E84f9';
    let chainId = 3314;
    let networkId = 3314;
    let blockTime = 3;
    let defaultEther = 20000000;
    let mnemonic = 'spatial cherry nuclear affair spring trap glory flock exercise early pig front dignity scale token leader setup earn also fluid debris shoot dream physical';


    let command = `docker run`;
    if (addHost) {
        command += ' ';
        command += `--add-host=${addHost}`
    }
    command += ' ';
    command += `-d --name="${containerName}" -p ${portNumber}:8545 trufflesuite/ganache-cli`;
    //let command = `docker run -d --name="belt_bsc_fork" -p ${portNumber}:8545 trufflesuite/ganache-cli`;
    command += ' ';
    command += `-f ${RPC}@${blockNumber}`;
    command += ' ';

    unlockAddresses = unlockAddresses.split(',');
    for (let i = 0; i < unlockAddresses.length; i++) {
        command += `-u ${unlockAddresses[i]}`;
        command += ' ';
    }

    if (true) {
        command += `--chainId ${chainId}`;
        command += ' ';
    }

    if (true) {
        command += `--networkId ${networkId}`;
        command += ' ';
    }

    if (true) {
        command += `-m ${mnemonic}`;
        command += ' ';
    }

    if (true) {
        command += `-e ${defaultEther}`;
        command += ' ';
    }

    if (false) {
        command += `-b ${blockTime}`;
        command += ' ';
    }

    if (true) {
        command += '--keepAliveTimeout 5000';
        command += ' ';
    }

    if (true) {
        command += '--forkCacheSize -1';
        command += ' ';
    }

    console.log(command);
    // cp.exec(command);
})();

