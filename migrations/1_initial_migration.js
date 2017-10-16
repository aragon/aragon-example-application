var Migrations = artifacts.require('./misc/Migrations.sol')
var Counter = artifacts.require('./Counter.sol')

module.exports = function (deployer) {
  deployer.deploy(Migrations)
  deployer.deploy(Counter)
}
