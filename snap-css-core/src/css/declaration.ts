import * as postcss from 'postcss'

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
    const [value, type, unit] = this.processValue(decl.value)
    return new Declaration(decl.prop, value, type, unit, decl.important)
  }

  constructor(
    public property: string,
    public value: string,
    public type: string,
    public unit: string,
    public important: boolean
  ) {
  }

  public toString = () => `${this.property} : ${this.value}${this.unit};`
}
