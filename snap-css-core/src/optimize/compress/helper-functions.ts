/* eslint-disable max-statements-per-line */
import {Shorthand} from './interfaces'

// padding, margin, border-color, border-style, border-width, border-radius
export const convertToShorthand = (shorthand: Shorthand, declarations: any) => {
  const oneValueProperty = ['padding', 'margin', 'scroll-margin', 'scroll-padding']
  const twoValueProperty = ['border-color', 'border-width', 'border-style']
  const threeValueProperty = ['border-radius']
  const oneValueSet = new Set(oneValueProperty)
  const twoValueSet = new Set(twoValueProperty)
  const threeValueSet = new Set(threeValueProperty)

  const propertyName = shorthand.shorthandName
  const propertyList = propertyName.split('-')

  let prefix = propertyList[0]
  let affix = ['-top', '-right', '-bottom', '-left']
  let postfix = ''
  let times = 1

  if (oneValueSet.has(propertyName)) {
    prefix = propertyName
    postfix = ''
  } else if (twoValueSet.has(propertyName)) {
    postfix = '-' + propertyList[1]
  } else if (threeValueSet.has(propertyName)) {
    postfix = '-' + propertyList[1]
    affix = ['-top-left', '-top-right', '-bottom-right', '-bottom-left']
    times = 2
  }

  let result = ''
  const shorthandedValue: string[] = []

  for (let i = 0; i < times; i++) {
    if (declarations[prefix + affix[0] + postfix] && declarations[prefix + affix[1] + postfix] && declarations[prefix + affix[2] + postfix] && declarations[prefix + affix[3] + postfix]) {
      if (declarations[prefix + affix[0] + postfix].value.split(' ')[i] === declarations[prefix + affix[1] + postfix].value.split(' ')[i] && declarations[prefix + affix[1] + postfix].value.split(' ')[i] === declarations[prefix + affix[2] + postfix].value.split(' ')[i] && declarations[prefix + affix[2] + postfix].value.split(' ')[i] === declarations[prefix + affix[3] + postfix].value.split(' ')[i]) {
        result = declarations[prefix + affix[0] + postfix].value.split(' ')[i]
      } else if (declarations[prefix + affix[0] + postfix].value.split(' ')[i] === declarations[prefix + affix[2] + postfix].value.split(' ')[i] && declarations[prefix + affix[3] + postfix].value.split(' ')[i] === declarations[prefix + affix[1] + postfix].value.split(' ')[i]) {
        result = declarations[prefix + affix[0] + postfix].value.split(' ')[i] + ' ' + declarations[prefix + affix[3] + postfix].value.split(' ')[i]
      } else if (declarations[prefix + affix[3] + postfix].value.split(' ')[i] === declarations[prefix + affix[1] + postfix].value.split(' ')[i]) {
        result = declarations[prefix + affix[0] + postfix].value.split(' ')[i] + ' ' + declarations[prefix + affix[3] + postfix].value.split(' ')[i] + ' ' + declarations[prefix + affix[2] + postfix].value.split(' ')[i]
      } else {
        result = declarations[prefix + affix[0] + postfix].value.split(' ')[i] + ' ' + declarations[prefix + affix[1] + postfix].value.split(' ')[i] + ' ' + declarations[prefix + affix[2] + postfix].value.split(' ')[i] + ' ' + declarations[prefix + affix[3] + postfix].value.split(' ')[i]
      }
    } else {
      result = ''
    }

    shorthandedValue.push(result)
  }

  if (shorthandedValue[0] && shorthandedValue[1]) {
    return shorthandedValue[0] + ' / ' + shorthandedValue[1]
  } if (shorthandedValue[0]) {
    return shorthandedValue[0]
  }
  return ''
}

// flex-flow, overflow
export const shorthandFlow = (shorthand: Shorthand, declarations: any) => {
  const propertyName = shorthand.shorthandName
  const prefixName = propertyName.split('-')[0]
  const equalitySet = new Set(['overflow'])

  let postfix = ['-direction', '-wrap']
  if (propertyName === 'overflow') {
    postfix = ['-x', '-y']
  }

  let result = ''
  if (declarations[prefixName + postfix[0]] && declarations[prefixName + postfix[1]]) {
    result = declarations[prefixName + postfix[0]].value + ' ' + declarations[prefixName + postfix[1]].value
    if ((equalitySet.has(propertyName)) && (declarations[prefixName + postfix[0]].value === declarations[prefixName + postfix[1]].value)) {
      result = declarations[prefixName + postfix[0]].value
    }
  } else if (declarations[prefixName + postfix[0]]) {
    result = declarations[prefixName + postfix[0]].value
  } else if (declarations[prefixName + postfix[1]]) {
    result = declarations[prefixName + postfix[1]].value
  }
  return result
}

// grid-column, grid-row
export const shorthandGridRowAndColumn = (shorthand: Shorthand, declarations: any): string => {
  const propertyName = shorthand.shorthandName

  if (declarations[propertyName + '-start'] && declarations[propertyName + '-end']) {
    return declarations[propertyName + '-start'].value + ' / ' + declarations[propertyName + '-end'].value
  }
  return ''
}

// Convert arrays of string into a single string
const convertToString = (arr: string[]): string => {
  let syntax = ''
  arr.forEach(element => {
    syntax = syntax + ' ' + element
  })

  return syntax
}

// Get shorthand values
const getShorthandValue = (shorthand: Shorthand, declarations: any): string => {
  const shorthandName = shorthand.shorthandName
  let shorthandValue = ''
  if (shorthandName === 'font') {
    shorthandValue = 'font-stretch font-style font-variant font-weight font-size/line-height font-family'
  } else {
    shorthandValue = convertToString(shorthand.shorthandProperties)
  }

  shorthand.shorthandProperties.forEach(property => {
    if (declarations[property]) {
      shorthandValue = shorthandValue.replace(property, declarations[property].value)
    } else {
      shorthandValue = shorthandValue.replace(property, '')
    }
  })

  shorthandValue = shorthandValue.replace('  ', ' ').trim()
  return shorthandValue
}

// font
export const shorthandFont = (shorthand: Shorthand, declarations: any): string => {
  let shorthandValue = getShorthandValue(shorthand, declarations)

  if (!declarations['font-size'] || !declarations['font-family']) {
    return ''
  }

  if (!declarations['line-height']) {
    shorthandValue = shorthandValue.replace('/', '')
  }

  return shorthandValue.replace('  ', ' ').trim()
}

// list-style, offset, text-emphasis, text-decoration, outline, column-rule, columns
// border, border-top, border-right, border-bottom, border-left
// border-inline-start, border-inline-end, border-block-start, border-block-end
export const replaceLonghand = (shorthand: Shorthand, declarations: any): string => {
  const shorthandValue = getShorthandValue(shorthand, declarations)
  return shorthandValue.replace('  ', ' ').trim()
}

// border-image
export const shorthandBorderImage = (shorthand: Shorthand, declarations: any): string => {
  const shorthandValue = getShorthandValue(shorthand, declarations)

  if (!declarations['border-image-source']) {
    return ''
  }

  return shorthandValue.replace('  ', ' ').trim()
}

// flex
export const shorthandFlex = (shorthand: Shorthand, declarations: any): string => {
  const shorthandValue = getShorthandValue(shorthand, declarations)

  if (!declarations['flex-grow'] && !declarations['flex-basis']) {
    return ''
  }

  return shorthandValue.replace('  ', ' ').trim()
}

// place-content, place-items, place-self, gap
export const transformToShorthand = (shorthand: Shorthand, declarations: any): string => {
  const shorthandProperties = shorthand.shorthandProperties
  let result = ''
  if (declarations[shorthandProperties[0]] && declarations[shorthandProperties[1]]) {
    if ((declarations[shorthandProperties[0]].value === declarations[shorthandProperties[1]].value)) {
      result = declarations[shorthandProperties[0]].value
    } else {
      result = declarations[shorthandProperties[0]].value + ' ' + declarations[shorthandProperties[1]].value
    }
  }
  return result
}
