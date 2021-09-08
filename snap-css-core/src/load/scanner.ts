import * as fs from 'fs'

type ScanFunction = (path: string) => string;
type ExportFunction = (path: string, data: string) => string

export default class Scanner {
  static BAD_EXTENSION_MSG = 'FileError: File type is not supported. Use (.css, .html, .vue)'

<<<<<<< HEAD
<<<<<<< HEAD
  static READ_ERROR_MSG = 'FileError: Could not load from file'

  static WRITE_SUCCESS_MSG = 'Successfully written into file'

  static WRITE_ERROR_MSG = 'FileError: Could not write into file'
=======
=======
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f
  static READ_ERROR_MSG = 'FileError: Could not load from File'

  static WRITE_SUCCESS_MSG = 'Successfully written into File'

  static WRITE_ERROR_MSG = 'FileError: Could not write into File'
<<<<<<< HEAD
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f
=======
>>>>>>> 392ad28bfe572908a884f94934d4982287875f1f

  // TODO Implement the file specific scanners and exporters
  private static scanCSS: ScanFunction = (path: string) => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch {
      return Scanner.READ_ERROR_MSG
    }
  }

  private static scanHTML: ScanFunction = (path: string) => {
    return Scanner.READ_ERROR_MSG
  }

  private static scanVue: ScanFunction = (path: string) => {
    return Scanner.READ_ERROR_MSG
  }

  private static exportPlain: ExportFunction = (path: string, data: string) => {
    try {
      fs.writeFileSync(path, data)
    } catch {
      return Scanner.WRITE_ERROR_MSG
    }
    return Scanner.WRITE_SUCCESS_MSG
  }

  private static exportHTML: ExportFunction = (path: string, data: string) => {
    return Scanner.WRITE_ERROR_MSG
  }

  private static exportVue: ExportFunction = (path: string, data: string) => {
    return Scanner.WRITE_ERROR_MSG
  }

  private static scanner: { [type: string]: ScanFunction } = {
    css: Scanner.scanCSS, html: Scanner.scanHTML, vue: Scanner.scanVue,
  }

  private static exporter: { [type: string]: ExportFunction } = {
    css: Scanner.exportPlain, html: Scanner.exportHTML, vue: Scanner.exportVue,
  }

  static scanFile(inputPath: string) {
    const type = inputPath.split('.').pop()
    return type && type in Scanner.scanner ? Scanner.scanner[type](inputPath) : Scanner.BAD_EXTENSION_MSG
  }

  static exportFile(outputPath: string, data: string) {
    const type = outputPath.split('.').pop()
    return type && type in Scanner.exporter ? Scanner.exporter[type](outputPath, data) : Scanner.exportPlain(outputPath, data)
  }
}