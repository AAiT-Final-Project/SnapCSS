/* eslint-disable no-else-return */
import Optimizer from '../optimizer'
import CSS from '../../css/css'
const css = require('css')

import {
  Declarations,
  Rule,
} from './interfaces'
import * as shorthands from './shorthands'

export default class Compressor implements Optimizer {
  optimize(input: CSS): CSS {
    return input
  }

  shorthands = shorthands.shorthands

  findLonghand(cssString: string) {
    const cssObject = css.parse(cssString)

    cssObject.stylesheet.rules.forEach((rule: Rule) => {
      if (rule.type === 'rule') {
        const declarations: Declarations[] = []

        rule.declarations.forEach((declaration: any) => {
          declarations[declaration.property] = declaration
        })

        this.shorthands.forEach(shorthand => {
          const shorthandValue = shorthand.computedValue(shorthand, declarations)

          if (shorthandValue !== '') {
            const newDeclarations = []

            newDeclarations.push({
              type: 'declaration',
              property: shorthand.shorthandName,
              value: shorthandValue,
            })

            rule.declarations.forEach(declaration => {
              if (shorthand.shorthandProperties.indexOf(declaration.property) <= -1) {
                newDeclarations.push(declaration)
              }
            })

            rule.declarations = newDeclarations
          }
        })
      }
    })

    return css.stringify(cssObject)
  }
}
