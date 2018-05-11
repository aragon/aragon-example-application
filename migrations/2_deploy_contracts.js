var App = artifacts.require('./Counter.sol')

module.exports = function (deployer) {
  deployer.deploy(App)
}
