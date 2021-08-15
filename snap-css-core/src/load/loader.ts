export default class Loader {
  private postcss = require('postcss');

  private shorthandExpand = require('postcss-shorthand-expand');

  private validator = require('csstree-validator').validate

  private  fs = require('fs')

  constructor(
    public inputPath: string
  ) { }

  scan() {
    let data = ''
    try {
      data = this.fs.readFileSync(this.inputPath, 'utf8')
    } catch (err) {
      console.error(err)
    }
    const validated = this.validate(data)
    // console.log(validated);
    const cleared = this.clearComments(validated)
    // console.log(cleared);
    const constructed = this.construct(cleared)
    // console.log(constructed)
    return constructed
  }

  validate(data: string) {
    const result = this.validator(data)
    // console.log(result)
    if (result.valid != []) {
      // console.log(result.valid);
      return data
    }

    console.log('The css file is not valid')
    console.log(result.errors)
  }

  clearComments(data: any) {
    const start = data.indexOf('/*')
    // console.log(data.charAt(data.indexOf('/*')))
    if (start != -1) {
      const end = data.indexOf('*/')
      data = data.substring(0, start - 1) + data.substring(end + 2, data.length)
      this.clearComments(data)
      return data
    }

    // console.log(data);
    return data
  }

  construct(data: any) {
    data = this.postcss([this.shorthandExpand()]).process(data).css
    const nonMediaTagProp: any = []
    const mediaTagProp: any = []
    for (let i = 0; i < data.length; i++) {
      let tag = ''
      let property = ''
      if (data.charAt(i) == '{') {
        var j = i - 1
        while (data.charAt(j) != '}' && j >= 0) {
          tag += data.charAt(j)
          j--
        }
        if (!reverseString(tag).includes('@')) {
          tag = reverseString(tag).replace(/\n/g, '').replace(/\r/g, '').trim()
          if (tag.includes(',')) {
            const tags = tag.split(',')
            var k = i
            for (const t in tags) {
              while (data.charAt(k - 1) != '}') {
                property += data.charAt(k)
                k++
              }
              property = property.replace('{', '').replace('}', '').trim() + ';'
              if (Object.keys(nonMediaTagProp).includes(tags[t].trim())) {
                var oldProp = nonMediaTagProp[tags[t]]
                var newProp = oldProp + property
                nonMediaTagProp[tags[t]] = newProp
              } else {
                nonMediaTagProp[tags[t]] = property
              }
            }
            tag = ''
            property = ''
          } else {
            var k = i
            while (data.charAt(k - 1) != '}') {
              property += data.charAt(k)
              k++
            }
            property = property.replace('{', '').replace('}', '').trim() + ';'
            if (Object.keys(nonMediaTagProp).includes(tag.trim())) {
              var oldProp = nonMediaTagProp[tag]
              var newProp = oldProp + property
              nonMediaTagProp[tag] = newProp
            } else {
              nonMediaTagProp[tag] = property
            }
            tag = ''
            property = ''
          }
        } else {
          let opentag = 0
          let closetag = 0
          var j = i
          while (j < data.length) {
            property += data[j]
            if (data[j] == '{') {
              opentag++
            } else if (data[j] == '}') {
              closetag++
            }
            if (opentag == closetag) {
              tag = reverseString(tag).replace(/\n/g, '').replace(/\r/g, '').trim()
              if (Object.keys(mediaTagProp).includes(tag.trim())) {
                var oldProp = mediaTagProp[tag]
                var newProp = oldProp + property.substring(1, property.length - 2)
                mediaTagProp[tag] = newProp
              } else {
                mediaTagProp[tag] = property.substring(1, property.length - 2)
              }
              opentag = 0
              closetag = 0
              tag = ''
              property = ''
              i = j + 1
              break
            }
            j++
          }
        }
      }
    }
    const result = [nonMediaTagProp, mediaTagProp]
    return result
  }
}

//* *********************************************helper functions***********************************************

function reverseString(str: string) {
  let newString = ''
  for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i]
  }
  return newString
}
