import Optimizer from '../optimizer'
import CSS from '../../css/css'
import Loader from '../../load/loader';
var fs = require('fs');
const cssbeautify = require('cssbeautify');
const css = require('css')

export default class Restructurer implements Optimizer {
  optimize(input: CSS): CSS {
    return input
  }
  //this function takes care of rules without @ character in their names. 
  //it takes an array from the loader class
  //the array it gets from loader is structured like [[NonMediaTags],[MediaTags]] 
  //at index 0 it has the Non @ rules and at index 1 it has rules wz @
  NonMediaTags(x: any) {
    let TagsProps: any[] = []; //fetch the Non@ rules
    const data = css.stringify(x[0]);


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

    let NoDuplication: any = []; // the array of rules it is going to be returned at last
    for (let tp in TagsProps) {
      let eachProps = TagsProps[tp].split(';'); //split the string so we can take a look at each rules
      for (let ep in eachProps) {
        eachProps[ep] = eachProps[ep].replace(/\r/g, '').replace(/\n/g, '').trim();
      }
      let removeDuplication = []; //if a property name mentioned the more than once in the same tag this dictionary will take the last rule mentioned.
      for (let ep in eachProps) {
        if (eachProps[ep] != '') {
          let rule = eachProps[ep].split(':'); //split the property name and the value
          if ([rule[0]].includes('color')) { //change to hex for consistancy

            removeDuplication[rule[0]] = rule[1];

          }
          else {
            removeDuplication[rule[0]] = rule[1];
          }
        }
      }
      NoDuplication[tp] = removeDuplication;
    }

    let reuse = this.reusable(NoDuplication);
    let similars = reuse[0];
    let difference = reuse[1];
    let differentProps: any = [];
    for (let d in difference) {
      let current = d.split(',');
      let prop = difference[d];
      for (let c in current) {
        for (let p in prop) {
          if (!Object.keys(differentProps).includes(current[c])) {
            let x = [];
            x[prop[p]] = NoDuplication[current[c]][prop[p]];
            differentProps[current[c]] = x;
          }
          else {
            let x = [];
            x[prop[p]] = NoDuplication[current[c]][prop[p]];
            let old = differentProps[current[c]];
            let newer = Object.assign([], old, x);
            differentProps[current[c]] = newer;
          }
        }
      }
    }
    for (let d in differentProps) {
      let each = differentProps[d];
      for (let e in each) {
        if (each[e] == undefined) {
          delete each[e];
        }
      }
    }
    for (let d in differentProps) {
      let each = differentProps[d];
      if (Object.values(each).length == 0) {
        delete differentProps[d];
      }
    }
    for (let i in similars) {
      let spl = i.split(',');
      for (let j in spl) {
        delete NoDuplication[spl[j]];
      }
    }
    for (let i in similars) {
      NoDuplication[i] = similars[i];
    }
    for (let i in similars) {
      for (let j in similars) {
        if (i != j) {
          if (this.intersection_destructive(i.split(','), j.split(',')).length != 0) {
            if (i.split(',').length != j.split(',').length) {
              let smaller = Math.min(i.split(',').length, j.split(',').length);
              if (i.split(',').length == smaller) {
                try {
                  delete NoDuplication[i];
                }
                catch (_a) {
                  continue;
                }
              }
              else {
                try {
                  delete NoDuplication[j];
                }
                catch (_b) {
                  continue;
                }
              }
            }
          }
        }
      }
    }
    for (let i in differentProps) {
      NoDuplication[i] = differentProps[i];
    }
    let toBEWritten = '';
    for (let n in NoDuplication) {
      let tempProp = "";
      for (let ree in NoDuplication[n]) {
        tempProp = tempProp + "   " + ree + " : " + NoDuplication[n][ree] + ";\n";
      }
      toBEWritten = toBEWritten + n + " {\n" + tempProp + "}\n\n";
    }

    // return NoDuplication;
    return (css.parse(toBEWritten));
  }
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

    let NoDuplication: any = [];
    for (let tp in TagsProps) {
      var prepared = new Loader('').construct(TagsProps[tp]);

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
  }

  /**************************************************** Helper Functions **********************************************/
  colourNameToHex(colour: string) {
    var colours: any = {
      "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
      "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
      "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
      "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
      "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
      "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
      "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
      "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
      "honeydew": "#f0fff0", "hotpink": "#ff69b4",
      "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
      "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
      "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
      "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
      "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
      "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
      "navajowhite": "#ffdead", "navy": "#000080",
      "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
      "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
      "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
      "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
      "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
      "violet": "#ee82ee",
      "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
      "yellow": "#ffff00", "yellowgreen": "#9acd32"
    };
    if (typeof colours[colour.toLowerCase()] != 'undefined')
      return colours[colour.toLowerCase()];
    return false;
  }
  reverseString(str: string) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  }


  reusable(nmt: any) {
    let dos = 75;
    let sims = [];
    let diffs = [];
    let props = [];
    for (let n in nmt) {
      props.push(nmt[n]);
    }
    for (let i in props) {
      for (let j in props) {
        if (i != j) {
          let sim = this.similar(props[i], props[j]);
          let dif = this.differences(props[i], props[j]);
          let SimilarityLen = Object.keys(sim).length;
          let prop1Len = Object.keys(props[i]).length;
          let prop2Len = Object.keys(props[j]).length;
          if ((SimilarityLen / prop1Len) * 100 >= dos && (SimilarityLen / prop2Len) * 100 >= dos) {
            let tags = [Object.keys(nmt)[i].trim(), Object.keys(nmt)[j].trim()].sort().toString();
            let tagSplited = tags.split(',');
            sims[this.toUniqueArray(tagSplited.sort())] = sim;
            diffs[this.toUniqueArray(tagSplited.sort())] = dif;
          }
        }
      }
    }
    // console.log(Object.values(sims))
    let similarTags: any = [];
    let current;
    if (Object.keys(sims).length == 1) {
      return [sims, diffs]
      // return (similarity, difference)
    }
    else {
      for (let s in sims) {
        current = s.split(',');
        let t = [];
        let p = [];
        for (let s1 in sims) {
          if (s.trim() != s1.trim()) {
            for (let c in current) {
              if (s1.split(',').includes(current[c])) {
                let tempp = this.similar(sims[s], sims[s1]);
                if (Object.keys(tempp).length / Object.keys(sims[s]).length * 100 >= dos && Object.keys(tempp).length / Object.keys(sims[s1]).length * 100 >= dos) {
                  t.push(current[c]);
                  let temp = s1.split(',');
                  for (let ss1 in temp) {
                    if (!t.includes(temp[ss1])) {
                      t.push(temp[ss1]);
                      p.push(tempp);
                    }
                  }
                }
              }
              else {
                t.push(s);
                p.push(sims[s]);
              }
            }
          }
        }
        if (p.length != 0) {
          if (!similarTags.includes(this.toUniqueArray(t).sort().toString())) {
            similarTags.push(this.toUniqueArray(t).sort().toString());
          }
        }
      }
    }


    for (let st in similarTags) {
      for (let si in sims) {
        let c1 = si.split(',');
        if (!similarTags[st].includes(c1[0]) && !similarTags[st].includes(c1[1])) {
          similarTags.push(si);
        }
      }
    }
    let result = [];
    for (let st in similarTags) {
      let holder = [];
      let temp_1 = this.toUniqueArray(similarTags[st].split(',')).sort();

      for (let i_1 = 0; i_1 < temp_1.length; i_1++) {
        try {
          if (holder.length == 0) {
            holder = (this.similar(nmt[temp_1[0]], nmt[temp_1[1]]));
          }
          else {
            let t1 = this.similar(nmt[temp_1[i_1]], nmt[temp_1[i_1 + 1]]);
            let t2 = (this.similar(holder, t1));
            holder = t2;
          }
        }
        catch {
          continue;
        }
      }
      // for (let t = 0; t < temp_1.length - 1; t++) {
      //     temp_1[t] = temp_1[t].replace(',', '') + '\n,';
      // }
      result[temp_1] = holder;

    }
    return [result, diffs];
  }
  intersection_destructive(a: any, b: any) {
    var result = [];
    while (a.length > 0 && b.length > 0) {
      if (a[0] < b[0]) { a.shift(); }
      else if (a[0] > b[0]) { b.shift(); }
      else /* they're equal */ {
        result.push(a.shift());
        b.shift();
      }
    }
    return result;
  }

  differences(a: any, b: any) {
    var dif: any = [];
    for (var key in a) { //In a and not in b
      if (!b[key.trim()]) {
        dif.push(key.trim())
      }
    }
    for (key in b) { //in b and not in a
      if (!a[key.trim()]) {
        dif.push(key.trim())
      }
    }
    for (var key in a) {
      if (b[key.trim()] && a[key.trim()] != b[key.trim()]) {
        dif.push(key.trim())
      }
    }
    for (key in b) {
      if (a[key.trim()] && a[key.trim()] != b[key.trim()]) {
        dif.push(key.trim())
      }
    }
    return dif;
  }
  similar(a: any, b: any) {
    let sim: any = [];
    for (var key in a) {
      if (b[key.trim()] && a[key.trim()] == b[key.trim()]) {
        sim[key.trim()] = a[key.trim()];
      }
    }
    for (key in b) {
      if (a[key.trim()] && a[key.trim()] == b[key.trim()]) {
        sim[key.trim()] = b[key.trim()];
      }
    }
    return sim;
  }
  toUniqueArray(a: any) {
    var newArr: any = [];
    for (var i = 0; i < a.length; i++) {
      if (newArr.indexOf(a[i]) === -1) {
        newArr.push(a[i]);
      }
    }
    return newArr;
  }

  WriteToFile(data: any) {
    fs.writeFile('css.css', data, (err: any) => {

      if (err) throw err;
    })
  }
}



