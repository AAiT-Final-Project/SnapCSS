import Loader from '../../load/loader2'
import Scanner from '../../load/scanner'
import {execSync} from 'child_process'
const postcss = require('postcss')
const cssVariables = require('postcss-css-variables')

export default class JsonExporter {
  private static trainingData: [string, string][] = [
    ['bootstrap', 'bs-'],
    ['bulma', ''],
    ['foundation', 'foundation-'],
    ['material-components-web', 'mdc-'],
    ['materialize', 'materialize-'],
    ['mdb', 'materialize-'],
    ['pure', 'pure-'],
    ['semantic', ''],
    ['skeleton', ''],
    // ['tailwind', ''],
    ['uikit', 'uk-'],
  ]

  private static getObject(inputPath: string, prefix = '') {
    const results: object[] = []
    const [result, message] =  Loader.loadFromFile(inputPath)
    // eslint-disable-next-line no-console
    console.log(message)
    result.ruleSets.forEach(ruleSet => {
      ruleSet.rules.forEach(rule => {
        results.push(rule.toObject())
      })
    })
    return {prefix: prefix, rules: results}
  }

  private static parseCSSVars() {
    JsonExporter.trainingData.forEach(data => {
      // eslint-disable-next-line no-console
      console.log('Parsing custom vars for:', data[0])
      const path = `./frameworks/css/${data[0]}.min.css`
      const output = postcss([cssVariables()]).process(Scanner.scanFile(path)).css
      // eslint-disable-next-line no-console
      console.log(Scanner.exportFile(path, output))
    })
  }

  private static downloadFiles() {
    // execSync('curl -o ./frameworks/css/tailwind.min.css https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/bootstrap.min.css https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/materialize.min.css https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/material-components-web.min.css https://cdnjs.cloudflare.com/ajax/libs/material-components-web/13.0.0-canary.72464476c.0/material-components-web.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/mdb.min.css https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/bulma.min.css https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/foundation.min.css https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.3/css/foundation.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/skeleton.min.css https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/semantic.min.css https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/pure.min.css https://cdnjs.cloudflare.com/ajax/libs/pure/2.0.6/pure.min.css', {encoding: 'utf-8'})
    execSync('curl -o ./frameworks/css/uikit.min.css https://cdnjs.cloudflare.com/ajax/libs/uikit/3.7.0/css/uikit.min.css', {encoding: 'utf-8'})
    JsonExporter.parseCSSVars()
  }

  static start() {
    // JsonExporter.downloadFiles()

    const final: object[] = []
    JsonExporter.trainingData.forEach(data => {
      const [file, prefix] = data
      const res = JsonExporter.getObject(`./frameworks/css/${file}.min.css`, prefix)
      if (res.rules.length > 0) final.push(res)
    })
    const message = Scanner.exportFile('./frameworks/data.json', JSON.stringify(final))
    // eslint-disable-next-line no-console
    console.log(message)
  }
}
