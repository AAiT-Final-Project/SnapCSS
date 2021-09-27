import Optimizer from '../optimizer'
import CSS from '../../css/css'
import Predictor from './predict/predictor'

export default class Suggester implements Optimizer {
  private counts = 0

  public async optimize(input: CSS): Promise<CSS> {
    const model = new Predictor()
    await model.load()
    for (const ruleSet of input.ruleSets) {
      for (const rule of ruleSet.rules) {
        this.counts += 1
        // eslint-disable-next-line no-await-in-loop
        const suggestions = await model.predict(rule)
        rule.makeSuggestions([...new Set(suggestions).values()])
      }
    }
    return input
  }
}
