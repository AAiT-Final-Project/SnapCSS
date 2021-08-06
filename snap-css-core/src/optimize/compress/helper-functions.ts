/* eslint-disable max-statements-per-line */
import {Shorthand} from './interfaces'

// Padding, Margin
export const compressInTopRightBottomLeftOrder = (shorthand: Shorthand, declarations: any): string => {
  const propertyName = shorthand.propertyName

  if (declarations[propertyName + '-top'] && declarations[propertyName + '-right'] && declarations[propertyName + '-bottom'] && declarations[propertyName + '-left']) {
    if (declarations[propertyName + '-top'].value === declarations[propertyName + '-right'].value && declarations[propertyName + '-right'].value === declarations[propertyName + '-bottom'].value && declarations[propertyName + '-bottom'].value === declarations[propertyName + '-left'].value) {
      return declarations[propertyName + '-top'].value
    } if (declarations[propertyName + '-top'].value === declarations[propertyName + '-bottom'].value && declarations[propertyName + '-left'].value === declarations[propertyName + '-right'].value) {
      return declarations[propertyName + '-top'].value + ' ' + declarations[propertyName + '-left'].value
    } if (declarations[propertyName + '-left'].value === declarations[propertyName + '-right'].value) {
      return declarations[propertyName + '-top'].value + ' ' + declarations[propertyName + '-left'].value + ' ' + declarations[propertyName + '-bottom'].value
    }
    return declarations[propertyName + '-top'].value + ' ' + declarations[propertyName + '-right'].value + ' ' + declarations[propertyName + '-bottom'].value + ' ' + declarations[propertyName + '-left'].value
  }
  return ''
}

// border, border-top, border-right, border-bottom, border-left, outline, column-rule
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

// border-color, border-style, border-width
export const compressInTopRightBottomLeftOrderForSingleMiddleValue = (shorthand: Shorthand, declarations: any): string => {
  const propertyName = shorthand.propertyName
  const prefix = propertyName.split('-')[0]
  const postfix = propertyName.split('-')[1]

  if (declarations[prefix + '-top-' + postfix] && declarations[prefix + '-right-' + postfix] && declarations[prefix + '-bottom-' + postfix] && declarations[prefix + '-left-' + postfix]) {
    if (declarations[prefix + '-top-' + postfix].value === declarations[prefix + '-right-' + postfix].value && declarations[prefix + '-right-' + postfix].value === declarations[prefix + '-bottom-' + postfix].value && declarations[prefix + '-bottom-' + postfix].value === declarations[prefix + '-left-' + postfix].value) {
      return declarations[prefix + '-top-' + postfix].value
    } if (declarations[prefix + '-top-' + postfix].value === declarations[prefix + '-bottom-' + postfix].value && declarations[prefix + '-left-' + postfix].value === declarations[prefix + '-right-' + postfix].value) {
      return declarations[prefix + '-top-' + postfix].value + ' ' + declarations[prefix + '-left-' + postfix].value
    } if (declarations[prefix + '-left-' + postfix].value === declarations[prefix + '-right-' + postfix].value) {
      return declarations[prefix + '-top-' + postfix].value + ' ' + declarations[prefix + '-left-' + postfix].value + ' ' + declarations[prefix + '-bottom-' + postfix].value
    }
    return declarations[prefix + '-top-' + postfix].value + ' ' + declarations[prefix + '-right-' + postfix].value + ' ' + declarations[prefix + '-bottom-' + postfix].value + ' ' + declarations[prefix + '-left-' + postfix].value
  }
  return ''
}

// border-radius
export const shorthandBorderRadius = (shorthand: Shorthand, declarations: any): string => {
  const propertyName = shorthand.propertyName
  const prefix = propertyName.split('-')[0]
  const postfix = propertyName.split('-')[1]

  let cornerRadius = ''
  const shorthandedValue: string[] = []

  for (let i = 0; i < 2; i++) {
    if (declarations[prefix + '-top-left-' + postfix] && declarations[prefix + '-top-right-' + postfix] && declarations[prefix + '-bottom-right-' + postfix] && declarations[prefix + '-bottom-left-' + postfix]) {
      if (declarations[prefix + '-top-left-' + postfix].value.split(' ')[i] === declarations[prefix + '-top-right-' + postfix].value.split(' ')[i] && declarations[prefix + '-top-right-' + postfix].value.split(' ')[i] === declarations[prefix + '-bottom-right-' + postfix].value.split(' ')[i] && declarations[prefix + '-bottom-right-' + postfix].value.split(' ')[i] === declarations[prefix + '-bottom-left-' + postfix].value.split(' ')[i]) {
        cornerRadius = declarations[prefix + '-top-left-' + postfix].value.split(' ')[i]
      } else if (declarations[prefix + '-top-left-' + postfix].value.split(' ')[i] === declarations[prefix + '-bottom-right-' + postfix].value.split(' ')[i] && declarations[prefix + '-bottom-left-' + postfix].value.split(' ')[i] === declarations[prefix + '-top-right-' + postfix].value.split(' ')[i]) {
        cornerRadius = declarations[prefix + '-top-left-' + postfix].value.split(' ')[i] + ' ' + declarations[prefix + '-bottom-left-' + postfix].value.split(' ')[i]
      } else if (declarations[prefix + '-bottom-left-' + postfix].value.split(' ')[i] === declarations[prefix + '-top-right-' + postfix].value.split(' ')[i]) {
        cornerRadius = declarations[prefix + '-top-left-' + postfix].value.split(' ')[i] + ' ' + declarations[prefix + '-bottom-left-' + postfix].value.split(' ')[i] + ' ' + declarations[prefix + '-bottom-right-' + postfix].value.split(' ')[i]
      } else {
        cornerRadius = declarations[prefix + '-top-left-' + postfix].value.split(' ')[i] + ' ' + declarations[prefix + '-top-right-' + postfix].value.split(' ')[i] + ' ' + declarations[prefix + '-bottom-right-' + postfix].value.split(' ')[i] + ' ' + declarations[prefix + '-bottom-left-' + postfix].value.split(' ')[i]
      }
    } else {
      cornerRadius = ''
    }

    shorthandedValue.push(cornerRadius)
  }

  if (shorthandedValue[0] && shorthandedValue[1]) {
    return shorthandedValue[0] + ' / ' + shorthandedValue[1]
  } if (shorthandedValue[0]) {
    return shorthandedValue[0]
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

// flex-flow
export const shorthandFlexFlow = (shorthand: Shorthand, declarations: any) => {
  const propertyName = shorthand.propertyName
  const prefixName = propertyName.split('-')[0]

  if (declarations[prefixName + '-direction'] && declarations[prefixName + '-wrap']) {
    return declarations[prefixName + '-direction'].value + ' ' + declarations[prefixName + '-wrap'].value
  } if (declarations[prefixName + '-direction']) {
    return declarations[prefixName + '-direction'].value
  } if (declarations[prefixName + '-wrap']) {
    return declarations[prefixName + '-wrap'].value
  }
  return ''
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
