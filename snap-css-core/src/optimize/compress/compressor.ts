/* eslint-disable no-else-return */
import Optimizer from '../optimizer'
import CSS from '../../css/css'
import {shorthands} from './shorthands'
import {CSSObject} from './interfaces'

export default class Compressor implements Optimizer {
  optimize(input: CSS): CSS {
    return input
  }

  shorthands = shorthands

  findLonghand(cssObject: CSSObject): CSSObject {
    cssObject.ruleSets.forEach(ruleSet => {
      ruleSet.rules.forEach(rule => {
        const normalDeclarations: any = []
        const importantDeclarations: any = []

        rule.declarations.forEach(declaration => {
          if (declaration.important) {
            importantDeclarations[declaration.property] = declaration
          } else {
            normalDeclarations[declaration.property] = declaration
          }
        })

        this.shorthands.forEach(shorthand => {
          const [shorthandValue, shorthandUnit, shorthandType, shorthandImportant] = shorthand.computedValue(shorthand, normalDeclarations)
          const [iShorthandValue, iShorthandUnit, iShorthandType, iShorthandImportant] = shorthand.computedValue(shorthand, importantDeclarations)

          if (shorthandValue || iShorthandValue) {
            const newDeclarations = []
            if (shorthandValue && iShorthandValue) {
              newDeclarations.push({
                property: shorthand.shorthandName,
                value: shorthandValue,
                unit: shorthandUnit,
                type: shorthandType,
                important: Boolean(shorthandImportant),
              })

              newDeclarations.push({
                property: shorthand.shorthandName,
                value: iShorthandValue,
                unit: iShorthandUnit,
                type: iShorthandType,
                important: Boolean(iShorthandImportant),
              })
            } else if (shorthandValue) {
              newDeclarations.push({
                property: shorthand.shorthandName,
                value: shorthandValue,
                unit: shorthandUnit,
                type: shorthandType,
                important: Boolean(shorthandImportant),
              })
            } else {
              newDeclarations.push({
                property: shorthand.shorthandName,
                value: iShorthandValue,
                unit: iShorthandUnit,
                type: iShorthandType,
                important: Boolean(iShorthandImportant),
              })
            }
            rule.declarations.forEach(declaration => {
              if (shorthand.shorthandProperties.indexOf(declaration.property) <= -1) {
                newDeclarations.push(declaration)
              }
            })
            rule.declarations = newDeclarations
          }
        })
      })
    })

    return cssObject
  }
}
