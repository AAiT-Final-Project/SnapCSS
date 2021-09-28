import * as fs from 'fs'

type ScanFunction = (path: string) => string;
type ExportFunction = (path: string, data: string) => string
const betweenStyle = /(?<=(<style[\s\w="']*>))((.|\n)*?)(?=(<\/style[w=]*>))/

export default class Scanner {
  static BAD_EXTENSION_MSG = 'FileError: File type is not supported. Use (.css, .html, .vue)'

  static READ_ERROR_MSG = 'FileError: Could not load from File'

  static WRITE_SUCCESS_MSG = 'Successfully written into File'

  static WRITE_ERROR_MSG = 'FileError: Could not write into File'

  private static scanCSS: ScanFunction = (path: string) => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch {
      return Scanner.READ_ERROR_MSG
    }
  }

  private static scanXML: ScanFunction = (path: string) => {
    const file = fs.readFileSync(path, 'utf8')
    let css = ''
    let m
    let start = 0
    do {
      m = betweenStyle.exec(file.slice(start))
      if (m) {
        css += m[0]
        start += m.index
      }
    } while (m)
    css = css.trim()
    return css === '' ? Scanner.READ_ERROR_MSG : css
  }

  private static exportPlain: ExportFunction = (path: string, data: string) => {
    try {
      fs.writeFileSync(path, data)
    } catch {
      return Scanner.WRITE_ERROR_MSG
    }
    return Scanner.WRITE_SUCCESS_MSG
  }

  private static exportVue: ExportFunction = (path: string, data: string) => {
    let file = ''
    try {
      file = fs.readFileSync(path, 'utf8')
    } catch {
      return Scanner.exportPlain(path + '.css', data)
    }
    const m = betweenStyle.exec(file)
    if (m) file = file.replace(m[0], data)
    else file += `\n<style scoped>\n${data}\n</style>\n`
    try {
      fs.writeFileSync(path, file)
    } catch {
      return Scanner.WRITE_ERROR_MSG
    }
    return Scanner.WRITE_SUCCESS_MSG
  }

  private static exportXML: ExportFunction = (path: string, data: string) => {
    let file = ''
    try {
      file = fs.readFileSync(path, 'utf8')
    } catch {
      return Scanner.exportPlain(path + '.css', data)
    }
    const m = betweenStyle.exec(file)
    if (m) file = file.replace(m[0], data)
    else {
      const ind = file.indexOf('</head>')
      if (ind > -1) file = `${file.slice(0, ind)}\n<style>\n${data}\n</style>\n${file.slice(ind)}`
      else return Scanner.WRITE_ERROR_MSG
    }
    try {
      fs.writeFileSync(path, file)
    } catch {
      return Scanner.WRITE_ERROR_MSG
    }
    return Scanner.WRITE_SUCCESS_MSG
  }

  private static scanner: { [type: string]: ScanFunction } = {
    css: Scanner.scanCSS, html: Scanner.scanXML, php: Scanner.scanXML, vue: Scanner.scanXML, jsx: Scanner.scanXML,
  }

  private static exporter: { [type: string]: ExportFunction } = {
    css: Scanner.exportPlain, html: Scanner.exportXML, php: Scanner.exportXML, jsx: Scanner.exportXML, vue: Scanner.exportVue,
  }

  static scanFile(inputPath: string) {
    const type = inputPath.split('.').pop()
    return type && Scanner.scanner[type] ? Scanner.scanner[type](inputPath) : Scanner.BAD_EXTENSION_MSG
  }

  static exportFile(outputPath: string, data: string) {
    const type = outputPath.split('.').pop()
    return type && Scanner.exporter[type] ? Scanner.exporter[type](outputPath, data) : Scanner.exportPlain(outputPath, data)
  }
}
