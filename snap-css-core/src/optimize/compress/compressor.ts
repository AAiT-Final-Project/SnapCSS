/* eslint-disable no-else-return */
import Optimizer from '../optimizer'
import CSS from '../../css/css'
import {shorthands} from './shorthands'
import Declaration from '../../css/declaration'

export default class Compressor implements Optimizer {
  public optimize(input: CSS): CSS {
    return this.findLonghand(input)
  }

  shorthands = shorthands

  private findLonghand(input: CSS) {
    input.ruleSets.forEach(ruleSet => {
      ruleSet.rules.forEach(rule => {
        const normalDeclarations: Declaration[] = []
        const importantDeclarations: Declaration[] = []

        rule.declarations.forEach(declaration => {
          const prop: any = declaration.property
          if (declaration.important) {
            importantDeclarations[prop] = declaration
          } else {
            normalDeclarations[prop] = declaration
          }
        })

        this.shorthands.forEach(shorthand => {
          const [shorthandValue, shorthandUnit, shorthandType, shorthandImportant] = shorthand.computedValue(shorthand, normalDeclarations)
          const [iShorthandValue, iShorthandUnit, iShorthandType, iShorthandImportant] = shorthand.computedValue(shorthand, importantDeclarations)

          if (shorthandValue || iShorthandValue) {
            const newDeclarations: Declaration[] = []
            if (shorthandValue && iShorthandValue) {
              const newDeclaration = new Declaration(shorthand.shorthandName, shorthandValue, shorthandType, shorthandUnit, Boolean(shorthandImportant))
              const iNewDeclaration = new Declaration(shorthand.shorthandName, iShorthandValue, iShorthandType, iShorthandUnit, Boolean(iShorthandImportant))
              newDeclarations.push(newDeclaration)
              newDeclarations.push(iNewDeclaration)
            } else if (shorthandValue) {
              const decl = new Declaration(shorthand.shorthandName, shorthandValue, shorthandType, shorthandUnit, Boolean(shorthandImportant))
              newDeclarations.push(decl)
            } else {
              const iNewDeclaration = new Declaration(shorthand.shorthandName, iShorthandValue, iShorthandType, iShorthandUnit, Boolean(iShorthandImportant))
              newDeclarations.push(iNewDeclaration)
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

    return input
  }
}
