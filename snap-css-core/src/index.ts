import Optimizer from './optimize/optimizer'
import Compressor from './optimize/compress/compressor'
import Restructurer from './optimize/restructure/restructurer'
import Cleaner from './optimize/clean/cleaner'
import Suggester from './optimize/suggest/suggester'
import CSS from './css/css'

class SnapCss {
  private keys = ['r', 'c', 'k', 's']

  private optimizers: Optimizer[] = [new Restructurer(), new Cleaner(), new Compressor(), new Suggester()]

  public getOptimizers = (params: string) => this.optimizers.filter(
    (opt, ind) => params.includes(this.keys[ind]) || params.includes('a'))

  public getCSS(css: string) {
    // Here is to handle how the loader loads the css file and turns it into text or just return text after validating it menamen or creating CSS object there
    // const loader = new Loader(path)
    return CSS.fromString(css)
  }
}

export = SnapCss
