import RuleSet from './rule-set'
import * as postcss from 'postcss'
const expand = require('postcss-shorthand-expand')

export default class CSS {
  static fromString(string: string) {
    const css = require('postcss')([expand()]).process(string)
    const root = postcss.parse(css).root()
    const result = new CSS([RuleSet.fromAST(root)])
    root.walkAtRules(atRule => {
      result.ruleSets.push(RuleSet.fromAST(atRule))
    })
    return result
  }

  constructor(
    public ruleSets: RuleSet[] = []
  ) {}

  public toString() {
    return this.ruleSets.join('\n')
  }

  public toObject = () => {
    return {
      ruleSets: this.ruleSets.map(set => set.toObject()),
    }
  }
}
