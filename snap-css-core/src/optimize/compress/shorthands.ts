import {
  compressInWidthStyleColorOrder,
  shorthandFlex,
  shorthandFlow,
  shorthandColumns,
  shorthandGap,
  shorthandGridRowAndColumn,
  convertToShorthand,
  shorthandAlignments,
} from './helper-functions'

export const shorthands = [
  {
    propertyName: 'margin',
    properties: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
    computedValue: convertToShorthand,
  }, {
    propertyName: 'padding',
    properties: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
    computedValue: convertToShorthand,
  }, {
    propertyName: 'border',
    properties: ['border-width', 'border-style', 'border-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-top',
    properties: ['border-top-width', 'border-top-style', 'border-top-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-right',
    properties: ['border-right-width', 'border-right-style', 'border-right-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-bottom',
    properties: ['border-bottom-width', 'border-bottom-style', 'border-bottom-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-inline-start',
    properties: ['border-inline-start-width', 'border-inline-start-style', 'border-inline-start-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-inline-end',
    properties: ['border-inline-end-width', 'border-inline-end-style', 'border-inline-end-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-block-start',
    properties: ['border-block-start-width', 'border-block-start-style', 'border-block-start-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-block-end',
    properties: ['border-block-end-width', 'border-block-end-style', 'border-block-end-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-left',
    properties: ['border-left-width', 'border-left-style', 'border-left-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'border-color',
    properties: ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
    computedValue: convertToShorthand,
  }, {
    propertyName: 'border-style',
    properties: ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'],
    computedValue: convertToShorthand,
  }, {
    propertyName: 'border-width',
    properties: ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
    computedValue: convertToShorthand,
  }, {
    propertyName: 'border-radius',
    properties: ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
    computedValue: convertToShorthand,
  }, {
    propertyName: 'scroll-margin',
    properties: ['scroll-margin-top', 'scroll-margin-right', 'scroll-margin-bottom', 'scroll-margin-left'],
    computedValue: convertToShorthand,
  }, {
    propertyName: 'scroll-padding',
    properties: ['scroll-padding-top', 'scroll-padding-right', 'scroll-padding-bottom', 'scroll-padding-left'],
    computedValue: convertToShorthand,
  }, {
    propertyName: 'outline',
    properties: ['outline-width', 'outline-style', 'outline-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'column-rule',
    properties: ['column-rule-width', 'column-rule-style', 'column-rule-color'],
    computedValue: compressInWidthStyleColorOrder,
  }, {
    propertyName: 'flex',
    properties: ['flex-grow', 'flex-shrink', 'flex-basis'],
    computedValue: shorthandFlex,
  }, {
    propertyName: 'flex-flow',
    properties: ['flex-direction', 'flex-wrap'],
    computedValue: shorthandFlow,
  }, {
    propertyName: 'overflow',
    properties: ['overflow-x', 'overflow-y'],
    computedValue: shorthandFlow,
  }, {
    propertyName: 'columns',
    properties: ['column-width', 'column-count'],
    computedValue: shorthandColumns,
  }, {
    propertyName: 'gap',
    properties: ['row-gap', 'column-gap'],
    computedValue: shorthandGap,
  }, {
    propertyName: 'grid-column',
    properties: ['grid-column-start', 'grid-column-end'],
    computedValue: shorthandGridRowAndColumn,
  }, {
    propertyName: 'grid-row',
    properties: ['grid-row-start', 'grid-row-end'],
    computedValue: shorthandGridRowAndColumn,
  }, {
    propertyName: 'place-content',
    properties: ['align-content', 'justify-content'],
    computedValue: shorthandAlignments,
  }, {
    propertyName: 'place-items',
    properties: ['align-items', 'justify-items'],
    computedValue: shorthandAlignments,
  }, {
    propertyName: 'place-self',
    properties: ['align-self', 'justify-self'],
    computedValue: shorthandAlignments,
  },
]
