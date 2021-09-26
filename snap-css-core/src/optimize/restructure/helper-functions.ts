import CSS from "../../css/css";

export function reverseString(str: string) {
	let newString = "";
	for (let i = str.length - 1; i >= 0; i--) {
		newString += str[i];
	}
	return newString;
}

export function intersection_destructive(a: any, b: any) {
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

export function differences(a: any, b: any) {
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
export function similar(a: any, b: any) {
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
export function toUniqueArray(a: string[]) {
	var newArr: string[] = [];
	for (var i = 0; i < a.length; i++) {
		if (newArr.indexOf(a[i]) === -1) {
			newArr.push(a[i]);
		}
	}
	return newArr;
}

export function stringify(css: any) {
	const result: any = []
	let concat = ''
	// console.log(css)
	let selector1 = '';
	for (const animation in css) {
		selector1 = animation
		// console.log(selector1 + '{')
		for (const ruleset in css[animation]) {
			const selector2 = ruleset
			concat = '';
			// console.log(selector2 + '{')
			for (const rules in css[animation][ruleset]) {
				// console.log(rules + ': ' + css[animation][ruleset][rules])
				concat = concat + rules + ': ' + css[animation][ruleset][rules] + ';';
			}
			if (!Object.keys(result).includes(selector1)) {
				result[selector1] = selector2 + '{\n' + concat + '}\n'
			} else {
				let temp = result[selector1];
				temp = temp + selector2 + '{\n' + concat + '}\n'
				result[selector1] = temp
			}

		}
		// console.log('}')
	}
	return result
}

export function intersect_safe(a: any, b: any) {
	var ai = 0, bi = 0;
	var result = [];

	while (ai < a.length && bi < b.length) {
		if (a[ai] < b[bi]) { ai++; }
		else if (a[ai] > b[bi]) { bi++; }
		else /* they're equal */ {
			result.push(a[ai]);
			ai++;
			bi++;
		}
	}

	return result;
}
export function arr_diff(a1: any, a2: any) {

	var a = [], diff = [];

	for (var i = 0; i < a1.length; i++) {
		a[a1[i]] = true;
	}

	for (var i = 0; i < a2.length; i++) {
		if (a[a2[i]]) {
			delete a[a2[i]];
		} else {
			a[a2[i]] = true;
		}
	}

	for (var k in a) {
		diff.push(k);
	}

	return diff;
}

export function construct(input: CSS) {
	const data = input.toString()
	let nonMediaTagProp: string[] = [];
	let mediaTagProp: string[] = [];
	for (let i = 0; i < data.length; i++) {
		let tag: any = '';
		let property = '';
		if (data.charAt(i) == '{') {
			let j = i - 1;
			while (data.charAt(j) != '}' && j >= 0) {
				tag = tag + data.charAt(j);
				j--;
			}
			if (!reverseString(tag).includes('@')) {
				tag = reverseString(tag).replace(/\n/g, '').replace(/\r/g, '').trim();

				let k = i;
				while (data.charAt(k - 1) != '}') {
					property = property + data.charAt(k);
					k++;
				}
				property = property.replace('{', '').replace('}', '').trim();
				if (Object.keys(nonMediaTagProp).includes(tag.trim())) {
					let oldProp = nonMediaTagProp[tag];
					let newProp = oldProp + property;
					nonMediaTagProp[tag] = newProp;
				}
				else {
					nonMediaTagProp[tag] = property;
				}
				tag = '';
				property = '';
			}
			else {
				let opentag = 0;
				let closetag = 0;
				let j = i;
				while (j < data.length) {
					property = property + data[j];
					if (data[j] == '{') {
						opentag++;
					}
					else if (data[j] == '}') {
						closetag++;
					}
					if (opentag == closetag) {
						tag = reverseString(tag).replace(/\n/g, '').replace(/\r/g, '').trim();
						if (Object.keys(mediaTagProp).includes(tag.trim())) {
							let oldProp = mediaTagProp[tag];
							let newProp = oldProp + property.substring(1, property.length - 2);
							mediaTagProp[tag] = newProp;
						}
						else {
							mediaTagProp[tag] = property.substring(1, property.length - 2);
						}
						opentag = 0;
						closetag = 0;
						tag = '';
						property = '';
						i = j + 1;
						break;
					}
					j++;
				}
			}
		}
	}

	let result = [nonMediaTagProp, mediaTagProp];
	let mediaSelectorsStr = '';
	let nonMediaSelectorsStr = '';
	for (let r in result[0]) {
		nonMediaSelectorsStr = nonMediaSelectorsStr + r + '{\n' + result[0][r] + '\n}\n'
	}
	for (let r in result[1]) {
		mediaSelectorsStr = mediaSelectorsStr + r + '{\n' + result[1][r] + '\n}\n'
	}
	const css = require('css')
	result = [css.parse(nonMediaSelectorsStr), css.parse(mediaSelectorsStr)]
	return result;
}



//**********************************************helper functions***********************************************


