import * as fs from 'fs'

type ScanFunction = (path: string) => string;
type ExportFunction = (path: string, data: string) => void

export default class Scanner {
  // TODO Implement the file specific scanners and exporters
  private static scanCSS: ScanFunction = (path: string) => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch {
      return ''
    }
  }

  private static scanHTML: ScanFunction = (path: string) => {
    return path
  }

  private static scanVue: ScanFunction = (path: string) => {
    return path
  }

  private static exportPlain: ExportFunction = (path: string, data: string) => {
    try {
      fs.writeFileSync(path, data)
    } catch {
      return 'Could not write File'
    }
    return path + data
  }

  private static exportHTML: ExportFunction = (path: string, data: string) => {
    return path + data
  }

  private static exportVue: ExportFunction = (path: string, data: string) => {
    return path + data
  }

  private static scanner: { [type: string]: ScanFunction } = {
    css: Scanner.scanCSS, html: Scanner.scanHTML, vue: Scanner.scanVue,
  }

  private static exporter: { [type: string]: ExportFunction } = {
    css: Scanner.exportPlain, html: Scanner.exportHTML, vue: Scanner.exportVue,
  }

  static scanFile(inputPath: string) {
    const type = inputPath.split('.').pop()
    return type && type in Scanner.scanner ? Scanner.scanner[type](inputPath) : ''
  }

  static exportFile(outputPath: string, data: string) {
    const type = outputPath.split('.').pop()
    return type && type in Scanner.exporter ? Scanner.exporter[type](outputPath, data) : Scanner.exportPlain(outputPath, data)
  }
}
