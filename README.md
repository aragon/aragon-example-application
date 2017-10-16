# Aragon Example Module

This is a simple example of a module for Aragon.

The repository contains the UI and logic for the module, as well as the contracts.

The module itself is a simple counter - the user can increment a value in the contract or decrement it, depending on their permissions.

It showcases transactions, calls and reducing events to state.

## Deploying

First you need to build the module using Truffle. This builds the front-end and the contracts.

```bash
truffle build
```

Next, you need to deploy the contract. Take note of the contract address and publish your first version to APM.

```bash
aragon-dev-cli publish $CONTRACT_ADDRESS
```

```
info: Generating artifacts
info: Publishing to IPFS
info: Published module to IPFS: IPFS_HASH
info: This is the first time you are publishing this module
info: Sign and broadcast this transaction to create counter-example.aragonpm.test@1.0.0
To: APM_REPO_REGISTRY_ADDRESS
Data: DATA
Gas: GAS_ESTIMATE
Gas price: GAS_PRICE
```

Now you need to install the module to your DAO. You can deploy your own DAO by running the migrations of `aragon-core`.

**Steps to install**

- Deploy an `AppProxy` with the correct kernel address and application ID
- Call `setAppCode` with the application ID and the address of the deployed contract of this module
- Call `createPermission` for the entity you want to be able to increment and/or decrement the counter

## Walkthrough

First we import `node-aragon`. Note that we only import the client-specific files to reduce the bundle size of the module.

```js
const Aragon = require('@aragon/node-aragon/client').default
```

Next we store some references to elements on the DOM that we want to update.

```js
// DOM
const eventLog = document.getElementById('event-log')
const stateLog = document.getElementById('state-log')
const valueCall = document.getElementById('value-call')
const incrementButton = document.getElementById('increment')
const decrementButton = document.getElementById('decrement')
```

We then define our reducer. The reducer takes a state and an event. The event follows the shape of events in Web3.

This reducer simply logs the event to the UI and increments or decrements the state, depending on the event type.

```js
const reducer = (state, event) => {
  // Handle null state
  state = state === null ? 0 : state

  // Log event
  eventLog.innerHTML += JSON.stringify(event) + '\n'

  // Reduce event
  return event.event === 'Increment'
    ? state + 1
    : state - 1
}
```

Now we instantiate the Aragon client

```js
const app = new Aragon()
```

We then set up our state store. This function takes a reducer and returns an observable, that emits the current state of the module on each update.

The magic here is that the state is automagically cached and loaded from cache when you reload the module.

```js
const store = app.store(reducer)
```

> 📘 Alternatively you can just listen for state using `app.state()` or only events using `app.events()`.

The next few lines subscribe to our state store and updates the DOM whenever a change has occured.

```js
store.subscribe((state) => {
  stateLog.innerHTML = JSON.stringify(state, null, 2)
})
```

Finally, to showcase `call`s, we also get the value from the contract when the module is first loaded using the `call` method.

```js
app.call('value')
  .subscribe((value) => {
    valueCall.innerHTML = value
  })
```

The remaining lines are buttons that send an intent to the wrapper, which will be translated into a transaction, if possible. To publish an intent, simply invoke the function as it is named in the contract with your parameters (if any).

This will always return an observable that emits a single value, the transaction hash, or a single error (if the function does not exist or the entity does not have the necessary permissions).

```js
// Transactions
incrementButton.onclick = function () {
  app.increment()
    .subscribe((transactionHash) => {
      alert(`Decrement succeeded in transaction ${transactionHash}`)
    }, (error) => {
      alert(`Decrement could not be performed: ${error}`)
    })
}

decrementButton.onclick = function () {
  app.decrement()
    .subscribe((transactionHash) => {
      alert(`Decrement succeeded in transaction ${transactionHash}`)
    }, (error) => {
      alert(`Decrement could not be performed: ${error}`)
    })
}
```
