import RuleSet from '../../css/rule-set'
import Declaration from '../../css/declaration'
import colorNames from './color-names'

interface ColorNameMap {
  [name: string]: string;
}

export default class Unifier {
  private static nameValues: ColorNameMap = colorNames

  public static unifyValues(ruleSet: RuleSet, indices: Set<string>) {
    indices.forEach(indString => {
      const argPattern = /\(\s*([^)]+?)\s*\)/
      const declaration = ruleSet.getDeclaration(...indString.split(',').map(x => parseInt(x, 10)))
      const processRGBNum = (arg: string) => {
        let val
        if (arg[arg.length - 1] === '%') val = Math.round(parseInt(arg.slice(0, arg.length - 1), 10) * 2.55)
        else val = parseInt(arg, 10)
        let valString = val.toString(16)
        if (valString.length === 1) valString = `0${valString}`
        return valString
      }

      const processHSLNum = (arg: string) => {
        return arg[arg.length - 1] === '%' ?
          parseInt(arg.slice(0, arg.length - 1), 10) / 100 :
          parseInt(arg, 10)
      }

      const small = declaration.value.toLowerCase()
      let newVal: string = declaration.value
      if (declaration.type === 'FUNCTION') {
        const parsed = argPattern.exec(declaration.value)
        const args = parsed ? parsed[1].split(',').map(input => input.trim()) : ['0', '0', '0', '0']
        if (small.includes('rgb')) {
          const [r, g, b] = args.slice(0, 3).map(processRGBNum)
          newVal = `#${r}${g}${b}`
        } else if (small.includes('hsl')) {
          const [h, s, l] = args.slice(0, 3).map(processHSLNum)
          const [r, g, b] = Unifier.hslToRgb(h, s, l).map(x => processRGBNum(x.toString()))
          newVal = `#${r}${g}${b}`
        }
        if (small.includes('rgba') || small.includes('hsla')) {
          const arg = args[3][args[3].length - 1] === '%' ?
            parseFloat(args[3].slice(0, args[3].length - 1)) * 2.55 :
            parseFloat(args[3]) * 255
          const res = Math.round(arg).toString(16)
          newVal += res.length === 2 ? res : `0${res}`
        }
      } else if (declaration.type === 'HASH') {
        if ([4, 5].includes(small.length)) {
          const [r, g, b] = [small[1] + small[1], small[2] + small[2], small[3] + small[3]]
          newVal = `#${r}${g}${b}${small.length === 5 ? small[4] + small[4] : ''}`
        }
      } else if (declaration.type === 'STRING' && this.nameValues[small])
        newVal = this.nameValues[small]

      if (newVal !== declaration.value) {
        const [value, type, unit] = Declaration.processValue(newVal)
        declaration.value = value
        declaration.type = type
        declaration.unit = unit
      }
    })
  }

  private static hslToRgb(h: number, s: number, l: number) {
    let [r, g, b] = [0, 0, 0]
    const c = (1 - Math.abs((2 * l) - 1)) * s
    const [x, m] = [c * (1 - Math.abs(((h / 60) % 2) - 1)), l - (c / 2)]

    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0]
    else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0]
    else if (h >= 120 && h < 180) [r, g, b] = [0, c, x]
    else if (h >= 180 && h < 240) [r, g, b] = [0, x, c]
    else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c]
    else if (h >= 300 && h < 360) [r, g, b] = [c, 0, x]
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
  }
}
