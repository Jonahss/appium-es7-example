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

let desired_capabilities = {
  "platformName":"iOS",
  "platformVersion": "8.3",
  "deviceName": "iPhone Simulator",
  "app": sampleApp('TestApp')
}

describe('example', function() {
  this.timeout(20000)

  var driver;

  before( async function () {
    driver = wd.promiseChainRemote(local)
    await driver.init(desired_capabilities)
  })

  it('should start an ios app', async function () {
    let source = await driver.source()
    let data = await driver.pullFile('/Containers/Bundle/Application/E60FFDE4-8C99-4DFB-98FD-81D3EBD8F558/TestApp-iphonesimulator.app/Info.plist')
    return console.log(data)
  })

  after( () => {
    driver.quit()
  })

})
