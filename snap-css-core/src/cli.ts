/* eslint-disable no-console */
import {Command, flags} from '@oclif/command'
import SnapCss = require('./index')

class SnapCli extends Command {
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
    this.log('Here is the CLI Running space, at ./src/cli.ts')

    // this should be what the CLI runs after parsing the inputs any way it wants
    const snap = new SnapCss()
    const optimizers = snap.getOptimizers('a')
    const css = snap.getCSS('Trial CSS code Goes Here')
    optimizers.forEach(optimizer => optimizer.optimize(css))
  }
}

export = SnapCli
