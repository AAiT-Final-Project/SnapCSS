import Rule from '../../../css/rule'
import {Vocab} from './predictor'

class Processor {
  private static processProp(prop: string) {
    if (prop[0] === '-')  prop = prop.slice(prop.indexOf('-', 1))
    return prop
  }

  private static processColor(value: string, kind: string) {
    // consider adding a to the mix
    let result = [NaN, NaN, NaN]
    if (kind === 'HASH') {
      value = value.slice(1)
      const x = value.length in [3, 4] ? 1 : 2
      let temp = [value.slice(0, x), value.slice(x, 2 * x), value.slice(2 * x, 3 * x)]
      if (value.length in [3, 4]) {
        temp = [temp[0] + temp[0], temp[1] + temp[1], temp[2] + temp[2]]
      }
      result = temp.map((val: string) => {
        return parseInt(val, 16)
      })
    }
    return result
  }

  private static processVal(value: string, kind: string) {
    return [
      kind === 'STRING' ? value : null,
      kind === 'FUNCTION' ? 2 : 1,
      kind === 'DIMENSION' ? parseFloat(value) : NaN,
      kind === 'INTEGER' ? parseInt(value, 10) : NaN,
      kind === 'NUMBER' ? parseFloat(value) : NaN,
      kind === 'PERCENTAGE' ? parseFloat(value) : NaN,
    ]
  }

  private static processSelectors(selectors: string, prefix = '') {
    const splits: string[] = []
    selectors.split(',').forEach(selector => {
      const temp = selector.match(/\.[a-zA-Z]+[-\d\w]*/)
      if (temp && temp.length > 0) splits.push(temp[0])
    })
    const result = new Set()
    splits.forEach(name => {
      result.add(name.replace(prefix, ''))
    })
    return [...result.values()] as string[]
  }

  public static processRule(rule: Rule, useSelector = true, prefix = '') {
    const result: any[] = []
    const selectors = useSelector ? this.processSelectors(rule.selector, prefix) : ['']
    rule.declarations.forEach(decl => {
      const [prop, kind, value, unit] = [decl.property, decl.type, decl.value, decl.unit]
      selectors.forEach(selector => {
        result.push([
          this.processProp(prop),
          decl.important,
          kind,
          unit,
          ...this.processVal(value, kind),
          ...this.processColor(value, kind),
          selector,
        ])
      })
    })
    return result
  }

  public static fillMissing(rows: any[][]) {
    const result: any[][] = []
    rows.forEach(row => {
      result.push([
        ...row.slice(0, 6),
        ...[
          row[6].isNaN() ? 2 : 1,
          row[7].isNaN() ? 2 : 1,
          row[8].isNaN() ? 2 : 1,
          row[9].isNaN() ? 2 : 1,
          row[10].isNaN() ? 2 : 1,
          row[11].isNaN() ? 2 : 1,
          row[12].isNaN() ? 2 : 1,
        ],
        ...row.slice(6),
      ])
    })
    return result
  }

  public static categorize(rows: any[][], col: number, vocab: Vocab) {
    rows.forEach(row => {
      row[col] = vocab[row[col] as string]
    })
    return rows
  }
}
