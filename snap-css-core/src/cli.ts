/* eslint-disable no-console */
import {Command, flags} from '@oclif/command'
import snap = require('./index')
import * as fs from 'fs'
// import JsonExporter from './optimize/suggest/json-exporter'

class SnapCli extends Command {
  static description = 'This command takes in input CSS code and outputs an optimized version of it. The different optimizations to be performed (Clean, Restructure, Suggest) can be specified by their options and are assumed to be picked when none are specified. However Compressing of CSS is a mandatory operation.'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with no value
    clean: flags.boolean({char: 'c', description: 'Clean CSS Code'}),
    restructure: flags.boolean({char: 'r', description: 'Restructure CSS Code'}),
    suggest: flags.boolean({char: 's', description: 'Make Selector Suggestions'}),
  }

  static args = [
    {name: 'Input File', required: true, description: 'Path to the input CSS file. Accepts CSS from .css, .html, .php, .vue files'},
    {name: 'Output File', required: false, description: 'Path to the output file/folder. If file is not picked, the output folder will be used with custom file name. If the output field is not specified, the input path will be used with custom file name.'},
  ]

  async run() {
    const {args, flags} = this.parse(SnapCli)

    const inputPath = args['Input File']
    if (!fs.statSync(inputPath).isFile()) {
      this.error(`ENOENT: no such file, '${inputPath}'`)
      return
    }

    const inputSplit = inputPath.split('/')
    const fileName = inputSplit.pop()

    let outputPath = '.'
    if (args['Output File'])  outputPath = args['Output File']
    else outputPath = `${inputSplit.join('/')}`
    if (outputPath === '') outputPath = '.'
    if (outputPath === '.' || fs.statSync(outputPath).isDirectory()) outputPath += `/optimized_${fileName}`

    const options = flags.clean || flags.restructure || flags.suggest ?
      `${flags.clean ? 'c' : ''}${flags.restructure ? 'r' : ''}${flags.suggest ? 's' : ''}` : 'a'

    const listLogger = (messages: string[]) => {
      if (messages[0].toLowerCase().includes('success')) this.log(messages[0])
      else messages.forEach(message => this.error(message))
    }
    let message: string[] = []
    let css = snap.getCSSFromFile(inputPath, messages => {
      message = messages
    })
    if (!message[0].toLowerCase().includes('success')) {
      message.forEach(mess => this.error(mess))
      return
    }
    this.log(message[0])
    css = await snap.optimize(css, options)
    this.log('Successfully Optimized CSS')
    snap.exportFile(outputPath, css.toString(), listLogger)

    // let css = snap.getCSS(`
    // *,::after,::before{box-sizing:border-box}@media (prefers-reduced-motion:no-preference){:root{scroll-behavior:smooth}}body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}hr{margin:1rem 0;color:inherit;background-color:currentColor;border:0;opacity:.25}hr:not([size]){height:1px}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5rem;font-weight:500;line-height:1.2}.h1,h1{font-size:calc(1.375rem + 1.5vw)}`, listLogger)

    // this.log(css.toString())
    // snap.exportFile('./trial.json', JSON.stringify(css.toObject()))
    // snap.exportFile('./trial.css', css.toString(), listLogger)
    // this.log(snap.getCSSFromFile('./trial.css', listLogger).toString())
    // JsonExporter.start()
  }
}

export = SnapCli
