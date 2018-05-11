// app/app.js
import Aragon, { providers } from '@aragon/client'

const app = new Aragon(
  new providers.WindowMessage(window.parent)
)
const view = document.getElementById('view')
const increment = document.getElementById('increment')
const decrement = document.getElementById('decrement')

increment.onclick = () => {
  app.increment()
}
decrement.onclick = () => {
  app.decrement()
}

app.state().subscribe(
  (state) => {
    view.innerHTML = `The counter is ${state || 0}`
  },
  (err) => {
    view.innerHTML = 'An error occured, check the console'
    console.log(err)
  }
)
