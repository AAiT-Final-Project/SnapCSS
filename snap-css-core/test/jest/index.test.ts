import snap = require('../../src/index')
import {testData, expectedResult} from './test-cases'

// cleaner, restructurer and compressor
describe('System Testing - All Modules', () => {
  test('TC_System_001: Check that all modules work together', async () => {
    let css = snap.getCSS(testData.TC_System_001)
    css = await snap.optimize(css, 'a')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_System_001)
  })
  test('TC_System_002: Check that all modules work together', async () => {
    let css = snap.getCSS(testData.TC_System_002)
    css = await snap.optimize(css, 'a')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_System_002)
  })
})
