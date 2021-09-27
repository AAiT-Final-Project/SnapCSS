import snap = require('../../src/index')
import {testData, expectedResult} from './test-cases'

describe('UC03 - Restructure CSS', () => {
  test('TC_Restructure_01: Check that common declarations are grouped together', async () => {
    let css = snap.getCSS(testData.TC_Restructure_001)
    css = await snap.optimize(css, 'r')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Restructure_001)
  })
  test('TC_Restructure_02: Check that grouped declarations are common amongst all the initial blocks', async () => {
    let css = snap.getCSS(testData.TC_Restructure_002)
    css = await snap.optimize(css, 'r')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Restructure_002)
  })
  test('TC_Restructure_03: Check that grouped declarations have been assigned the proper selectors', async () => {
    let css = snap.getCSS(testData.TC_Restructure_003)
    css = await snap.optimize(css, 'r')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Restructure_003)
  })
})
