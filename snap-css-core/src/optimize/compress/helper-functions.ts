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

  const top = prefix + affix[0] + postfix
  const right = prefix + affix[1] + postfix
  const bottom = prefix + affix[2] + postfix
  const left = prefix + affix[3] + postfix

  let result = ''
  const shorthandValue: string[] = []
  const shorthandUnit = ''
  const shorthandType = 'STRING'
  let shorthandImportant = ''

  for (let i = 0; i < times; i++) {
    if (declarations[top] && declarations[right] && declarations[bottom] && declarations[left]) {
      shorthandImportant = declarations[top].important
      const topValue = declarations[top].value.split(' ')[i] + declarations[top].unit.split(' ')
      const rightValue = declarations[right].value.split(' ')[i] + declarations[right].unit.split(' ')
      const bottomValue = declarations[bottom].value.split(' ')[i] + declarations[bottom].unit.split(' ')
      const leftValue = declarations[left].value.split(' ')[i] + declarations[left].unit.split(' ')
      if (topValue === rightValue && rightValue === bottomValue && bottomValue === leftValue) {
        result = topValue
      } else if (topValue === bottomValue && leftValue === rightValue) {
        result = topValue + ' ' + leftValue
      } else if (leftValue === rightValue) {
        result = topValue + ' ' + leftValue + ' ' + bottomValue
      } else {
        result = topValue + ' ' + rightValue + ' ' + bottomValue + ' ' + leftValue
      }
    } else {
      result = ''
    }

    shorthandValue.push(result)
  }

  if (shorthandValue[0] && shorthandValue[1]) {
    if (shorthandValue[1][0] !== 'u') {
      return [shorthandValue[0] + ' / ' + shorthandValue[1], shorthandUnit, shorthandType, shorthandImportant]
    }
    return [shorthandValue[0], shorthandUnit, shorthandType, shorthandImportant]
  } if (shorthandValue[0]) {
    return [shorthandValue[0], shorthandUnit, shorthandType, shorthandImportant]
  }
  return ['', shorthandUnit, shorthandType, shorthandImportant]
}

// grid-column, grid-row
export const shorthandGridRowAndColumn = (shorthand: Shorthand, declarations: any): string[] => {
  const propertyName = shorthand.shorthandName
  let shorthandValue = ''
  const shorthandUnit = ''
  const shorthandType = 'STRING'
  let shorthandImportant = ''

  if (declarations[propertyName + '-start'] && declarations[propertyName + '-end']) {
    shorthandImportant = declarations[propertyName + '-start'].important
    shorthandValue = declarations[propertyName + '-start'].value + ' / ' + declarations[propertyName + '-end'].value
    return [shorthandValue, shorthandUnit, shorthandType, shorthandImportant]
  }
  return [shorthandValue, shorthandUnit, shorthandType, shorthandImportant]
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
const getShorthandValue = (shorthand: Shorthand, declarations: any): string[] => {
  const shorthandName = shorthand.shorthandName
  let shorthandValue = ''
  const shorthandUnit = ''
  const shorthandType = 'STRING'
  let shorthandImportant = ''
  if (shorthandName === 'font') {
    shorthandValue = 'font-stretch font-style font-variant font-weight font-size/line-height font-family'
  } else if (shorthandName === 'background') {
    shorthandValue = 'background-image background-position/background-size background-repeat background-attachment background-origin background-clip background-color'
  } else {
    shorthandValue = convertToString(shorthand.shorthandProperties)
  }

  shorthand.shorthandProperties.forEach(property => {
    if (declarations[property]) {
      shorthandValue = shorthandValue.replace(property, declarations[property].value + declarations[property].unit)
      shorthandImportant = declarations[property].important
    } else {
      shorthandValue = shorthandValue.replace(property, '')
    }
  })

  shorthandValue = shorthandValue.replace('  ', ' ').trim()

  return [shorthandValue, shorthandUnit, shorthandType, shorthandImportant]
}

// font
export const shorthandFont = (shorthand: Shorthand, declarations: any): string[] => {
  const [shorthandValue, shorthandUnit, shorthandType, shorthandImportant] = getShorthandValue(shorthand, declarations)

  if (!declarations['font-size'] || !declarations['font-family']) {
    return ['', shorthandUnit, shorthandType, shorthandImportant]
  }

  if (!declarations['line-height']) {
    return [shorthandValue.replace('/', ''), shorthandUnit, shorthandType, shorthandImportant]
  }

  return [shorthandValue, shorthandUnit, shorthandType, shorthandImportant]
}

// list-style, offset, text-emphasis, text-decoration, outline, column-rule, columns
// border, border-top, border-right, border-bottom, border-left, flex-flow
// border-inline-start, border-inline-end, border-block-start, border-block-end
export const replaceLonghand = (shorthand: Shorthand, declarations: any): string[] => {
  const result = getShorthandValue(shorthand, declarations)
  return result
}

// border-image
export const shorthandBorderImage = (shorthand: Shorthand, declarations: any): string[] => {
  const [shorthandValue, shorthandUnit, shorthandType, shorthandImportant] = getShorthandValue(shorthand, declarations)

  if (!declarations['border-image-source']) {
    return ['', shorthandUnit, shorthandType, shorthandImportant]
  }

  return [shorthandValue, shorthandUnit, shorthandType, shorthandImportant]
}

// flex
export const shorthandFlex = (shorthand: Shorthand, declarations: any): string[] => {
  const [shorthandValue, shorthandUnit, shorthandType, shorthandImportant] = getShorthandValue(shorthand, declarations)

  if (!declarations['flex-grow']) {
    return ['', shorthandUnit, shorthandType, shorthandImportant]
  }

  return [shorthandValue, shorthandUnit, shorthandType, shorthandImportant]
}

// place-content, place-items, place-self, gap
export const transformToShorthand = (shorthand: Shorthand, declarations: any): string[] => {
  const shorthandProperties = shorthand.shorthandProperties
  const shorthandUnit = ''
  const shorthandType = 'STRING'
  let shorthandImportant = ''
  let shorthandValue = ''
  if (declarations[shorthandProperties[0]] && declarations[shorthandProperties[1]]) {
    shorthandImportant = declarations[shorthandProperties[0]].important
    if ((declarations[shorthandProperties[0]].value === declarations[shorthandProperties[1]].value)) {
      shorthandValue = declarations[shorthandProperties[0]].value
    } else {
      shorthandValue = declarations[shorthandProperties[0]].value + ' ' + declarations[shorthandProperties[1]].value
    }
  }
  return [shorthandValue, shorthandUnit, shorthandType, shorthandImportant]
}

// overflow
export const shorthandOverflow = (shorthand: Shorthand, declarations: any): string[] => {
  const [shorthandValue, shorthandUnit, shorthandType, shorthandImportant] = transformToShorthand(shorthand, declarations)

  if (shorthandValue) {
    return [shorthandValue, shorthandUnit, shorthandType, shorthandImportant]
  }

  return getShorthandValue(shorthand, declarations)
}

// background
export const shorthandBackground = (shorthand: Shorthand, declarations: any): string[] => {
  if (!declarations['background-position'] && declarations['background-size']) {
    declarations['background-size'].value = '0 0/' + declarations['background-size'].value
  }

  const [shorthandValue, shorthandUnit, shorthandType, shorthandImportant] = getShorthandValue(shorthand, declarations)

  if (!declarations['background-position'] || !declarations['background-size']) {
    return [shorthandValue.replace('/', ''), shorthandUnit, shorthandType, shorthandImportant]
  }

  return [shorthandValue, shorthandUnit, shorthandType, shorthandImportant]
}
