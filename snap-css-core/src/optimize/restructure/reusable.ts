const helper_function = require('./helper-functions')

export function FindReusable(nmt: any) {
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
				let sim = helper_function.similar(props[i], props[j]);
				let dif = helper_function.differences(props[i], props[j]);
				let SimilarityLen = Object.keys(sim).length;
				let prop1Len = Object.keys(props[i]).length;
				let prop2Len = Object.keys(props[j]).length;
				if ((SimilarityLen / prop1Len) * 100 >= dos && (SimilarityLen / prop2Len) * 100 >= dos) {
					let Selectors = [Object.keys(nmt)[i].trim(), Object.keys(nmt)[j].trim()].sort().toString();
					let Selectorsplited = Selectors.split(',');
					sims[helper_function.toUniqueArray(Selectorsplited.sort())] = sim;
					diffs[helper_function.toUniqueArray(Selectorsplited.sort())] = dif;
				}
			}
		}
	}
	let similarSelectors: any = [];
	let current;
	if (Object.keys(sims).length == 1) {
		return [sims, diffs]
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
							let tempp = helper_function.similar(sims[s], sims[s1]);
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
				if (!similarSelectors.includes(helper_function.toUniqueArray(t).sort().toString())) {
					similarSelectors.push(helper_function.toUniqueArray(t).sort().toString());
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
		let temp_1 = helper_function.toUniqueArray(similarSelectors[st].split(',')).sort();

		for (let i_1 = 0; i_1 < temp_1.length; i_1++) {
			try {
				if (holder.length == 0) {
					holder = (helper_function.similar(nmt[temp_1[0]], nmt[temp_1[1]]));
				}
				else {
					let t1 = helper_function.similar(nmt[temp_1[i_1]], nmt[temp_1[i_1 + 1]]);
					let t2: any = (helper_function.similar(holder, t1));
					holder = t2;
				}
			}
			catch {
				continue;
			}
		}
		result[temp_1] = holder;
	}
	return [result, diffs];
}