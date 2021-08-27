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
  //the array it gets from loader is structured like [[NonMediaSelectors],[MediaSelectors]] 
  //at index 0 it has the Non @ rules and at index 1 it has rules wz @
  NonMediaSelectors(x: any) {
    let SelectorsProps: any[] = []; //fetch the Non@ rules
    const data = css.stringify(x[0]);


    //***********************************************************************************************
    try {
      for (let i = 0; i < data.length; i++) {
        let selector: any = '';
        let property = '';
        if (data.charAt(i) == '{') {
          let j = i - 1;
          while (data.charAt(j) != '}' && j >= 0) {
            selector = selector + data.charAt(j);
            j--;
          }

          selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim();

          let k = i;
          while (data.charAt(k - 1) != '}') {
            property = property + data.charAt(k);
            k++;
          }
          property = property.replace('{', '').replace('}', '').trim();
          if (Object.keys(SelectorsProps).includes(selector.trim())) {
            let oldProp = SelectorsProps[selector];
            let newProp = oldProp + property;
            SelectorsProps[selector] = newProp;
          }
          else {
            SelectorsProps[selector] = property;
          }
          selector = '';
          property = '';


        }
      }
    } catch (e) {
      console.log(e)
    }
    //************************************************************************************************

    let NoDuplication: any = []; // the array of rules it is going to be returned at last
    for (let tp in SelectorsProps) {
      let eachProps = SelectorsProps[tp].split(';'); //split the string so we can take a look at each rules
      for (let ep in eachProps) {
        eachProps[ep] = eachProps[ep].replace(/\r/g, '').replace(/\n/g, '').trim();
      }
      let removeDuplication: any = []; //if a property name mentioned the more than once in the same selector this dictionary will take the last rule mentioned.
      for (let ep in eachProps) {
        if (eachProps[ep] != '') {
          let rule = eachProps[ep].split(':'); //split the property name and the value
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
  MediaSelectors(x: any) {
    let SelectorsProps: any = [];
    const data = css.stringify(x[1])



    //***********************************************************************************************
    try {
      for (let i = 0; i < data.length; i++) {
        let selector = '';
        let property = '';
        if (data.charAt(i) == '{') {
          let j = i - 1;
          while (data.charAt(j) != '}' && j >= 0) {
            selector = selector + data.charAt(j);
            j--;
          }
          let openselector = 0;
          let closeselector = 0;
          let k = i;
          while (k < data.length) {
            property = property + data[k];
            if (data[k] == '{') {
              openselector++;
            }
            else if (data[k] == '}') {
              closeselector++;
            }
            if (openselector == closeselector) {
              selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim();
              if (Object.keys(SelectorsProps).includes(selector.trim())) {
                let oldProp = SelectorsProps[selector];
                let newProp = oldProp + property.substring(1, property.length - 2);
                SelectorsProps[selector] = newProp;
              }
              else {
                SelectorsProps[selector] = property.substring(1, property.length - 2);
              }
              openselector = 0;
              closeselector = 0;
              selector = '';
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
    for (let tp in SelectorsProps) {
      var prepared = new Loader('').construct(SelectorsProps[tp]);

      NoDuplication[tp] = this.NonMediaSelectors(prepared);
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
            let Selectors = [Object.keys(nmt)[i].trim(), Object.keys(nmt)[j].trim()].sort().toString();
            let Selectorsplited = Selectors.split(',');
            sims[this.toUniqueArray(Selectorsplited.sort())] = sim;
            diffs[this.toUniqueArray(Selectorsplited.sort())] = dif;
          }
        }
      }
    }
    // console.log(Object.values(sims))
    let similarSelectors: any = [];
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
          if (!similarSelectors.includes(this.toUniqueArray(t).sort().toString())) {
            similarSelectors.push(this.toUniqueArray(t).sort().toString());
          }
        }
      }
    }


    for (let st in similarSelectors) {
      for (let si in sims) {
        let c1 = si.split(',');
        if (!similarSelectors[st].includes(c1[0]) && !similarSelectors[st].includes(c1[1])) {
          similarSelectors.push(si);
        }
      }
    }
    let result = [];
    for (let st in similarSelectors) {
      let holder = [];
      let temp_1 = this.toUniqueArray(similarSelectors[st].split(',')).sort();

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



