## Dapp template

This project demonstrates template or boilerplate for building decentalised applications on ethereum.
It unwraps the functionality by reading the blockchain and later writing into it via smart contracts, wallets and react application. It navigates from basic usage on local system to testnet and may be mainnet later :-)

Main commands to get this project live on your local system (node:v16.20.2)
`npx hardhat node`

`npx hardhat compile` (compile the smart contracts)
`npx hardhat run scripts/deploy.js --network localhost` (deploy contracts to localnetwork)

## running frontend

`cd client`
`npm run dev` (built with vite)

## Ethereum Blockchain Interaction

This code interacts with the Ethereum blockchain using the ethers.js library. It creates a provider object to connect to an Ethereum node (JSON-RPC provider).

### Functionality

> scripts/test.js
> scripts/interactContract.js

The `queryBlock` function retrieves the current block number and the account balance for a specific Ethereum address. It demonstrates how to use ethers.js methods to interact with the blockchain and format the results.

The `procUserInput` function showcases how to parse ether values from strings, converting them to wei (the smallest denomination of ether).

### Usage

To use this code:

1. Ensure you have Node.js installed.
2. Install the ethers.js library (`npm install ethers`).
3. Replace the Ethereum address in the `provider.getBalance` function with your desired address.
4. Run the script (`node <filename>.js`) to execute the `queryBlock` and `procUserInput` functions.

### Example Output

The output will display the current block number, account balance in wei, and parsed ether value from user input.

## License

This code is provided under the [MIT License](LICENSE).
