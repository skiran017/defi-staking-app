// eslint-disable-next-line no-undef
const Tether = artifacts.require('Tether');
const Kiri = artifacts.require('Kiri');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
  //deploy mock tether contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  //deploy reward kiri contract
  await deployer.deploy(Kiri);
  const rwd = await Kiri.deployed();

  //deploy DecentralBank contract
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  //Transfer all the Kiri tokens to Decentral Bank
  await rwd.transfer(decentralBank.address, '1000000000000000000000000');

  //distribute 100 tether tokens to investor
  await tether.transfer(accounts[1], '100000000000000000000');
};
