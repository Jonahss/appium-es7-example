// transpile:mocha

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import 'mochawait'
import denodeify from 'denodeify'
import _ from 'lodash'
import wd from 'wd'
import sampleApp from 'sample-apps'

let should = chai.should()
chai.use(chaiAsPromised)

let local = {
  host: 'localhost',
  port: 4723
}

let sauce = {
  host: 'ondemand.saucelabs.com',
  port: 80,
  username: process.env.SAUCE_USERNAME,
  password: process.env.SAUCE_ACCESS_KEY
}

let desiredටcapabilities = [
  {
    "platformName":"ios",
    "platformVersion": "7.1",
    "deviceName": "iPhone 4s",
    "app": sampleApp('TestApp'),
    "noReset": true
  },
  {
    "platformName":"ios",
    "platformVersion": "7.1",
    "deviceName": "iPhone 4s",
    "browserName": "safari",
    "noReset": true
  }
]

describe('example', function() {
  this.timeout(30000)

  var driver;

  before( async function () {
    driver = wd.promiseChainRemote(local)
    await driver.init(desiredටcapabilities[0])
  })

  it('should start an ios app', async function () {

    await driver.source()
    await driver.quit()

    var driver1 = wd.promiseChainRemote(local)
    await driver1.init(desiredටcapabilities[1])
    await driver1.source()
    await driver1.quit()
  })

  after( async () => {
    //await driver.quit()
  })

})
