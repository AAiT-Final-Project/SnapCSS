/* eslint-disable no-console */
import * as fs from 'fs'
const onnx = require('onnxjs-node')

export interface Vocab {
  [key: string]: number;
}

export default class Predictor {
  private session = new onnx.InferenceSession()

  private vocab: string[] = []

  public async loadModel(modelPath = './src/optimize/suggest/model/export.onnx', vocabPath = './src/optimize/suggest/model/css.vocab.txt') {
    await this.session.loadModel(modelPath)
    try {
      // read all vocabs here perhaps
      this.vocab = fs.readFileSync(vocabPath, 'utf8').split('\n')
    } catch {
      console.log('Could not Load Vocab')
    }
  }

  public async predict(rule: object) {
    const result: string[] = []
    const inputs = Predictor.makeData(rule)
    const outputMap = await this.session.run(inputs)
    const outputTensor = outputMap.get('output')
    for (let i = 0; i < outputTensor.dims[0]; i++) {
      let biggest = 0
      for (let j = 0; j < outputTensor.dims[1]; j++) {
        if (outputTensor.get(i, j) > outputTensor.get(i, biggest)) biggest = j
      }
      result.push(this.vocab[biggest])
    }
    return result
  }

  private static makeData(rule: object) {
    console.log(rule)
    return [
      ...Predictor.processDeclaration(
        {property: 'box-sizing', value: 'border-box', type: 'STRING', unit: '', important: false}
      ),
    ]
  }

  private static processDeclaration(declaration: object) {
    console.log(declaration)
    return [new onnx.Tensor([
      118,
      1,
      4,
      1,
      0,
      1,
      2,
      2,
      2,
      2,
      1,
      2,
      2,
      118,
      1,
      4,
      1,
      0,
      1,
      2,
      2,
      2,
      2,
      1,
      2,
      2,
    ], 'int32', [2, 13]),
    new onnx.Tensor([
      -0.031102027670426264,
      0.21374026464604506,
      0.16109764686327452,
      0.20809264031839608,
      -0.04633014672374937,
      -0.04301364571620888,
      -0.0017506370861001693,
      -0.031102027670426264,
      0.21374026464604506,
      0.16109764686327452,
      0.20809264031839608,
      -0.04633014672374937,
      -0.04301364571620888,
      -0.0017506370861001693,
    ], 'float32', [2, 7])]
  }
}
