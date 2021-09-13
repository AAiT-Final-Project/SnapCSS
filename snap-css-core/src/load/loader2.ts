import CSS from '../css/css'
import Scanner from './scanner'

type LoadFunc = (text: string) => [CSS, string[]]
const {validate} = require('csstree-validator')

export default class Loader {
  static SUCCESS_MSG = 'Successfully Loaded CSS'

  static loadCSS: LoadFunc = (text: string) => {
    // Start by validating the CSS code
    const errors = validate(text)
    if (errors.length > 0) {
      const messages = errors.map((error: any) => {
        // processing error messages here
        // eslint-disable-next-line no-prototype-builtins
        return error.hasOwnProperty('details') ?
          `${error} at line ${error.line} column ${error.column}\n ${error.details}` :
          `${error} at line ${error.line} column ${error.column}`
      })
      return [new CSS(), messages]
    }
    return [CSS.fromString(text), [Loader.SUCCESS_MSG]]
  }

  static loadFromFile: LoadFunc = (path: string) => {
    const result = Scanner.scanFile(path)
    if (result in [Scanner.BAD_EXTENSION_MSG, Scanner.READ_ERROR_MSG])
      return [new CSS(), [result]]
    return Loader.loadCSS(result)
  }
}
