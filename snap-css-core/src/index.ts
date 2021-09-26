import Optimizer from './optimize/optimizer'
import Compressor from './optimize/compress/compressor'
import Restructurer from './optimize/restructure/restructurer'
import Cleaner from './optimize/clean/cleaner2'
import Suggester from './optimize/suggest/suggester'
import Scanner from './load/scanner'
import Loader from './load/loader2'
import CSS from './css/css'

class SnapCss {
  private keys = ['r', 'c', 'k', 's']

  private optimizers: Optimizer[] = [new Restructurer(), new Cleaner(), new Compressor(), new Suggester()]

  public async optimize(css: CSS, options = 'a') {
    for (let i = 0; i < 4; i++)
      if ((options + 'k').includes(this.keys[i]) || options.includes('a'))
        // eslint-disable-next-line no-await-in-loop
        css = await this.optimizers[i].optimize(css)
    return css
  }

  public getCSS(css: string, display: (msg: string[]) => any | void = console.log, load = Loader.loadCSS) {
    const [result, message] = load(css)
    display(message)
    return result
  }

  public getCSSFromFile(path: string, display: (msg: string[]) => any | void = console.log) {
    return this.getCSS(path, display, Loader.loadFromFile)
  }

  public exportFile(path: string, data: string, display: (msg: string[]) => any = console.log) {
    display([Scanner.exportFile(path, data)])
  }
}

export = new SnapCss()
