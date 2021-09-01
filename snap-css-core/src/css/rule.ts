import * as postcss from 'postcss'
import Declaration from './declaration'

export default class Rule {
  static fromAST(rule: postcss.Rule, padding = '') {
    const result = new Rule(rule.selector, padding)
    rule.walkDecls(decl => {
      result.declarations.push(Declaration.fromAST(decl))
    })
    return result
  }

  public declarations: Declaration[] = []

  private suggestions: string[] = []

  constructor(
    public selector: string,
    public padding = ''
  ) {}

  makeSuggestions() {
    this.suggestions = ['.home', 'div']
  }

  public toString() {
    let result = ''
    const tab = `\n${this.padding}  `
    if (this.suggestions.length > 0)
      result += `// Suggested Selectors -> ${this.suggestions.join(', ')}\n`
    result += `${this.padding}${this.selector} {${tab}${this.declarations.join(tab)} \n${this.padding}}`
    return result
  }
}
