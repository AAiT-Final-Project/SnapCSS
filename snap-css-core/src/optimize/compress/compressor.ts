/* eslint-disable no-else-return */
import Optimizer from '../optimizer'
import CSS from '../../css/css'
const css = require('css')

interface Shorthand {
  propertyName: string;
  properties: string[];
}

interface Declaration {
  type: string;
  property: string;
  value: string;
}

interface Declarations {
  [key: string]: Declaration;
}

interface Rule {
  type: string;
  selectors: string[];
  declarations: Declaration[];
}
export default class Compressor implements Optimizer {
  optimize(input: CSS): CSS {
    return input
  }

  // Padding, Margin
  private compressInTopRightBottomLeftOrder(shorthand: Shorthand, declarations: any): string {
    const propertyName = shorthand.propertyName

    if (declarations[propertyName + '-top'] && declarations[propertyName + '-right'] && declarations[propertyName + '-bottom'] && declarations[propertyName + '-left']) {
      if (declarations[propertyName + '-top'].value === declarations[propertyName + '-right'].value && declarations[propertyName + '-right'].value === declarations[propertyName + '-bottom'].value && declarations[propertyName + '-bottom'].value === declarations[propertyName + '-left'].value) {
        return declarations[propertyName + '-top'].value
      } else if (declarations[propertyName + '-top'].value === declarations[propertyName + '-bottom'].value && declarations[propertyName + '-left'].value === declarations[propertyName + '-right'].value) {
        return declarations[propertyName + '-top'].value + ' ' + declarations[propertyName + '-left'].value
      } else if (declarations[propertyName + '-left'].value === declarations[propertyName + '-right'].value) {
        return declarations[propertyName + '-top'].value + ' ' + declarations[propertyName + '-left'].value + ' ' + declarations[propertyName + '-bottom'].value
      } else {
        return declarations[propertyName + '-top'].value + ' ' + declarations[propertyName + '-right'].value + ' ' + declarations[propertyName + '-bottom'].value + ' ' + declarations[propertyName + '-left'].value
      }
    } else {
      return ''
    }
  }

  // border, border-top, border-right, border-bottom, border-left, outline, column-rule
  private compressInWidthStyleColorOrder(shorthand: Shorthand, declarations: any) {
    const propertyName = shorthand.propertyName

    if (declarations[propertyName + '-width'] && declarations[propertyName + '-style'] && declarations[propertyName + '-color']) {
      return declarations[propertyName + '-width'].value + ' ' + declarations[propertyName + '-style'].value + ' ' + declarations[propertyName + '-color'].value
    } else if (declarations[propertyName + '-width'] && declarations[propertyName + '-style']) {
      return declarations[propertyName + '-width'].value + ' ' + declarations[propertyName + '-style'].value
    } else if (declarations[propertyName + '-style'] && declarations[propertyName + '-color']) {
      return declarations[propertyName + '-style'].value + ' ' + declarations[propertyName + '-color'].value
    } else if (declarations[propertyName + '-style']) {
      return declarations[propertyName + '-style'].value
    } else {
      return ''
    }
  }

  // Flex
  private shorthandFlex(shorthand: Shorthand, declarations: any) {
    const propertyName = shorthand.propertyName

    if (declarations[propertyName + '-grow'] && declarations[propertyName + '-shrink'] && declarations[propertyName + '-basis']) {
      return declarations[propertyName + '-grow'].value + ' ' + declarations[propertyName + '-shrink'].value + ' ' + declarations[propertyName + '-basis'].value
    } else if (declarations[propertyName + '-grow'] && declarations[propertyName + '-shrink']) {
      return declarations[propertyName + '-grow'].value + ' ' + declarations[propertyName + '-shrink'].value
    } else if (declarations[propertyName + '-grow'] && declarations[propertyName + '-basis']) {
      return declarations[propertyName + '-grow'].value + ' ' + declarations[propertyName + '-basis'].value
    } else if (declarations[propertyName + '-grow']) {
      return declarations[propertyName + '-grow'].value
    } else if (declarations[propertyName + '-basis']) {
      return declarations[propertyName + '-basis'].value
    } else {
      return ''
    }
  }

  shorthands = [
    {
      propertyName: 'margin',
      properties: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
      getShorthandValue: this.compressInTopRightBottomLeftOrder,
    }, {
      propertyName: 'padding',
      properties: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
      getShorthandValue: this.compressInTopRightBottomLeftOrder,
    }, {
      propertyName: 'border',
      properties: ['border-width', 'border-style', 'border-color'],
      getShorthandValue: this.compressInWidthStyleColorOrder,
    }, {
      propertyName: 'border-top',
      properties: ['border-top-width', 'border-top-style', 'border-top-color'],
      getShorthandValue: this.compressInWidthStyleColorOrder,
    }, {
      propertyName: 'border-right',
      properties: ['border-right-width', 'border-right-style', 'border-right-color'],
      getShorthandValue: this.compressInWidthStyleColorOrder,
    }, {
      propertyName: 'border-bottom',
      properties: ['border-bottom-width', 'border-bottom-style', 'border-bottom-color'],
      getShorthandValue: this.compressInWidthStyleColorOrder,
    }, {
      propertyName: 'border-left',
      properties: ['border-left-width', 'border-left-style', 'border-left-color'],
      getShorthandValue: this.compressInWidthStyleColorOrder,
    }, {
      propertyName: 'outline',
      properties: ['outline-width', 'outline-style', 'outline-color'],
      getShorthandValue: this.compressInWidthStyleColorOrder,
    }, {
      propertyName: 'column-rule',
      properties: ['column-rule-width', 'column-rule-style', 'column-rule-color'],
      getShorthandValue: this.compressInWidthStyleColorOrder,
    }, {
      propertyName: 'flex',
      properties: ['flex-grow', 'flex-shrink', 'flex-basis'],
      getShorthandValue: this.shorthandFlex,
    },
  ]

  findLonghand(cssString: string) {
    const cssObject = css.parse(cssString)

    cssObject.stylesheet.rules.forEach((rule: Rule) => {
      if (rule.type === 'rule') {
        const declarations: Declarations[] = []

        rule.declarations.forEach((declaration: any) => {
          declarations[declaration.property] = declaration
        })

        this.shorthands.forEach(shorthand => {
          const shorthandValue = shorthand.getShorthandValue(shorthand, declarations)

          if (shorthandValue !== '') {
            const newDeclarations = []

            newDeclarations.push({
              type: 'declaration',
              property: shorthand.propertyName,
              value: shorthandValue,
            })

            rule.declarations.forEach(declaration => {
              if (shorthand.properties.indexOf(declaration.property) <= -1) {
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
