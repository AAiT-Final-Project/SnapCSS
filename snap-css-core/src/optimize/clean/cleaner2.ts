/* eslint-disable guard-for-in */
import Optimizer from '../optimizer'
import CSS from '../../css/css'
import RuleSet from '../../css/rule-set'
import Unifier from './unifier'

export default class Cleaner implements Optimizer {
  public optimize(input: CSS): CSS {
    input.ruleSets.forEach(ruleSet => {
      const picked = this.findUsed(ruleSet)
      Unifier.unifyValues(ruleSet, picked)
      this.removeRedundant(ruleSet, picked)
      this.removeEmptyRules(ruleSet)
    })
    this.removeEmptyRuleSets(input)
    return input
  }

  private findUsed(ruleSet: RuleSet) {
    const usedDecl: Set<string> = new Set()
    const declMap = ruleSet.getSelectorDeclarations()
    for (const key in declMap) {
      let best = declMap[key][0]
      declMap[key].forEach(indices => {
        const [decl, bestDecl] = [ruleSet.getDeclaration(...indices), ruleSet.getDeclaration(...indices)]
        if (decl.important || !bestDecl.important) best = indices
      })
      usedDecl.add(best.join(','))
    }
    return usedDecl
  }

  private removeRedundant(ruleSet: RuleSet, usedDecl: Set<string>) {
    const declMap = ruleSet.getSelectorDeclarations()
    const removables: number[][] = []
    for (const key in declMap) {
      declMap[key].forEach(indices => {
        if (!usedDecl.has(indices.join(','))) removables.push(indices)
      })
    }
    ruleSet.deleteDeclarationsByIndex(...removables)
  }

  private removeEmptyRules(ruleSet: RuleSet) {
    const removables: number[] = []
    ruleSet.rules.forEach((rule, i) => {
      if (rule.declarations.length === 0) removables.push(i)
    })
    ruleSet.deleteRulesByIndex(...removables)
  }

  private removeEmptyRuleSets(css: CSS) {
    const removables: number[] = []
    css.ruleSets.forEach((ruleSet, i) => {
      if (ruleSet.rules.length === 0) removables.push(i)
    })
    css.deleteRuleSetsByIndex(...removables)
  }
}
