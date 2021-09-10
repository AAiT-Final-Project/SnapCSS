<<<<<<< HEAD
/* eslint-disable max-depth */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable unicorn/catch-error-name */

import Optimizer from '../optimizer'
// import CSS from '../../css/css'
import Loader from '../../load/loader'
const css = require('css')
import color = require('./color')
export default class Cleaner implements Optimizer {
  optimize(input: any): any {
    const nonMedia = this.nonMediaSelectors(input)
    const media = this.mediaSelectors(input)
    return [nonMedia, media]
  }

  nonMediaSelectors(x: any[]) {
    const SelectorsWzDeclaretions: any[] = []
    const data = css.stringify(x[0])
    try {
      for (let i = 0; i < data.length; i++) {
        let selector: any = ''
        let property: any = ''
        if (data.charAt(i) === '{') {
          let j = i - 1
          while (data.charAt(j) !== '}' && j >= 0) {
            selector += data.charAt(j)
            j--
          }
          selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim()
          let k = i
          while (data.charAt(k - 1) !== '}') {
            property += data.charAt(k)
            k++
=======
let loader_1 = require("../../load/loader");
import Optimizer from '../optimizer'
import CSS from '../../css/css'
const css = require('css');
const color = require('./color')
export default class Cleaner implements Optimizer {
  optimize(input: any): any {
    const nonMedia = this.NonMediaTags(input);
    const media = this.MediaTags(input);
    return [nonMedia, media]
  }
  //this function takes care of rules without @ character in their names. 
  //it takes an array from the loader class
  //the array it gets from loader is structured like [[NonMediaTags],[MediaTags]] 
  //at index 0 it has the Non @ rules and at index 1 it has rules wz @
  NonMediaTags(x: any[]) {
    let TagsProps: any[] = []; //fetch the Non@ rules
    const data = css.stringify(x[0]);
    //***********************************************************************************************
    try {
      for (let i = 0; i < data.length; i++) {
        let tag: any = '';
        let property: any = '';
        if (data.charAt(i) == '{') {
          let j = i - 1;
          while (data.charAt(j) != '}' && j >= 0) {
            tag = tag + data.charAt(j);
            j--;
          }
          tag = this.reverseString(tag).replace(/\n/g, '').replace(/\r/g, '').trim();

          let k = i;
          while (data.charAt(k - 1) != '}') {
            property = property + data.charAt(k);
            k++;
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f
          }
          property = property.replace('{', '').replace('}', '').trim()
          if (Object.keys(SelectorsWzDeclaretions).includes(selector.trim())) {
            const oldProp = SelectorsWzDeclaretions[selector]
            const newProp = oldProp + property
            SelectorsWzDeclaretions[selector] = newProp
          } else {
            SelectorsWzDeclaretions[selector] = property
          }
<<<<<<< HEAD
          selector = ''
          property = ''
=======
          else {
            TagsProps[tag] = property;
          }
          tag = '';
          property = '';
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f
        }
      }
    } catch (e) {
      console.log(e)
    }
<<<<<<< HEAD
    const NoDuplication: any = []
    for (const tp in SelectorsWzDeclaretions) {
      const eachProps = SelectorsWzDeclaretions[tp].split(';')
      for (const ep in eachProps) {
        eachProps[ep] = eachProps[ep].replace(/\r/g, '').replace(/\n/g, '').trim()
      }
      const removeDuplication: any = []
      for (const ep in eachProps) {
        if (eachProps[ep] !== '') {
          let rule = eachProps[ep].split(':')
=======
    //************************************************************************************************

    let NoDuplication: any = []; // the array of rules it is going to be returned at last
    for (let tp in TagsProps) {
      let eachProps = TagsProps[tp].split(';'); //split the string so we can take a look at each rules
      for (let ep in eachProps) {
        eachProps[ep] = eachProps[ep].replace(/\r/g, '').replace(/\n/g, '').trim();
      }
      let removeDuplication: any = []; //if a property name mentioned the more than once in the same tag this dictionary will take the last rule mentioned.
      for (let ep in eachProps) {
        if (eachProps[ep] != '') {
          let rule = eachProps[ep].split(':'); //split the property name and the value
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f
          try {
            if (color.rules.includes(rule[0].trim())) {
              const hex = color.converter(rule)
              if (hex !== undefined) {
                rule = [rule[0], hex[rule[0]]]
              }
            }
          } catch {
            continue
          }
          if (Object.keys(removeDuplication).includes(rule[0])) {
            if (!removeDuplication[rule[0]].includes('!important')) {
              removeDuplication[rule[0]] = rule[1]
            } else if (rule[1].includes('!important')) {
              removeDuplication[rule[0]] = rule[1]
            }
          } else {
            removeDuplication[rule[0]] = rule[1]
          }
        }
      }
      NoDuplication[tp] = removeDuplication
    }
<<<<<<< HEAD
    let toBEWritten = ''
    for (const n in NoDuplication) {
      let tempProp = ''
      for (const ree in NoDuplication[n]) {
        tempProp = tempProp + '   ' + ree + ' : ' + NoDuplication[n][ree] + ';\n'
=======
    let toBEWritten = '';
    for (let n in NoDuplication) {
      let tempProp = "";
      for (let ree in NoDuplication[n]) {
        tempProp = tempProp + "   " + ree + " : " + NoDuplication[n][ree] + ";\n";
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f
      }
      toBEWritten = toBEWritten + n + ' {\n' + tempProp + '}\n\n'
    }
    // return NoDuplication;
<<<<<<< HEAD
    return (css.parse(toBEWritten))
  }

  mediaSelectors(x: any) {
    const SelectorsWzDeclaretions: any = []
    const data = css.stringify(x[1])

    //***********************************************************************************************
    try {
      for (let i = 0; i < data.length; i++) {
        let selector = ''
        let property = ''
        if (data.charAt(i) === '{') {
          let j = i - 1
          while (data.charAt(j) !== '}' && j >= 0) {
            selector += data.charAt(j)
            j--
=======
    return (css.parse(toBEWritten));
  };
  MediaTags(x: any) {
    let TagsProps: any = [];
    const data = css.stringify(x[1])
    //***********************************************************************************************
    try {
      for (let i = 0; i < data.length; i++) {
        let tag = '';
        let property = '';
        if (data.charAt(i) == '{') {
          let j = i - 1;
          while (data.charAt(j) != '}' && j >= 0) {
            tag = tag + data.charAt(j);
            j--;
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f
          }
          let openselector = 0
          let closeselector = 0
          let k = i
          while (k < data.length) {
            property += data[k]
            if (data[k] === '{') {
              openselector++
            } else if (data[k] === '}') {
              closeselector++
            }
            if (openselector === closeselector) {
              selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim()
              if (Object.keys(SelectorsWzDeclaretions).includes(selector.trim())) {
                const oldProp = SelectorsWzDeclaretions[selector]
                const newProp = oldProp + property.substring(1, property.length - 2)
                SelectorsWzDeclaretions[selector] = newProp
              } else {
                SelectorsWzDeclaretions[selector] = property.substring(1, property.length - 2)
              }
              openselector = 0
              closeselector = 0
              selector = ''
              property = ''
              i = k + 1
              break
            }
            k++
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
    //************************************************************************************************************
<<<<<<< HEAD
    const NoDuplication: any = []
    for (const tp in SelectorsWzDeclaretions) {
      const prepared = new Loader('').construct(SelectorsWzDeclaretions[tp])
      NoDuplication[tp] = this.nonMediaSelectors(prepared)
=======
    let NoDuplication: any = [];
    for (let tp in TagsProps) {
      let prepared = new loader_1["default"]('').construct(TagsProps[tp]);
      NoDuplication[tp] = this.NonMediaTags(prepared);
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f
    }
    let toBEWritten = ''
    for (const m in NoDuplication) {
      toBEWritten = toBEWritten + m + '{\n' + css.stringify(NoDuplication[m]) + '\n\n}'
    }
    // return NoDuplication;
<<<<<<< HEAD
    return (css.parse(toBEWritten))
  }

  reverseString(str: any) {
    let newString = ''
=======
    return (css.parse(toBEWritten));
  }
  reverseString(str: any) {
    let newString = "";
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f
    for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i]
    }
<<<<<<< HEAD
    return newString
  }
}
=======
    return newString;
  };
};
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f

