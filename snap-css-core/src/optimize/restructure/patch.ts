const helper_function = require('./helper-functions')

export function patch(noDuplication: any, similar: any, difference: any, differentProps: any) {
  for (const d in difference) {
    const current = d.split(',')
    const prop = difference[d]
    for (const c in current) {
      for (const p in prop) {
        if (Object.keys(differentProps).includes(current[c])) {
          const x = []
          x[prop[p]] = noDuplication[current[c]][prop[p]]
          const old = differentProps[current[c]]
          differentProps[current[c]] = Object.assign([], old, x)
        } else {
          const x = []
          x[prop[p]] = noDuplication[current[c]][prop[p]]
          differentProps[current[c]] = x
        }
      }
    }
  }
  for (const d in differentProps) {
    const each = differentProps[d]
    for (const e in each) {
      if (each[e] === undefined) {
        delete each[e]
      }
    }
  }
  for (const d in differentProps) {
    const each = differentProps[d]
    if (Object.values(each).length === 0) {
      delete differentProps[d]
    }
  }
  for (const d in differentProps) {
    for (const s in similar) {
      if (s.includes(d)) {
        for (const d1 in differentProps[d]) {
          if (Object.keys(similar[s]).includes(d1))
            try {
              delete similar[s][d1]
            } catch {}
        }
      }
    }
  }
  for (const i in similar) {
    const spl = i.split(',')
    for (const j in spl) {
      delete noDuplication[spl[j]]
    }
  }
  for (const i in similar) {
    noDuplication[i] = similar[i]
  }
  for (const i in similar) {
    for (const j in similar) {
      if (i !== j) {
        if (helper_function.intersection_destructive(i.split(','), j.split(',')).length !== 0) {
          if (i.split(',').length !== j.split(',').length) {
            const smaller = Math.min(i.split(',').length, j.split(',').length)
            if (i.split(',').length === smaller) {
              try {
                delete noDuplication[i]
              } catch {}
            } else {
              try {
                delete noDuplication[j]
              } catch {}
            }
          }
        }
      }
    }
  }
  for (const i in differentProps) {
    noDuplication[i] = differentProps[i]
  }

  return [noDuplication, similar, difference, differentProps]
}
