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

let desiredටcapabilities = {
  "platformName":"iOS",
  "platformVersion": "8.3",
  "deviceName": "iPhone 5s",
  //"app": sampleApp('TestApp')
  "browserName": "Safari"
}

describe('example', function() {
  this.timeout(30000)

  var driver;

  before( async function () {
    driver = wd.promiseChainRemote(local)
    await driver.init(desiredටcapabilities)
  })

  it('should start an ios app', async function () {
    await driver.get('http://www.dtelepathy.com/blog/design/responsive-design-great-ux')
    let link = await driver.elementByXpath("/html/body/div[3]/div[2]/div/div[11]/div[2]/div[2]/p/a")
    await link.click()
    let contexts = await driver.contexts()
    console.log(contexts)
    let windowHandles = await driver.windowHandles()
    console.log(windowHandles)
    return
  })

  after( async () => {
    await driver.quit()
  })

})
