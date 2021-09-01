import RuleSet from './rule-set'
import * as postcss from 'postcss'

export default class CSS {
  static fromString(string: string) {
    const root = postcss.parse(string).root()
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
}
