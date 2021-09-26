/* eslint-disable no-console */
import * as fs from 'fs'
import * as path from 'path'
import Rule from '../../../css/rule'
import Processor from './processor'
const onnx = require('onnxjs-node')

export interface Vocab {
  [key: string]: number;
}

export interface Dict {
  [key: string]: any[];
}

export default class Predictor {
  private session = new onnx.InferenceSession()

  private vocabs: Vocab[] = []

  private outputs: string[] = []

  public async loadModel(modelPath = 'suggester.onnx', vocabName = 'vocab.json') {
    await this.session.loadModel(path.join(__dirname, '..', 'model', modelPath))
    try {
      const vocabs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'model', vocabName), 'utf8')) as string[][]
      this.outputs = vocabs[vocabs.length - 1]
      vocabs.forEach(list => {
        this.vocabs.push({} as Vocab)
        list.forEach((word, i) => {
          this.vocabs[this.vocabs.length - 1][word] = i
        })
      })
    } catch {
      console.log('Could not Load Vocab')
    }
  }

  public async predict(rule: Rule) {
    if (rule.declarations.length <= 3) return []
    const result: string[] = []
    const inputs = this.makeData(rule)
    const outputMap = await this.session.run(inputs)
    const outputTensor = outputMap.get('output')
    for (let i = 0; i < outputTensor.dims[0]; i++) {
      let biggest = 0
      for (let j = 0; j < outputTensor.dims[1]; j++)
        if (outputTensor.get(i, j) > outputTensor.get(i, biggest)) biggest = j
      result.push(this.outputs[biggest])
    }
    return result
  }

  private makeData(rule: Rule) {
    let rows = Processor.processRule(rule)
    for (let i = 0; i < 6; i++) Processor.categorize(rows, i, this.vocabs[i])
    rows = Processor.fillMissing(rows)

    const cat: number[] = []
    const cont: number[] = []
    rows.forEach(row => {
      cat.push(...row.slice(0, 14))
      cont.push(...row.slice(14))
    })
    return [
      ...Predictor.makeTensor(cat, cont, rows.length),
    ]
  }

  private static makeTensor(cat: number[], cont: number[], length: number) {
    return [new onnx.Tensor(cat, 'int32', [length, 14]),
      new onnx.Tensor(cont, 'float32', [length, 8])]
  }
}
