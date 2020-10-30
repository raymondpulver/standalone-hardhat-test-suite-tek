'use strict';

const { JsonRpcProvider } = require('@ethersproject/providers');
const { 
  network: {
    provider: hardhatProvider
  }
}= require('hardhat');

const provider = new (class extends JsonRpcProvider {})();

Object.getPrototypeOf(provider).send = hardhatProvider.send.bind(hardhatProvider); // much better

const signer = provider.getSigner(0);
const ethers = require('ethers');

describe('your test suite', () => {
  it('works', async () => {
    await signer.sendTransaction({
      value: ethers.utils.parseEther('1'),
      to: ethers.constants.AddressZero // just send it to hell
    });
  });
});
