import { Command, flags } from '@oclif/command'
import SnapCss = require('./index')
// import JsonExporter from './optimize/suggest/json-exporter'

class SnapCli extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

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
    // this.log('Here is the CLI Running space, at ./src/cli.ts')

    // this should be what the CLI runs after parsing the inputs any way it wants
    const listLogger = (messages: string[]) => messages.forEach(message => this.log(message))
    const snap = new SnapCss()
    const optimizers = snap.getOptimizers('s')
    const css = snap.getCSS(`
    @media screen and (min-width: 480px) {
      .body:hover{
        background-color: rgba(10,11,14,15) !important;
      }
    }
    #main, .apple {
      border: 1px solid black;
    }
    #max {
      padding: 50px;
      height: 100%;
    }`, listLogger)

    optimizers.forEach(optimizer => optimizer.optimize(css))
    // this.log(css.toString())
    // snap.exportFile('./trial.json', JSON.stringify(css.toObject()))
    snap.exportFile('./trial.css', css.toString(), listLogger)
    this.log(snap.getCSSFromFile('./trial.css', listLogger).toString())
    // JsonExporter.start()
  }
}

export = SnapCli