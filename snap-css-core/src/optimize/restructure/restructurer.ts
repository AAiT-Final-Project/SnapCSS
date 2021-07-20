import Optimizer from '../optimizer'
import CSS from '../../css/css'
import Loader from '../../load/loader';

export default class Restructurer implements Optimizer {
  optimize(input: CSS): CSS {
    return input
  }
  NonMediaTags(x: any) {
    var TagsProps = x[0];
    var NoDuplication: any = [];
    for (var tp in TagsProps) {
      var eachProps = TagsProps[tp].split(';');
      for (ep in eachProps) {
        eachProps[ep] = eachProps[ep].replace(/\r/g, '').replace(/\n/g, '').trim();
      }
      var removeDuplication = [];
      for (var ep in eachProps) {
        if (eachProps[ep] != '') {
          var rule = eachProps[ep].split(':');
          if ([rule[0]].includes('color')) {
            if (colourNameToHex(rule[1].trim()) != false) {
              removeDuplication[rule[0]] = colourNameToHex(rule[1].trim());
            }
            else {
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
    //return reusable(NoDuplication);

    const reuse = reusable(NoDuplication);
    const similars = reuse[0];
    const difference = reuse[1];
    var differentProps: any = [];
    for (var d in difference) {
      var current = d.split(',');
      var prop = difference[d]
      for (var c in current) {
        for (var p in prop) {
          if (!Object.keys(differentProps).includes(current[c])) {

            var x: any = [];
            x[prop[p]] = NoDuplication[current[c]][prop[p]];
            differentProps[current[c]] = x;
          }
          else {
            var x: any = [];
            x[prop[p]] = NoDuplication[current[c]][prop[p]];
            var old = differentProps[current[c]];
            var newer = Object.assign({}, old, x);
            differentProps[current[c]] = newer;
          }
        }
      }
    }
    for (var i in similars) {
      var spl = i.split(',');
      for (var j in spl) {
        delete NoDuplication[spl[j]]
      }
    }
    for (var i in similars) {
      NoDuplication[i] = similars[i];
    }
    for (var i in differentProps) {
      NoDuplication[i] = differentProps[i]
    }
    return (NoDuplication)
  }
  MediaTags(x: any) {
    var TagsProps = x[1];
    var NoDuplication: any = [];
    for (var tp in TagsProps) {
      var prepared = new Loader('').construct(TagsProps[tp]);
      NoDuplication[tp] = this.NonMediaTags(prepared);
    }
    return NoDuplication;
  }
}



/**************************************************** Helper Functions **********************************************/
function colourNameToHex(colour: string) {
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

function reusable(nmt: any) {
  const dos = 75;
  let sims: string[] = [];
  let diffs: string[] = [];
  var props = [];

  for (var n in nmt) {
    props.push(nmt[n]);
  }


  for (var i in props) {
    for (var j in props) {
      if (i != j) {
        const sim = similar(props[i], props[j]);
        const dif = differences(props[i], props[j]);
        const SimilarityLen = Object.keys(sim).length;
        const prop1Len = Object.keys(props[i]).length;
        const prop2Len = Object.keys(props[j]).length;


        if ((SimilarityLen / prop1Len) * 100 >= dos && (SimilarityLen / prop2Len) * 100 >= dos) {
          let tags: string = [Object.keys(nmt)[i].trim(), Object.keys(nmt)[j].trim()].sort().toString();
          let tagSplited: string[] = tags.split(',');
          if (tagSplited.length > 2) {
            //console.log(tags)
          }
          sims[toUniqueArray(tagSplited.sort())] = sim;
          diffs[toUniqueArray(tagSplited.sort())] = dif;
        }

      }
    }
  }
  var similarTags: any = [];

  var current;
  for (var s in sims) {
    current = s.split(',');
    var t = [];
    var p = [];
    for (var s1 in sims) {
      if (s.trim() != s1.trim()) {

        if (s1.split(',').includes(current[0]) || s1.split(',').includes(current[1])) {

          var tempp = similar(sims[s], sims[s1]);
          if (Object.keys(tempp).length / Object.keys(sims[s]).length * 100 >= dos && Object.keys(tempp).length / Object.keys(sims[s1]).length * 100 >= dos) {
            t.push(current[0]);
            t.push(current[1]);
            var temp = s1.split(',');
            if (!t.includes(s1[0]) || !t.includes(s1[1])) {

              for (var x in temp) {
                t.push(temp[x]);
              }
            }
            p.push(tempp);
          }
        }
      }
    }
    if (p.length != 0) {
      if (!similarTags.includes(toUniqueArray(t).sort().toString())) {
        similarTags.push(toUniqueArray(t).sort().toString())
      }
    }
  }
  for (var st in similarTags) {
    for (var si in sims) {
      var c1 = si.split(',');
      if (!similarTags[st].includes(c1[0]) && !similarTags[st].includes(c1[1])) {
        similarTags.push(si);
      }
    }
  }
  let result: any = [];
  for (var st in similarTags) {
    var holder: any = [];
    const temp = similarTags[st].split(',');
    for (let i = 0; i < temp.length; i++) {
      try {
        if (holder.length == 0) {
          holder = (similar(nmt[temp[0]], nmt[temp[1]]));
        }
        else {
          var t1 = similar(nmt[temp[i]], nmt[temp[i + 1]]);
          var t2 = similar(holder, t1);
          holder = (t2);
        }
      } catch {
        continue;
      }
    }
    result[temp] = holder;

  }
  return [result, diffs];


}


function differences(a: any, b: any) {
  var dif: any = [];
  for (var key in a) { //In a and not in b
    if (!b[key]) {
      dif.push(key)
      //dif[key] = a[key];
    }
  }

  for (key in b) { //in b and not in a
    if (!a[key]) {
      dif.push(key)
      //dif[key] = b[key];
    }
  }
  return dif;
}
function similar(a: any, b: any) {
  let sim: any = [];
  for (var key in a) {
    if (b[key] && a[key] == b[key]) {
      sim[key] = a[key];
    }
  }
  for (key in b) {
    if (a[key] && a[key] == b[key]) {
      sim[key] = b[key];
    }
  }
  return sim;
}
function toUniqueArray(a: any) {
  var newArr: any = [];
  for (var i = 0; i < a.length; i++) {
    if (newArr.indexOf(a[i]) === -1) {
      newArr.push(a[i]);
    }
  }
  return newArr;
}
