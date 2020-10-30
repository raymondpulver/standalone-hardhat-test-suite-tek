# standalone-hardhat-test-suite-tek

This tek made possible by the wisdoms of Pato, creator of hardhat

## What is this tek, Ray?

This one just makes it so you don't have to run `yarn hardhat node` in another window to run a simple test suite. You can just use the hardhat in-process provider that actually is there for you, even though the good Pato wants you to run a separaet hardhat node to run a suite.

You'll need a hardhat.config.js in your project. The best hardhat.config.js for this tek is created in this way:

``shell
touch hardhat.config.js
``

There will be nothing in this file and technically this is a valid nodejs module which exports an empty object. Pretty neat. Now you can do the next stuff.

## Procedure

```js
'use strict';

const { JsonRpcProvider } = require('@ethersproject/providers');
const { 
  network: {
    provider: hardhatProvider
  }
}= require('hardhat');

const provider = new (class extends JsonRpcProvider {})(); // extend JsonRpcProvider so we can break it safely

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

```

Now you can run this with `yarn hardhat test` and it'll run a real test suite that is standalone and your program doesn't have to fight over your other ports bound to the machine, all that stuff

See if it works!
