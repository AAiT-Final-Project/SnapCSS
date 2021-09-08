export default class Loader {
  validator = require('csstree-validator');
  fs = require('fs');
  cssbeautify = require('cssbeautify');
  strip = require('strip-comments')
  css = require('css');

  constructor(
    public inputPath: string
  ) { }
  scan() {
    var data: string = '';
    try {
      data = this.fs.readFileSync(this.inputPath, 'utf8');
      data = this.cssbeautify(data, {
        indent: '  ',
        openbrace: 'separate-line',
        autosemicolon: true
      });
    }
    catch (err) {
      console.error(err);
    }

    var validated = this.validate(data);
    if (validated == 1) {
      let cleared = this.clearComments(data);
      let constructed = this.construct(cleared);
      // console.log(constructed)
      return constructed;
    }
    else {
      return 'invalid'
    }
  }
  validate(data: string) {
    let result = this.validator.validate(data);
    if (result.length == 0) {
      return 1;
    }
    else {
      console.log('The css file is not valid');
      return 0;
    }
  }
  clearComments(data: any) {
    var x = this.strip(data); //=> var t;
    return x;
  }
  construct(data: string) {
    let nonMediaSelectorProp: any = [];
    let mediaSelectorProp: any = [];
    for (let i = 0; i < data.length; i++) {
      let selector = '';
      let property = '';
      if (data.charAt(i) == '{') {
        let j = i - 1;
        while (data.charAt(j) != '}' && j >= 0) {
          selector = selector + data.charAt(j);
          j--;
        }
        if (!this.reverseString(selector).includes('@')) {
          selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim();
          let k = i;
          while (data.charAt(k - 1) != '}') {
            property = property + data.charAt(k);
            k++;
          }
          property = property.replace('{', '').replace('}', '').trim();
          if (Object.keys(nonMediaSelectorProp).includes(selector.trim())) {
            let oldProp = nonMediaSelectorProp[selector];
            let newProp = oldProp + property;
            nonMediaSelectorProp[selector] = newProp;
          }
          else {
            nonMediaSelectorProp[selector] = property;
          }
          selector = '';
          property = '';
        }
        else {
          let openselector = 0;
          let closeselector = 0;
          let j = i;
          while (j < data.length) {
            property = property + data[j];
            if (data[j] == '{') {
              openselector++;
            }
            else if (data[j] == '}') {
              closeselector++;
            }
            if (openselector == closeselector) {
              selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim();
              if (Object.keys(mediaSelectorProp).includes(selector.trim())) {
                let oldProp = mediaSelectorProp[selector];
                let newProp = oldProp + property.substring(1, property.length - 2);
                mediaSelectorProp[selector] = newProp;
              }
              else {
                mediaSelectorProp[selector] = property.substring(1, property.length - 2);
              }
              openselector = 0;
              closeselector = 0;
              selector = '';
              property = '';
              i = j + 1;
              break;
            }
            j++;
          }
        }
      }
    }
    let result = [nonMediaSelectorProp, mediaSelectorProp];
    let mediaSelectorsStr = '';
    let nonMediaSelectorsStr = '';
    for (let r in result[0]) {
      nonMediaSelectorsStr = nonMediaSelectorsStr + r + '{\n' + result[0][r] + '\n}\n'
    }
    for (let r in result[1]) {
      mediaSelectorsStr = mediaSelectorsStr + r + '{\n' + result[1][r] + '\n}\n'
    }
    result = [this.css.parse(nonMediaSelectorsStr), this.css.parse(mediaSelectorsStr)]
    return result;
  }
  reverseString(str: string) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  }
}

