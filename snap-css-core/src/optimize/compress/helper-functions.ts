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

// border, border-top, border-right, border-bottom, border-left, outline, column-rule, border-inline-start, border-inline-end, border-block-start, border-block-end
export const compressInWidthStyleColorOrder = (shorthand: Shorthand, declarations: any) => {
  const propertyName = shorthand.shorthandName

  if (declarations[propertyName + '-width'] && declarations[propertyName + '-style'] && declarations[propertyName + '-color']) {
    return declarations[propertyName + '-width'].value + ' ' + declarations[propertyName + '-style'].value + ' ' + declarations[propertyName + '-color'].value
  } if (declarations[propertyName + '-width'] && declarations[propertyName + '-style']) {
    return declarations[propertyName + '-width'].value + ' ' + declarations[propertyName + '-style'].value
  } if (declarations[propertyName + '-style'] && declarations[propertyName + '-color']) {
    return declarations[propertyName + '-style'].value + ' ' + declarations[propertyName + '-color'].value
  } if (declarations[propertyName + '-style']) {
    return declarations[propertyName + '-style'].value
  }
  return ''
}

// Flex
export const shorthandFlex = (shorthand: Shorthand, declarations: any) => {
  const propertyName = shorthand.shorthandName

  if (declarations[propertyName + '-grow'] && declarations[propertyName + '-shrink'] && declarations[propertyName + '-basis']) {
    return declarations[propertyName + '-grow'].value + ' ' + declarations[propertyName + '-shrink'].value + ' ' + declarations[propertyName + '-basis'].value
  } if (declarations[propertyName + '-grow'] && declarations[propertyName + '-shrink']) {
    return declarations[propertyName + '-grow'].value + ' ' + declarations[propertyName + '-shrink'].value
  } if (declarations[propertyName + '-grow'] && declarations[propertyName + '-basis']) {
    return declarations[propertyName + '-grow'].value + ' ' + declarations[propertyName + '-basis'].value
  } if (declarations[propertyName + '-grow']) {
    return declarations[propertyName + '-grow'].value
  } if (declarations[propertyName + '-basis']) {
    return declarations[propertyName + '-basis'].value
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

// Columns
export const shorthandColumns = (shorthand: Shorthand, declarations: any) => {
  if (declarations['column-width'] && declarations['column-count']) {
    return declarations['column-width'].value + ' ' + declarations['column-count'].value
  } if (declarations['column-width']) {
    return declarations['column-width'].value
  } if (declarations['column-count']) {
    return declarations['column-count'].value
  }
  return ''
}

// Gap
export const shorthandGap = (shorthand: Shorthand, declarations: any) => {
  const propertyName = shorthand.shorthandName

  if (declarations['row-' + propertyName] && declarations['column-' + propertyName]) {
    if (declarations['row-' + propertyName].value === declarations['column-' + propertyName].value) {
      return declarations['row-' + propertyName].value
    }
    return declarations['row-' + propertyName].value + ' ' + declarations['column-' + propertyName].value
  } if (declarations['row-' + propertyName]) {
    return declarations['row-' + propertyName].value
  }
  return ''
}

// grid-column, grid-row
export const shorthandGridRowAndColumn = (shorthand: Shorthand, declarations: any): string => {
  const propertyName = shorthand.shorthandName

  if (declarations[propertyName + '-start'] && declarations[propertyName + '-end']) {
    return declarations[propertyName + '-start'].value + ' / ' + declarations[propertyName + '-end'].value
  }
  return ''
}

// place-content, place-items, place-self
export const shorthandAlignments = (shorthand: Shorthand, declarations: any): string => {
  const propertyName = shorthand.shorthandName
  const equalitySet = new Set(['place-items', 'place-self'])

  const prefix = ['align', 'justify']
  let postfix = ['-content', '-content']
  if (propertyName === 'place-items') {
    postfix = ['-items', '-items']
  } else if (propertyName === 'place-self') {
    postfix = ['-self', '-self']
  }

  let result = ''
  if (declarations[prefix[0] + postfix[0]] && declarations[prefix[1] + postfix[1]]) {
    result = declarations[prefix[0] + postfix[0]].value + ' ' + declarations[prefix[1] + postfix[1]].value
    if ((equalitySet.has(propertyName)) && (declarations[prefix[0] + postfix[0]].value === declarations[prefix[1] + postfix[1]].value)) {
      result = declarations[prefix[0] + postfix[0]].value
    }
  }
  return result
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

// list-style, offset, text-emphasis, text-decoration
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
