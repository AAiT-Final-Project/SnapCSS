import Rule from './rule'
import * as postcss from 'postcss'

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

  public toString() {
    let result = ''
    if (this.name !== '') result += `@${this.name} ${this.params} {\n`
    result += this.rules.join('\n\n')
    if (this.name !== '') result += '\n}'
    return result
  }

  public toObject = () => {
    return {
      name: this.name,
      params: this.params,
      rules: this.rules.map(rule => rule.toObject()),
    }
  }
}
