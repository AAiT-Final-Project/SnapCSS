import snap = require('../../src/index')
import {testData, expectedResult} from './test-cases'

describe('UC02 - Clean CSS', () => {
  test('TC_Clean_01: Check that redundant declarations are removed', async () => {
    let css = snap.getCSS(testData.TC_Clean_001)
    css = await snap.optimize(css, 'c')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Clean_001)
  })
  test('TC_Clean_02: Check that non-redundant declarations are not removed', async () => {
    let css = snap.getCSS(testData.TC_Clean_002)
    css = await snap.optimize(css, 'c')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Clean_002)
  })
  test('TC_Clean_03: Check that multiple value representations are combined into one', async () => {
    let css = snap.getCSS(testData.TC_Clean_003)
    css = await snap.optimize(css, 'c')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Clean_003)
  })
})
