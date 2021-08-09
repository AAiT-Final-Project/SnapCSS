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

  const propertyName = shorthand.propertyName
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
  const propertyName = shorthand.propertyName

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
  const propertyName = shorthand.propertyName

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
  const propertyName = shorthand.propertyName
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
  const propertyName = shorthand.propertyName

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
  const propertyName = shorthand.propertyName

  if (declarations[propertyName + '-start'] && declarations[propertyName + '-end']) {
    return declarations[propertyName + '-start'].value + ' / ' + declarations[propertyName + '-end'].value
  }
  return ''
}
