/* eslint-disable no-console */
import {Command, flags} from '@oclif/command'
import snap = require('./index')
// import JsonExporter from './optimize/suggest/json-exporter'

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
    // console.log(trial.toString())

    // this should be what the CLI runs after parsing the inputs any way it wants
    const listLogger = (messages: string[]) => messages.forEach(message => this.log(message))
    let css = snap.getCSS(`
    @media only screen and (max-width: 600px) {

    }

    #max {
      color: #fac452;
      width: 400px;
      height: 300px;
      display: block;
      margin: 0;
    }

    #max {
      color: green;
    }`, listLogger)

    css = await snap.optimize(css, 'a')
    this.log(css.toString())
    // snap.exportFile('./trial.json', JSON.stringify(css.toObject()))
    // snap.exportFile('./trial.css', css.toString(), listLogger)
    // this.log(snap.getCSSFromFile('./trial.css', listLogger).toString())
    // JsonExporter.start()
  }
}

export = SnapCli
