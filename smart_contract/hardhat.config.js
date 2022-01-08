
require ('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/9mZyxNO5HxWAkefxaQRDOqbVUUxDbEJv',
      accounts: ['439b4d47a9b84e4334673275323309b8f2369d3d0cb3be80fd0966915238c809']
    }
  }
}