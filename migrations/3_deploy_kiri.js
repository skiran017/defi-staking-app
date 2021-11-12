// eslint-disable-next-line no-undef
const Kiri = artifacts.require('Kiri');

module.exports = async function(deployer) {
  await deployer.deploy(Kiri);
};
