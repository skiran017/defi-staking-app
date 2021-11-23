1. Install the necessary packages
   npm install

Make sure truggle -g is installed

2. use truffle compiile
   (compile contracts)

3. use truffle migrate --reset
   (migrate contracts on the blockchain)

4. use truffle test
   to run Moch and Chai testing suite

5. use truffle console
   to access truffle console
   tether = await Tether.new()
   tether.name() // this will give the assigned name of your Tether

6. Reward script
   truffle exec scripts/issue-tokens.js

note: when working on web3, remember to connect Ganache>>Deploy contracts(truffle compile, migrate)>>import the account from ganache to metamask>> restart the local server
