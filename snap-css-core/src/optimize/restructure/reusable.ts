const helper_function = require('./helper-functions')

export function findReusable(nmt: any) {
  const dos = 75
  const sims = []
  const diffs = []
  const props = []
  for (const n in nmt) {
    props.push(nmt[n])
  }
  for (const i in props) {
    for (const j in props) {
      if (i !== j) {
        const sim = helper_function.similar(props[i], props[j])
        const dif = helper_function.differences(props[i], props[j])
        const SimilarityLen = Object.keys(sim).length
        const prop1Len = Object.keys(props[i]).length
        const prop2Len = Object.keys(props[j]).length
        if ((SimilarityLen / prop1Len) * 100 >= dos && (SimilarityLen / prop2Len) * 100 >= dos) {
          const Selectors = [Object.keys(nmt)[i].trim(), Object.keys(nmt)[j].trim()].sort().toString()
          const SelectorSplit = Selectors.split(',')
          sims[helper_function.toUniqueArray(SelectorSplit.sort())] = sim
          diffs[helper_function.toUniqueArray(SelectorSplit.sort())] = dif
        }
      }
    }
  }
  const similarSelectors: any = []
  let current
  if (Object.keys(sims).length === 1) {
    return [sims, diffs]
  }

  for (const s in sims) {
    current = s.split(',')
    const t = []
    const p = []
    for (const s1 in sims) {
      if (s.trim() !== s1.trim()) {
        for (const c in current) {
          if (s1.split(',').includes(current[c])) {
            const temp = helper_function.similar(sims[s], sims[s1])
            if (Object.keys(temp).length / Object.keys(sims[s]).length * 100 >= dos && Object.keys(temp).length / Object.keys(sims[s1]).length * 100 >= dos) {
              t.push(current[c])
              const temp = s1.split(',')
              for (const ss1 in temp) {
                if (!t.includes(temp[ss1])) {
                  t.push(temp[ss1])
                  p.push(temp)
                }
              }
            }
          } else {
            t.push(s)
            p.push(sims[s])
          }
        }
      }
    }
    if (p.length !== 0) {
      if (!similarSelectors.includes(helper_function.toUniqueArray(t).sort().toString())) {
        similarSelectors.push(helper_function.toUniqueArray(t).sort().toString())
      }
    }
  }

  for (const st in similarSelectors) {
    for (const si in sims) {
      const c1 = si.split(',')
      if (!similarSelectors[st].includes(c1[0]) && !similarSelectors[st].includes(c1[1])) {
        similarSelectors.push(si)
      }
    }
  }
  const result = []
  for (const st in similarSelectors) {
    let holder: any = []
    const temp_1 = helper_function.toUniqueArray(similarSelectors[st].split(',')).sort()

    for (let i_1 = 0; i_1 < temp_1.length; i_1++) {
      try {
        if (holder.length === 0) {
          holder = (helper_function.similar(nmt[temp_1[0]], nmt[temp_1[1]]))
        } else {
          const t1 = helper_function.similar(nmt[temp_1[i_1]], nmt[temp_1[i_1 + 1]])
          holder = (helper_function.similar(holder, t1))
        }
      } catch {}
    }
    result[temp_1] = holder
  }
  return [result, diffs]
}
