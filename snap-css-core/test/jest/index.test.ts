import SnapCss = require('../../src')
const snap = new SnapCss()

describe('testing performs', () => {
  test('adds two numbers', () => {
    expect(snap.add(1, 2)).toBe(3)
  })

  test('defaults to 0', () => {
    expect(snap.add()).toBe(0)
  })
})

