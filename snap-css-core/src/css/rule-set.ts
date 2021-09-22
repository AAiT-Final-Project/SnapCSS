import Rule from './rule'
import * as postcss from 'postcss'

interface DeclarationMap {
  [key: string]: number[][];
}

export default class RuleSet {
  static fromAST(block: postcss.AtRule | postcss.Root) {
    if (block instanceof postcss.AtRule) {
      const result = new RuleSet(block.name, block.params)
      const padding = '  '
      block.walkRules(rule => {
        result.rules.push(Rule.fromAST(rule, padding))
      })
      return result
    }
    const result = new RuleSet()
    const padding = ''
    block.each(rule => {
      if (rule instanceof postcss.Rule)
        result.rules.push(Rule.fromAST(rule, padding))
    })
    return result
  }

  public rules: Rule[] = []

  constructor(
    public name: string = '',
    public params: string = '',
  ) {}

  public addRule(rule: Rule, index = this.rules.length) {
    this.rules.splice(index, 0, rule)
  }

  public deleteRulesByIndex(...indices: number[]) {
    const result: Rule[] = []
    const set = new Set(indices)
    this.rules.forEach((rule, i) => {
      if (!set.has(i)) result.push(rule)
    })
    this.rules = result
  }

  public deleteDeclarationsByIndex(...indices: number[][]) {
    indices.forEach(index => {
      const rule = this.rules[index[0]]
      rule.deleteDeclarationsByIndex(index[1])
    })
  }

  public getSelectorDeclarations() {
    const result: DeclarationMap = {}
    this.rules.forEach((rule, i) => {
      rule.selector.split(',').forEach(selector => {
        rule.declarations.forEach((decl, j) => {
          const key = `${selector.trim()}|${decl.property}`
          if (!result[key]) result[key] = []
          result[key].push([i, j])
        })
      })
    })
    return result
  }

  public toString() {
    let result = ''
    if (this.name !== '') result += `@${this.name} ${this.params} {\n`
    result += this.rules.join('\n\n')
    if (this.name !== '') result += '\n}'
    return result + '\n'
  }

  public toObject() {
    return {
      name: this.name,
      params: this.params,
      rules: this.rules.map(rule => rule.toObject()),
    }
  }
}
