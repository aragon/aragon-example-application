const Aragon = require('@aragon/node-aragon/client').default

// DOM
const eventLog = document.getElementById('event-log')
const stateLog = document.getElementById('state-log')
const valueCall = document.getElementById('value-call')
const incrementButton = document.getElementById('increment')
const decrementButton = document.getElementById('decrement')

// State
// Gets the current state from cache, catches up
// with events and persists the state in cache
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

const app = new Aragon()
const store = app.store(reducer)

// Alternatively you can listen for only state with app.state()
// Or only events w/ app.events()

// UI
store.subscribe((state) => {
  stateLog.innerHTML = JSON.stringify(state, null, 2)
})

app.call('value')
  .subscribe((value) => {
    valueCall.innerHTML = value
  })

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
