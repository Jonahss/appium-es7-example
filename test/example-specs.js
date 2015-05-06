// transpile:mocha

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import 'mochawait'
import denodeify from 'denodeify'
import _ from 'lodash'

let should = chai.should()
chai.use(chaiAsPromised)

describe('simple mocha test', () => {

  it('should do maths', async function () {

    let a = 1, b = 2
    let c = a+b
    c.should.equal(3)
  })

})
