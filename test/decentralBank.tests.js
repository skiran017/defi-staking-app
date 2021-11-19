const Tether = artifacts.require('Tether');
const Kiri = artifacts.require('Kiri');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('DecentralBank', ([owner, customer]) => {
  //all of the code goes here for testing
  let tether, rewardToken, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, 'ether');
  }

  //Load contracts
  before(async () => {
    tether = await Tether.new();
    rewardToken = await Kiri.new();
    decentralBank = await DecentralBank.new(
      tether.address,
      rewardToken.address
    );

    //transfer all the tokens decentralBank(1 mil.)
    await rewardToken.transfer(decentralBank.address, tokens('1000000'));

    //transfer 100 mock tethers to customer
    await tether.transfer(customer, tokens('100'), { from: owner });
  });

  describe('Mock Tether Deployment', async () => {
    it('matches name successfully', async () => {
      const name = await tether.name();
      assert.equal(name, 'Mock Tether token');
    });
  });

  describe('Reward Token Deployment', async () => {
    it('matches name successfully', async () => {
      const name = await rewardToken.name();
      assert.equal(name, 'Kiri token');
    });
  });

  describe('Decentral Bank Deployment', async () => {
    it('matches name successfully', async () => {
      const name = await decentralBank.name();
      assert.equal(name, 'Decentral Bank');
    });
    it('contract has tokens', async () => {
      let balance = await rewardToken.balanceOf(decentralBank.address);
      assert.equal(balance, tokens('1000000'));
    });
  });

  describe('Yeild Farming', async () => {
    it('reward tokens for staking', async () => {
      let result;
      // Check Investor Balance
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens('100'),
        'customer mock wallet balance before staking'
      );

      // Check Staking For Customer of 100 tokens
      await tether.approve(decentralBank.address, tokens('100'), {
        from: customer,
      });
      // await decentralBank.depositTokens(tokens('100'), { from: customer });
      //
    });
  });
});
