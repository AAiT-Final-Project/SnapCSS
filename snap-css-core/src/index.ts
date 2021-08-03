/* eslint-disable no-console */
import {Command, flags} from '@oclif/command'
import Compressor from './optimize/compress/compressor'

class SnapCss extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    // const {args, flags} = this.parse(SnapCss)

    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from ./src/index.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
    // const trial = CSS.fromString('Trial CSS')
    // eslint-disable-next-line no-console
    // console.log(trial.toString())
    const cssString = 'flexing { flex-grow: 1;} flexing2 { flex-grow: 2; flex-shrink: 2; color: red; flex-basis: 10%; } width-style-color {column-rule-width: 10px; column-rule-style: solid; column-rule-color: #AA88FF; outline-width: 10px; outline-style: solid; outline-color: #AA88FF; border-width: 10px; border-style: solid; border-color: #AA88FF; border-top-width: 10px; border-top-style: solid; border-top-color: #AA88FF;} class1 {border-width-top: 5px; border-width-right: 10px; border-width-bottom: 15px; border-width-left: 20px; padding-top: 5px; padding-right: 10px; padding-bottom: 15px; padding-left: 20px;} class2 { margin-top: 5px; margin-right: 10px; margin-bottom: 15px; margin-left: 20px; padding-top: 5px; padding-right: 10px; padding-bottom: 5px; padding-left: 10px;  border-width-top: 10px; border-width-right: 10px; border-width-bottom: 10px; border-width-left: 10px;}'
    const compressor = new Compressor()
    const shorthandedCss = compressor.findLonghand(cssString)
    console.log(shorthandedCss)
  }
}

export = SnapCss
