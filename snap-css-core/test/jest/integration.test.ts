import snap = require('../../src/index')
import {testData, expectedResult} from './test-cases'

// cleaner and restructurer
describe('Integration Testing - Cleaner and restructurer', () => {
  test('TC_Integrate_001: Check that Cleaner and Restructurer work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_001)
    css = await snap.optimize(css, 'cr')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_001)
  })
  test('TC_Integrate_002: Check that Cleaner and Restructurer work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_002)
    css = await snap.optimize(css, 'cr')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_002)
  })
})

// cleaner and compressor
describe('Integration Testing - Cleaner and Compressor', () => {
  test('TC_Integrate_003: Check that Cleaner and Compressor work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_003)
    css = await snap.optimize(css, 'ck')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_003)
  })
  test('TC_Integrate_004: Check that Cleaner and Compressor work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_004)
    css = await snap.optimize(css, 'ck')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_004)
  })
})

// cleaner and suggester
describe('Integration Testing - Cleaner and Suggester', () => {
  test('TC_Integrate_003: Check that Cleaner and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_005)
    css = await snap.optimize(css, 'cs')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_005)
  })
  test('TC_Integrate_003: Check that Cleaner and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_006)
    css = await snap.optimize(css, 'cs')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_006)
  })
})

// restructurer and compressor
describe('Integration Testing - Restructurer and Compressor', () => {
  test('TC_Integrate_007: Check that Restructurer and Compressor work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_007)
    css = await snap.optimize(css, 'rk')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_007)
  })
  test('TC_Integrate_008: Check that Restructurer and Compressor work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_008)
    css = await snap.optimize(css, 'rk')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_008)
  })
})

// restructurer and suggester
describe('Integration Testing - Restructurer and Suggester', () => {
  test('TC_Integrate_009: Check that Restructurer and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_009)
    css = await snap.optimize(css, 'rs')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_009)
  })
  test('TC_Integrate_010: Check that Restructurer and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_010)
    css = await snap.optimize(css, 'rs')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_010)
  })
})

// compressor and suggester
describe('Integration Testing - Compressor and Suggester', () => {
  test('TC_Integrate_011: Check that Compressor and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_011)
    css = await snap.optimize(css, 'ks')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_011)
  })
  test('TC_Integrate_012: Check that Compressor and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_012)
    css = await snap.optimize(css, 'ks')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_012)
  })
})

// cleaner, restructurer and compressor
describe('Integration Testing - Cleaner, Restructurer and Compressor', () => {
  test('TC_Integrate_013: Check that Cleaner, Restructurer, and Compressor work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_013)
    css = await snap.optimize(css, 'crk')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_013)
  })
  test('TC_Integrate_014: Check that Cleaner, Restructurer and Compressor work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_014)
    css = await snap.optimize(css, 'crk')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_014)
  })
})

// cleaner with restructurer and suggester
describe('Integration Testing - Cleaner, Restructurer and Suggester', () => {
  test('TC_Integrate_015: Check that Cleaner, Restructurer and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_015)
    css = await snap.optimize(css, 'crs')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_015)
  })
  test('TC_Integrate_016: Check that Cleaner, Restructurer and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_016)
    css = await snap.optimize(css, 'crs')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_016)
  })
})

// cleaner with compressor and suggester
describe('Integration Testing - Cleaner, Compressor and Suggester', () => {
  test('TC_Integrate_017: Check that Cleaner, Compressor and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_017)
    css = await snap.optimize(css, 'cks')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_017)
  })
  test('TC_Integrate_018: Check that Cleaner, Compressor and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_018)
    css = await snap.optimize(css, 'cks')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_018)
  })
})

// restructurer with compressor and suggester
describe('Integration Testing - Restructurer, Compressor and Suggester', () => {
  test('TC_Integrate_019: Check that Restructurer, Compressor and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_019)
    css = await snap.optimize(css, 'rks')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_019)
  })
  test('TC_Integrate_020: Check that Restructurer, Compressor and Suggester work together', async () => {
    let css = snap.getCSS(testData.TC_Integrate_020)
    css = await snap.optimize(css, 'rks')
    expect(css.toString().split('\n').join('')).toContain(expectedResult.TC_Integrate_020)
  })
})
