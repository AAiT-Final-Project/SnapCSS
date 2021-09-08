import * as postcss from 'postcss'
const expander = require('shortcss')

export default class Declaration {
  private static processValue(value: string) {
    const separated = value.split(/(\d+)/).filter(x => x.length)
    const options = [
      ['^[-+]?\\d+?[a-zA-Z]*$', separated[0], 'DIMENSION', separated[1]],
      ['^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{8}|[a-fA-F0-9]{4})$', value, 'HASH', ''],
      ['^[-+]?\\d+$', value, 'INTEGER', ''],
      ['^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$', value, 'NUMBER', ''],
      ['\\d+(?:\\.\\d+)?%', separated[0], 'PERCENTAGE', separated[1]],
    ]
    for (let i = 0; i < options.length; i++)
      if (value.match(new RegExp(options[i][0])))
        return options[i].slice(1, 4)
    return [value, 'STRING', '']
  }

  static fromAST(decl:  postcss.Declaration) {
    const expanded: {string: string} = expander.expand(decl.prop, decl.value)
    const result: Declaration[] = []

    Object.entries(expanded).forEach(
      ([prop, val]) => {
        const [value, type, unit] = this.processValue(val)
        result.push(new Declaration(prop, value, type, unit, decl.important))
      }
    )
    return result
  }

  constructor(
    public property: string,
    public value: string,
    public type: string,
    public unit: string,
    public important: boolean
  ) {
  }

  public toString = () => `${this.property} : ${this.value}${this.unit}${this.important ? ' !important' : ''};`

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
