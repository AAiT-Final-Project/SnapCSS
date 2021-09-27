import snap = require('../../src/index')
import {testData, expectedResult} from './test-cases'

describe('UC02 - Compress Declarations', () => {
  test('TC_Compress_01: Check that shorthand representations are created for longhand values', async () => {
    let css = snap.getCSS(testData.TC_Compress_001)
    css = await snap.optimize(css, 'k')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Compress_001)
  })
  test('TC_Compress_02: Check that compression happens for multiple blocks', async () => {
    let css = snap.getCSS(testData.TC_Compress_002)
    css = await snap.optimize(css, 'k')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Compress_002)
  })
  test('TC_Compress_03: Check that no longhand properties remain in the end', async () => {
    let css = snap.getCSS(testData.TC_Compress_003)
    css = await snap.optimize(css, 'k')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Compress_003)
  })
  test('TC_Compress_04: Check that all types of longhand properties are accounted for', async () => {
    let css = snap.getCSS(testData.TC_Compress_004)
    css = await snap.optimize(css, 'k')
    expect(css.toString().split('\n').join('')).toBe(expectedResult.TC_Compress_004)
  })
})
