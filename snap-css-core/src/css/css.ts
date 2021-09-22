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

  public deleteRuleSetsByIndex(...indices: number[]) {
    const result: RuleSet[] = []
    const set = new Set(indices)
    this.ruleSets.forEach((ruleSet, i) => {
      if (!set.has(i)) result.push(ruleSet)
    })
    this.ruleSets = result
  }

  public toString() {
    return this.ruleSets.join('\n')
  }

  public toObject = () => {
    return {
      ruleSets: this.ruleSets.map(set => set.toObject()),
    }
  }
}
