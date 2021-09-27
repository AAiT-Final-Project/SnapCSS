import snap = require('../../src/index')
import {testData, expectedResult} from './test-cases'

describe('UC05 - Suggest Class Names', () => {
  test('TC_Suggest_01: Check that suggestions are added to blocks of code', async () => {
    let css = snap.getCSS(testData.TC_Suggest_001)
    css = await snap.optimize(css, 'a')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Suggest_001)
  })
  test('TC_Suggest_02: Check the response of the system when it can not make suggestions', async () => {
    let css = snap.getCSS(testData.TC_Suggest_002)
    css = await snap.optimize(css, 's')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Suggest_002)
  })
})
