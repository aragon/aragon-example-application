module.exports = (cb) =>
  artifacts.require(
    require('../arapp').path
  ).new()
    .then((instance) => {
      console.log(instance.address)
      cb()
    })
