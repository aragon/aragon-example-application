// app/script.js
import Aragon from '@aragon/client'

// Initialise the app
const app = new Aragon()

// Listen for events and reduce them to a state
const state$ = app.store((state, event) => {
  // Initial state
  if (state === null) state = 0
  
  // Build state
  switch (event.event) {
    case 'Decrement':
      state--
      break
    case 'Increment':
      state++
      break
  }
  
  return state
})
