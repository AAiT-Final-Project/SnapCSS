import Optimizer from '../optimizer'
import CSS from '../../css/css'
import {stringify} from './helper-functions'
import Declaration from '../../css/declaration'

const helper_function = require('./helper-functions')
const reusable = require('./reusable')
const patch = require('./patch')

export default class Restructurer implements Optimizer {
  public async optimize(input: CSS): Promise<CSS> {
    const parsed = helper_function.construct(input)
    const nonMedia = this.nonMediaSelectors(parsed)
    const media = this.mediaSelectors(parsed)
    return CSS.fromString((nonMedia) + '\n' + (media))
  }

  private nonMediaSelectors(input: any) {
    let noDuplication: any = []
    const rules = input[0].stylesheet.rules
    rules.forEach((rule: { type: string; selectors: string[]; declarations: any }) => {
      if (rule.type === 'rule') {
        const declarations: [Declaration] = rule.declarations
        const declarations_: any = []
        declarations.forEach((declaration: { property: any; value: any }) => {
          if (Object.keys(declarations_).includes(declaration.property)) {
            if (!declarations_[declaration.property].includes('!important')) {
              declarations_[declaration.property] = declaration.value
            } else if (declarations_[declaration.property].includes('!important') && declaration.value.includes('!important')) {
              declarations_[declaration.property] = declaration.value
            }
          } else {
            declarations_[declaration.property] = declaration.value
          }
        })
        const selector: any = rule.selectors
        if (selector.length > 1) {
          selector.forEach((s: string | number) => {
            noDuplication[s] = declarations_
          })
        } else {
          noDuplication[selector] = declarations_
        }
      }
    })
    const reuse = reusable.findReusable(noDuplication)
    let similar = reuse[0]
    let difference = reuse[1]
    let differentProps: any = []
    const patched = patch.patch(noDuplication, similar, difference, differentProps)
    noDuplication = patched[0]
    similar = patched[1]
    difference = patched[2]
    differentProps = patched[differentProps]
    let toBEWritten = ''
    for (const n in noDuplication) {
      let tempProp = ''
      for (const ree in noDuplication[n]) {
        tempProp = tempProp + '   ' + ree + ' : ' + noDuplication[n][ree] + ';\n'
      }
      toBEWritten = toBEWritten + n + ' {\n' + tempProp + '}\n\n'
    }
    return ((toBEWritten))
  }

  private mediaSelectors(input: any) {
    const animation: any[] = []
    // x.forEach((element: any) => {
    const rules = input[1].stylesheet.rules
    rules.forEach((rule: { type: any; media: any; keyframes: any; name: any; vendor: any; rules: any }) => {
      if (rule.type === 'media') {
        const media: any = '@' + rule.type + ' ' + rule.media
        const rules_ = rule.rules
        let ruleset: any = []
        rules_.forEach((r_: { selectors: any; declarations: any }) => {
          const declarations: any = []
          r_.declarations.forEach((declaration: { property: any; value: any }) => {
            if (declaration.value.includes('!important')) {
              declarations[declaration.property] = declaration.value
            } else if (!declaration.value.includes('!important')) {
              if (Object.keys(declarations).includes(declaration.property)) {
                if (!declarations[declaration.property].includes('!important')) {
                  declarations[declaration.property] = declaration.value
                }
              } else {
                declarations[declaration.property] = declaration.value
              }
            }
          })
          if (Object.keys(ruleset).includes(r_.selectors[0])) {
            let temp = ruleset[r_.selectors]
            temp = Object.assign(temp, declarations)
            ruleset[r_.selectors] = temp
          } else {
            ruleset[r_.selectors] = declarations
          }
        })
        animation[media] = ruleset
        ruleset = []
      } else if (rule.type === 'keyframes') {
        const keyframeName = rule.name
        const vendor = rule.vendor
        let ruleSet: any[] = []
        let keyframe: any = ''
        if (vendor) {
          keyframe = '@' + vendor + rule.type + ' ' + keyframeName
        } else {
          keyframe = '@' + rule.type + ' ' + keyframeName
        }
        const keyframeValue: any = []
        rule.keyframes.forEach((element: { values: any; declarations: any }) => {
          element.declarations.forEach((element: { property: any; value: any }) => {
            if (element.value.includes('!important')) {
              ruleSet[element.property] = element.value
            } else if (!element.value.includes('!important')) {
              if (Object.keys(ruleSet).includes(element.property)) {
                if (!ruleSet[element.property].includes('!important')) {
                  ruleSet[element.property] = element.value
                }
              } else {
                ruleSet[element.property] = element.value
              }
            }
          })
          if (Object.keys(keyframeValue).includes(element.values[0])) {
            let temp = keyframeValue[element.values[0]]
            temp = Object.assign(temp, ruleSet)
            keyframeValue[element.values[0]] = temp
          } else {
            keyframeValue[element.values[0]] = ruleSet
          }
          ruleSet = []
        })
        animation[keyframe] = keyframeValue
      }
    })
    const SelectorsProps = stringify(animation)
    const noDuplication: any = []
    for (const tp in SelectorsProps) {
      const prepared = helper_function.construct(SelectorsProps[tp])
      noDuplication[tp] = this.nonMediaSelectors(prepared)
    }
    const finalResult: any = []
    for (const n in noDuplication) {
      finalResult[n] = noDuplication[n]
    }
    let toBeWritten = ''
    for (const m in noDuplication) {
      toBeWritten = toBeWritten + m + '{\n' + (noDuplication[m]) + '\n\n}'
    }
    return toBeWritten
  }
}
