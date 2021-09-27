import Rule from '../../../css/rule'
import {Vocab} from './predictor'

export default class Processor {
  private static processProp(prop: string) {
    if (prop[0] === '-')  prop = prop.slice(prop.indexOf('-', 1))
    return prop
  }

  private static processColor(value: string, kind: string) {
    let result = [NaN, NaN, NaN, NaN]
    if (kind === 'HASH') {
      value = value.slice(1)
      const x = value.length in [3, 4] ? 1 : 2
      const a = value.length in [4, 8] ? value.slice(3 * x) : (x === 1 ? 'f' : 'ff')
      let temp = [value.slice(0, x), value.slice(x, 2 * x), value.slice(2 * x, 3 * x), a]
      if (value.length in [3, 4]) {
        temp = [temp[0] + temp[0], temp[1] + temp[1], temp[2] + temp[2], temp[3] + temp[3]]
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

  public static processRule(rule: Rule, useSelector = false, prefix = '') {
    const result: any[] = []
    const selectors = useSelector ? this.processSelectors(rule.selector, prefix) : ['']
    rule.declarations.forEach(decl => {
      const [prop, kind, value, unit] = [decl.property, decl.type, decl.value, decl.unit]
      selectors.forEach(() => {
        result.push([
          this.processProp(prop),
          decl.important,
          kind,
          unit,
          ...this.processVal(value, kind),
          ...this.processColor(value, kind),
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
          isNaN(row[6]) ? 2 : 1,
          isNaN(row[7]) ? 2 : 1,
          isNaN(row[8]) ? 2 : 1,
          isNaN(row[9]) ? 2 : 1,
          isNaN(row[10]) ? 2 : 1,
          isNaN(row[11]) ? 2 : 1,
          isNaN(row[12]) ? 2 : 1,
          isNaN(row[13]) ? 2 : 1,
        ],
        ...row.slice(6),
      ])
    })
    return result
  }

  public static categorize(rows: any[][], col: number, vocab: Vocab) {
    rows.forEach(row => {
      const key = row[col] as string
      row[col] = vocab[key] ? vocab[key] : 0
    })
    return rows
  }
}
