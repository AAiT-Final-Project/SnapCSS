import Loader from '../../src/load/loader2'
import {testData, expectedResult} from './test-cases'

describe('UC01 - Load CSS', () => {
  test('TC_Load_01: Check Loading with valid CSS file', async () => {
    const load = Loader.loadCSS
    const [, message] = load(testData.TC_Load_001)
    expect(message[0]).toContain(expectedResult.TC_Load_001)
  })
  test('TC_Load_03: Check loading of Empty CSS', async () => {
    const load = Loader.loadCSS
    const [, message] = load(testData.TC_Load_003)
    expect(message[0]).toContain(expectedResult.TC_Load_003)
  })
  test('TC_Load_03: Check system response to invalid CSS code', async () => {
    const load = Loader.loadCSS
    const [, message] = load(testData.TC_Load_005)
    expect(message[0]).toContain(expectedResult.TC_Load_005)
  })
})
