import Optimizer from './optimize/optimizer'
import Compressor from './optimize/compress/compressor'
import Restructurer from './optimize/restructure/restructurer'
import Cleaner from './optimize/clean/cleaner'
import Suggester from './optimize/suggest/suggester'
import Scanner from './load/scanner'
import Loader from './load/loader2'

class SnapCss {
  private keys = ['r', 'c', 'k', 's']

  private optimizers: Optimizer[] = [new Restructurer(), new Cleaner(), new Compressor(), new Suggester()]

  public getOptimizers = (params: string) => this.optimizers.filter(
    (opt, ind) => params.includes(this.keys[ind]) || params.includes('a'))

  // eslint-disable-next-line no-console
  public getCSS(css: string, display: (msg: string[]) => any = console.log, load = Loader.loadCSS) {
    const [result, message] = load(css)
    display(message)
    return result
  }

  // eslint-disable-next-line no-console
  public getCSSFromFile(path: string, display: (msg: string[]) => any = console.log) {
    return this.getCSS(path, display, Loader.loadFromFile)
  }

  // eslint-disable-next-line no-console
  public exportFile(path: string, data: string, display: (msg: string[]) => any = console.log) {
    display([Scanner.exportFile(path, data)])
  }
}

export = SnapCss
