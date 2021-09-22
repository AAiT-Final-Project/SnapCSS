import * as postcss from 'postcss'
import Declaration from './declaration'

export default class Rule {
  static fromAST(rule: postcss.Rule, padding = '') {
    const result = new Rule(rule.selector, [], padding)
    rule.walkDecls(decl => {
      result.declarations.push(...Declaration.fromAST(decl))
    })
    return result
  }

  private suggestions: string[] = []

  constructor(
    public selector: string,
    public declarations: Declaration[] = [],
    public padding = ''
  ) {}

  public addDeclaration(declaration: Declaration, index = this.declarations.length) {
    this.declarations.splice(index, 0, declaration)
  }

  public deleteDeclarationsByIndex(...indices: number[]) {
    const result: Declaration[] = []
    const set = new Set(indices)
    this.declarations.forEach((decl, i) => {
      if (!set.has(i)) result.push(decl)
    })
    this.declarations = result
  }

  public makeSuggestions(suggestions: string[]) {
    this.suggestions = suggestions
  }

  public toString() {
    let result = ''
    const tab = `\n${this.padding}  `
    if (this.suggestions.length > 0)
      result += `// Suggested Selectors -> ${this.suggestions.join(', ')}\n`
    result += `${this.padding}${this.selector} {${tab}${this.declarations.join(tab)} \n${this.padding}}`
    return result
  }

  public toObject = () => {
    return {
      selector: this.selector,
      declarations: this.declarations.map(declaration => declaration.toObject()),
    }
  }
}
