import {
  shorthandFlex,
  shorthandFlow,
  shorthandGap,
  shorthandGridRowAndColumn,
  convertToShorthand,
  shorthandAlignments,
  shorthandFont,
  replaceLonghand,
  shorthandBorderImage,
} from './helper-functions'

export const shorthands = [
  {
    shorthandName: 'margin',
    shorthandProperties: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
    computedValue: convertToShorthand,
  }, {
    shorthandName: 'padding',
    shorthandProperties: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
    computedValue: convertToShorthand,
  }, {
    shorthandName: 'border',
    shorthandProperties: ['border-width', 'border-style', 'border-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-top',
    shorthandProperties: ['border-top-width', 'border-top-style', 'border-top-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-right',
    shorthandProperties: ['border-right-width', 'border-right-style', 'border-right-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-bottom',
    shorthandProperties: ['border-bottom-width', 'border-bottom-style', 'border-bottom-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-inline-start',
    shorthandProperties: ['border-inline-start-width', 'border-inline-start-style', 'border-inline-start-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-inline-end',
    shorthandProperties: ['border-inline-end-width', 'border-inline-end-style', 'border-inline-end-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-block-start',
    shorthandProperties: ['border-block-start-width', 'border-block-start-style', 'border-block-start-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-block-end',
    shorthandProperties: ['border-block-end-width', 'border-block-end-style', 'border-block-end-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-left',
    shorthandProperties: ['border-left-width', 'border-left-style', 'border-left-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-color',
    shorthandProperties: ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
    computedValue: convertToShorthand,
  }, {
    shorthandName: 'border-style',
    shorthandProperties: ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'],
    computedValue: convertToShorthand,
  }, {
    shorthandName: 'border-width',
    shorthandProperties: ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
    computedValue: convertToShorthand,
  }, {
    shorthandName: 'border-radius',
    shorthandProperties: ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
    computedValue: convertToShorthand,
  }, {
    shorthandName: 'scroll-margin',
    shorthandProperties: ['scroll-margin-top', 'scroll-margin-right', 'scroll-margin-bottom', 'scroll-margin-left'],
    computedValue: convertToShorthand,
  }, {
    shorthandName: 'scroll-padding',
    shorthandProperties: ['scroll-padding-top', 'scroll-padding-right', 'scroll-padding-bottom', 'scroll-padding-left'],
    computedValue: convertToShorthand,
  }, {
    shorthandName: 'outline',
    shorthandProperties: ['outline-width', 'outline-style', 'outline-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'column-rule',
    shorthandProperties: ['column-rule-width', 'column-rule-style', 'column-rule-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'flex',
    shorthandProperties: ['flex-grow', 'flex-shrink', 'flex-basis'],
    computedValue: shorthandFlex,
  }, {
    shorthandName: 'flex-flow',
    shorthandProperties: ['flex-direction', 'flex-wrap'],
    computedValue: shorthandFlow,
  }, {
    shorthandName: 'overflow',
    shorthandProperties: ['overflow-x', 'overflow-y'],
    computedValue: shorthandFlow,
  }, {
    shorthandName: 'columns',
    shorthandProperties: ['column-width', 'column-count'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'gap',
    shorthandProperties: ['row-gap', 'column-gap'],
    computedValue: shorthandGap,
  }, {
    shorthandName: 'grid-column',
    shorthandProperties: ['grid-column-start', 'grid-column-end'],
    computedValue: shorthandGridRowAndColumn,
  }, {
    shorthandName: 'grid-row',
    shorthandProperties: ['grid-row-start', 'grid-row-end'],
    computedValue: shorthandGridRowAndColumn,
  }, {
    shorthandName: 'place-content',
    shorthandProperties: ['align-content', 'justify-content'],
    shorthandSyntax: 'align-content justify-content',
    computedValue: shorthandAlignments,
  }, {
    shorthandName: 'place-items',
    shorthandProperties: ['align-items', 'justify-items'],
    computedValue: shorthandAlignments,
  }, {
    shorthandName: 'place-self',
    shorthandProperties: ['align-self', 'justify-self'],
    computedValue: shorthandAlignments,
  }, {
    shorthandName: 'font',
    shorthandProperties: ['font-stretch', 'font-style', 'font-variant', 'font-weight', 'font-size', 'line-height', 'font-family'],
    computedValue: shorthandFont,
  }, {
    shorthandName: 'list-style',
    shorthandProperties: ['list-style-type', 'list-style-position', 'list-style-image'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'offset',
    shorthandProperties: ['offset-position', 'offset-path', 'offset-distance', 'offset-rotate', 'offset-anchor'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'text-emphasis',
    shorthandProperties: ['text-emphasis-style', 'text-emphasis-color'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'text-decoration',
    shorthandProperties: ['text-decoration-line', 'text-decoration-style', 'text-decoration-color', 'text-decoration-thickness'],
    computedValue: replaceLonghand,
  }, {
    shorthandName: 'border-image',
    shorthandProperties: ['border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset', 'border-image-repeat'],
    computedValue: shorthandBorderImage,
  }, {
    shorthandName: 'grid-area',
    shorthandProperties: ['grid-row-start', 'grid-column-start', 'grid-row-end', 'grid-column-end'],
    computedValue: shorthandBorderImage,
  },
]
