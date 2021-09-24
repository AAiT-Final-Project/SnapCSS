const helper_function = require('./helper-functions')
export function patch(NoDuplication: any, similars: any, difference: any, differentProps: any) {
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
	for (let d in differentProps) {
		for (let s in similars) {
			if (s.includes(d)) {
				for (let d1 in differentProps[d]) {
					if (Object.keys(similars[s]).includes(d1))
						try {
							delete similars[s][d1]
						} catch {
							continue
						}
				}
			}
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
				if (helper_function.intersection_destructive(i.split(','), j.split(',')).length != 0) {
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

	return [NoDuplication, similars, difference, differentProps]

}