import * as postcss from 'postcss'
const expander = require('shortcss')

export default class Declaration {
  public static makeDeclaration(prop: string, valueString: string, important: boolean) {
    const [value, type, unit] = this.processValue(valueString)
    return new Declaration(prop, value, type, unit, important)
  }

  public static processValue(value: string) {
    const separated = value.split(/([0-9.\-+]+)/).filter(x => x.length)
    const options = [
      ['^[-+]?\\d*\\.?\\d+[a-zA-Z]+$', separated[0], 'DIMENSION', separated[1]],
      ['^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{8}|[a-fA-F0-9]{4})$', value, 'HASH', ''],
      ['^[-+]?\\d+$', value, 'INTEGER', ''],
      ['^[-+]?\\d*\\.?\\d+$', value, 'NUMBER', ''],
      ['^[\\w\\-]+\\(.*\\)$', value, 'FUNCTION', ''],
      ['^[-+]?\\d*\\.?\\d+%$', separated[0], 'PERCENTAGE', separated[1]],
    ]
    for (let i = 0; i < options.length; i++)
      if (value.match(new RegExp(options[i][0])))
        return options[i].slice(1, 4)
    return [value.trim(), 'STRING', '']
  }

  static fromAST(decl:  postcss.Declaration) {
    const expanded: {string: string} = expander.expand(decl.prop, decl.value, false)
    const result: Declaration[] = []

    Object.entries(expanded).forEach(([prop, val]) =>
      result.push(this.makeDeclaration(prop, val, decl.important)))
    return result
  }

  constructor(
    public property: string,
    public value: string,
    public type: string,
    public unit = '',
    public important = false
  ) {
  }

  public getValueString = () => `${this.value}${this.unit}`

  public toString = () => `${this.property}: ${this.getValueString().trim()}${this.important ? ' !important' : ''};`

  public toObject = () => {
    return {
      property: this.property,
      value: this.value,
      type: this.type,
      unit: this.unit,
      important: this.important,
    }
  }
}
