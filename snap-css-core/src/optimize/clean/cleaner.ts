import Optimizer from '../optimizer'
import CSS from '../../css/css'
import Loader from '../../load/loader';
const css = require('css');
const cssbeautify = require('cssbeautify');
const color = require('../clean/color')

export default class Cleaner implements Optimizer {
  optimize(input: CSS): CSS {
    return input
  }
  NonMediaTags(x: any) {
    let TagsProps: String[] = []; //fetch the Non@ rules
    const data = css.stringify(x[0]);
    // console.log(css.stringify(TagsProps))


    //***********************************************************************************************
    try {
      for (let i = 0; i < data.length; i++) {
        let tag: any = '';
        let property = '';
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
          }
          property = property.replace('{', '').replace('}', '').trim();
          if (Object.keys(TagsProps).includes(tag.trim())) {
            let oldProp = TagsProps[tag];
            let newProp = oldProp + property;
            TagsProps[tag] = newProp;
          }
          else {
            TagsProps[tag] = property;
          }
          tag = '';
          property = '';


        }
      }
    } catch (e) {
      console.log(e)
    }
    //************************************************************************************************

    let NoDuplication: any[] = []; // the array of rules it is going to be returned at last
    for (let tp in TagsProps) {
      let eachProps = TagsProps[tp].split(';'); //split the string so we can take a look at each rules
      for (let ep in eachProps) {
        eachProps[ep] = eachProps[ep].replace(/\r/g, '').replace(/\n/g, '').trim();
      }
      let removeDuplication: String[] = []; //if a property name mentioned the more than once in the same tag this dictionary will take the last rule mentioned.
      for (let ep in eachProps) {
        if (eachProps[ep] != '') {
          let rule: any[] = eachProps[ep].split(':'); //split the property name and the value
          try {
            if (color.rules.includes(rule[0].trim())) {
              let hex = color.converter(rule)
              if (hex != undefined) {
                rule = [rule[0], hex[rule[0]]];
                // console.log(rule[0], hex[rule[0]].join(' '))
              }

            }
          } catch {
            continue
          }

          if (Object.keys(removeDuplication).includes(rule[0])) {
            if (!removeDuplication[rule[0]].includes('!important')) {
              removeDuplication[rule[0]] = rule[1];
            }
            else if (rule[1].includes('!important')) {
              removeDuplication[rule[0]] = rule[1];

            }
          }
          else {
            removeDuplication[rule[0]] = rule[1];
          }
        }
      }
      NoDuplication[tp] = removeDuplication;
    }


    let toBEWritten = '';
    for (let n in NoDuplication) {
      let tempProp = "";
      for (let ree in NoDuplication[n]) {
        tempProp = tempProp + "   " + ree + " : " + NoDuplication[n][ree] + ";\n";
      }
      toBEWritten = toBEWritten + n + " {\n" + tempProp + "}\n\n";
    }
    // console.log(((css.parse(toBEWritten))))

    // return NoDuplication;
    return (css.parse(toBEWritten));
  };
  MediaTags(x: any) {
    let TagsProps: any[] = [];
    const data = css.stringify(x[1])

    // console.log(TagsProps)


    //***********************************************************************************************
    try {
      for (let i = 0; i < data.length; i++) {
        let tag: any = '';
        let property = '';
        if (data.charAt(i) == '{') {
          let j = i - 1;
          while (data.charAt(j) != '}' && j >= 0) {
            tag = tag + data.charAt(j);
            j--;
          }
          let opentag = 0;
          let closetag = 0;
          let k = i;
          while (k < data.length) {
            property = property + data[k];
            if (data[k] == '{') {
              opentag++;
            }
            else if (data[k] == '}') {
              closetag++;
            }
            if (opentag == closetag) {
              tag = this.reverseString(tag).replace(/\n/g, '').replace(/\r/g, '').trim();
              if (Object.keys(TagsProps).includes(tag.trim())) {
                let oldProp = TagsProps[tag];
                let newProp = oldProp + property.substring(1, property.length - 2);
                TagsProps[tag] = newProp;
              }
              else {
                TagsProps[tag] = property.substring(1, property.length - 2);
              }
              opentag = 0;
              closetag = 0;
              tag = '';
              property = '';
              i = k + 1;
              break;
            }
            k++;
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
    //************************************************************************************************************

    let NoDuplication: any[] = [];
    for (let tp in TagsProps) {
      let prepared = new Loader('').construct(TagsProps[tp]);
      NoDuplication[tp] = this.NonMediaTags(prepared);
    }
    let toBEWritten = '';
    for (let m in NoDuplication) {

      toBEWritten = toBEWritten + m + "{\n" + css.stringify(NoDuplication[m]) + "\n\n}";
    }
    toBEWritten = cssbeautify(toBEWritten, {
      indent: '  ',
      openbrace: 'separate-line',
      autosemicolon: true
    });

    // return NoDuplication;
    return (css.parse(toBEWritten));
  };
  reverseString(str: String) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  }
  /**************************************************** Helper Functions **********************************************/


}
