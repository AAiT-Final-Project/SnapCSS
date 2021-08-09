import {
  compressInWidthStyleColorOrder,
  shorthandFlex,
  shorthandFlow,
  shorthandColumns,
  shorthandGap,
  shorthandGridRowAndColumn,
  convertToShorthand,
} from './helper-functions'

export const shorthands = [
  {
    propertyName: 'margin',
    properties: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
    getShorthandValue: convertToShorthand,
  }, {
    propertyName: 'padding',
    properties: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
    getShorthandValue: convertToShorthand,
  }, {
    propertyName: 'border',
    properties: ['border-width', 'border-style', 'border-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-top',
    properties: ['border-top-width', 'border-top-style', 'border-top-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-right',
    properties: ['border-right-width', 'border-right-style', 'border-right-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-bottom',
    properties: ['border-bottom-width', 'border-bottom-style', 'border-bottom-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-inline-start',
    properties: ['border-inline-start-width', 'border-inline-start-style', 'border-inline-start-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-inline-end',
    properties: ['border-inline-end-width', 'border-inline-end-style', 'border-inline-end-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-block-start',
    properties: ['border-block-start-width', 'border-block-start-style', 'border-block-start-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-block-end',
    properties: ['border-block-end-width', 'border-block-end-style', 'border-block-end-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-left',
    properties: ['border-left-width', 'border-left-style', 'border-left-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-color',
    properties: ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
    getShorthandValue: convertToShorthand,
  }, {
    propertyName: 'border-style',
    properties: ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'],
    getShorthandValue: convertToShorthand,
  }, {
    propertyName: 'border-width',
    properties: ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
    getShorthandValue: convertToShorthand,
  }, {
    propertyName: 'border-radius',
    properties: ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
    getShorthandValue: convertToShorthand,
  }, {
    propertyName: 'scroll-margin',
    properties: ['scroll-margin-top', 'scroll-margin-right', 'scroll-margin-bottom', 'scroll-margin-left'],
    getShorthandValue: convertToShorthand,
  }, {
    propertyName: 'scroll-padding',
    properties: ['scroll-padding-top', 'scroll-padding-right', 'scroll-padding-bottom', 'scroll-padding-left'],
    getShorthandValue: convertToShorthand,
  }, {
    propertyName: 'outline',
    properties: ['outline-width', 'outline-style', 'outline-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'column-rule',
    properties: ['column-rule-width', 'column-rule-style', 'column-rule-color'],
    getShorthandValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'flex',
    properties: ['flex-grow', 'flex-shrink', 'flex-basis'],
    getShorthandValue: shorthandFlex,
  }, {
    propertyName: 'flex-flow',
    properties: ['flex-direction', 'flex-wrap'],
    getShorthandValue: shorthandFlow,
  }, {
    propertyName: 'overflow',
    properties: ['overflow-x', 'overflow-y'],
    getShorthandValue: shorthandFlow,
  }, {
    propertyName: 'columns',
    properties: ['column-width', 'column-count'],
    getShorthandValue: shorthandColumns,
  }, {
    propertyName: 'gap',
    properties: ['row-gap', 'column-gap'],
    getShorthandValue: shorthandGap,
  }, {
    propertyName: 'grid-column',
    properties: ['grid-column-start', 'grid-column-end'],
    getShorthandValue: shorthandGridRowAndColumn,
  }, {
    propertyName: 'grid-row',
    properties: ['grid-row-start', 'grid-row-end'],
    getShorthandValue: shorthandGridRowAndColumn,
  },
]
