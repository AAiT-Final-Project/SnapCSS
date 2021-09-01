import * as fs from 'fs'

export default class Scanner {
  private static scanner: { [id: string]: any } = {css: Scanner.scanCSS, html: Scanner.scanHTML, vue: Scanner.scanVue}

  static scan(inputPath: string) {
    const type = inputPath.split('.')[-1]
    return type in Scanner.scanner ? Scanner.scanner[type](inputPath) : ''
  }

  private static scanCSS(path: string) {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch {
      return ''
    }
  }

  private static scanHTML(path: string) {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch {
      return ''
    }
  }

  private static scanVue(path: string) {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch {
      return ''
    }
  }
}
