const Counter = artifacts.require('./Counter.sol')

contract('Counter App', function(accounts) {
  it('should start with a value of 0', function () {
    return Counter.deployed()
      .then((instance) => {
        return instance.value()
      })
      .then((value) => {
        assert.equal(value.valueOf(), 0, `0 wasn't the starting value`)
      })
  })
  
  context('incrementing value', function () {
    it('emits an event', function () {
      return Counter.deployed()
        .then((instance) => {
          return instance.increment()
        })
        .then((receipt) => {
          const events = receipt.logs
            .filter((log) => log.event == 'Increment')
          assert.equal(events.length, 1, 'increment did not emit an event')
        })
    })
    it('increments the value', async function () {
      const instance = await Counter.deployed()
      return instance.increment()
        .then(() => {
          return instance.value()
        })
        .then((value) => {
          assert.equal(value.valueOf(), 2, `increment did not increment the value`)
        })
    })
  })

  context('decrementing value', function () {
    it('emits an event', function () {
      return Counter.deployed()
        .then((instance) => {
          return instance.decrement()
        })
        .then((receipt) => {
          const events = receipt.logs
            .filter((log) => log.event == 'Decrement')
          assert.equal(events.length, 1, 'decrement did not emit an event')
        })
    })
    it('decrements the value', async function () {
      const instance = await Counter.deployed()
      return instance.decrement()
        .then(() => {
          return instance.value()
        })
        .then((value) => {
          assert.equal(value.valueOf(), 0, `decrement did not decrement the value`)
        })
    })
  })
})
