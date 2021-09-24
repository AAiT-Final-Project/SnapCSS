import Optimizer from '../optimizer'
import CSS from '../../css/css'
import { stringify } from './helper-functions';
import Declaration from '../../css/declaration';
const helper_function = require('./helper-functions')
const reusable = require('./reusable')
const patch = require('./patch')
export default class Restructurer implements Optimizer {
	optimize(input: CSS): CSS {
		const parsed = helper_function.construct(input)
		const nonMedia = this.NonMediaSelectors(parsed);
		const media = this.MediaSelectors(parsed);
		const result = CSS.fromString((nonMedia) + '\n' + (media))
		return result
	}
	private NonMediaSelectors(input: any) {
		let NoDuplication: any = []
		const rules = input[0].stylesheet.rules
		rules.forEach((rule: { type: String; selectors: string[]; declarations: any; }) => {
			if (rule.type == 'rule') {
				const declaretions: [Declaration] = rule.declarations
				const declaretions_: any = [];
				declaretions.forEach((declaretion: { property: any; value: any; }) => {
					if (Object.keys(declaretions_).includes(declaretion.property)) {
						if (!declaretions_[declaretion.property].includes('!important')) {
							declaretions_[declaretion.property] = declaretion.value
						} else if (declaretions_[declaretion.property].includes('!important') && declaretion.value.includes('!important')) {
							declaretions_[declaretion.property] = declaretion.value
						}
					} else {
						declaretions_[declaretion.property] = declaretion.value
					}
				});
				const selector: any = rule.selectors;
				if (selector.length > 1) {
					selector.forEach((s: string | number) => {
						NoDuplication[s] = declaretions_
					});
				} else {
					NoDuplication[selector] = declaretions_
				}
			}
		});
		let reuse = reusable.FindReusable(NoDuplication);
		let similars = reuse[0];
		let difference = reuse[1];
		let differentProps: any = [];
		const patched = patch.patch(NoDuplication, similars, difference, differentProps)
		NoDuplication = patched[0]
		similars = patched[1]
		difference = patched[2]
		differentProps = patched[differentProps]
		let toBEWritten = '';
		for (let n in NoDuplication) {
			let tempProp = "";
			for (let ree in NoDuplication[n]) {
				tempProp = tempProp + "   " + ree + " : " + NoDuplication[n][ree] + ";\n";
			}
			toBEWritten = toBEWritten + n + " {\n" + tempProp + "}\n\n";
		}
		return ((toBEWritten));
	}
	private MediaSelectors(input: any) {
		const animation: any[] = []
		// x.forEach((element: any) => {
		const rules = input[1].stylesheet.rules
		rules.forEach((rule: { type: any; media: any; keyframes: any; name: any; vendor: any; rules: any; }) => {
			if (rule.type == 'media') {
				const media: any = '@' + rule.type + ' ' + rule.media
				const rules_ = rule.rules
				let ruleset: any = []
				rules_.forEach((r_: { selectors: any; declarations: any; }) => {
					const declarations: any = []
					r_.declarations.forEach((declaration: { property: any; value: any; }) => {
						if (declaration.value.includes('!important')) {
							declarations[declaration.property] = declaration.value
						} else if (!declaration.value.includes('!important')) {
							if (Object.keys(declarations).includes(declaration.property)) {
								if (!declarations[declaration.property].includes('!important')) {
									declarations[declaration.property] = declaration.value
								}
							} else {
								declarations[declaration.property] = declaration.value
							}
						}
					});
					if (Object.keys(ruleset).includes(r_.selectors[0])) {
						let temp = ruleset[r_.selectors]
						temp = Object.assign(temp, declarations)
						ruleset[r_.selectors] = temp
					} else {
						ruleset[r_.selectors] = declarations;
					}
				});
				animation[media] = ruleset
				ruleset = []
			} else if (rule.type == 'keyframes') {
				const keyframeName = rule.name
				const vendor = rule.vendor
				let ruleSet: any[] = [];
				let keyframe: any = ''
				if (vendor != undefined) {
					keyframe = '@' + vendor + rule.type + ' ' + keyframeName
				} else {
					keyframe = '@' + rule.type + ' ' + keyframeName
				}
				const keyframeValue: any = []
				rule.keyframes.forEach((element: { values: any; declarations: any; }) => {
					element.declarations.forEach((element: { property: any; value: any; }) => {
						if (element.value.includes('!important')) {
							ruleSet[element.property] = element.value
						} else if (!element.value.includes('!important')) {
							if (Object.keys(ruleSet).includes(element.property)) {
								if (!ruleSet[element.property].includes('!important')) {
									ruleSet[element.property] = element.value
								}
							} else {
								ruleSet[element.property] = element.value
							}
						}
					});
					if (Object.keys(keyframeValue).includes(element.values[0])) {
						let temp = keyframeValue[element.values[0]]
						temp = Object.assign(temp, ruleSet)
						keyframeValue[element.values[0]] = temp
					} else {
						keyframeValue[element.values[0]] = ruleSet
					}
					ruleSet = []
				});
				animation[keyframe] = keyframeValue
			}
		});
		let SelectorsProps = stringify(animation)
		let NoDuplication: any = [];
		for (let tp in SelectorsProps) {
			var prepared = helper_function.construct(SelectorsProps[tp]);
			NoDuplication[tp] = this.NonMediaSelectors(prepared);
		}
		const finalResult: any = []
		for (const n in NoDuplication) {
			finalResult[n] = NoDuplication[n]
		}
		let toBEWritten = '';
		for (let m in NoDuplication) {
			toBEWritten = toBEWritten + m + "{\n" + (NoDuplication[m]) + "\n\n}";
		}
		return toBEWritten;
	}
}
