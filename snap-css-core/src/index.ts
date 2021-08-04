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
    const cssString = 'class1 { grid-column-start: 1; grid-column-end: span 2; grid-row-start: 1; grid-row-end: span 2; }'
    const compressor = new Compressor()
    const shorthandedCss = compressor.findLonghand(cssString)
    console.log(shorthandedCss)
  }
}

export = SnapCss
