const cp = require('child_process');
const Web3 = require('web3');
const args = require("yargs/yargs")(process.argv.slice(2))
    .alias('p', 'port')
    .alias('b', 'blocktime')
    .alias('e', 'defaultether')
    .alias('m', 'mnemonic')
    .argv;

require('dotenv').config();


(async () => {
    let portNumber = args.port || process.env.PORT;
    let containerName = args.name || process.env.NAME; 
    let addHost = (args.addhost || process.env.ADD_HOST).split(',');
    let RPC = args.rpc || process.env.RPC;
    let web3 = new Web3(RPC);
    let blockNumber = args.blocknumber || process.env.BLOCK_NUMBER;
    if (!blockNumber || blockNumber === '') {
        blockNumber = await web3.eth.getBlockNumber();
    }
    let unlockAddresses = args.unlockaddresses || process.env.UNLOCK_ADDRESSES;
    let chainId = args.chainid || process.env.CHAIN_ID || portNumber;
    let networkId = args.networkid || process.env.NETWORK_ID || portNumber;
    let blockTime = args.blocktime || process.env.BLOCK_TIME;
    let defaultEther = args.defaultether || process.env.DEFAULT_ETH;
    let mnemonic = args.mnemonic || process.env.MNEMONIC;
    
    let command = `docker run`;
    if (addHost && addHost != '') {
        if (typeof addHost === 'string') {
            command += ' ';
            command += `--add-host=${addHost[i]}`
        } else {
            for (let i = 0; i < addHost.length; i += 1) {
                command += ' ';
                command += `--add-host=${addHost[i]}`
            }
        }
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

    if (chainId && chainId != '') {
        command += `--chainId ${chainId}`;
        command += ' ';
    }

    if (networkId && networkId != '') {
        command += `--networkId ${networkId}`;
        command += ' ';
    }

    if (mnemonic && mnemonic != '') {
        command += `-m ${mnemonic}`;
        command += ' ';
    }
    
    if (defaultEther && defaultEther != '') {
        command += `-e ${defaultEther}`;
        command += ' ';
    }

    if (blockTime && blockTime != '') {
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

