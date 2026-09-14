import { describe, expect, it } from 'vitest'
import {
  resultFromLabel,
  resultFromTex,
  texToMetersPer100g,
  yarnLabelToTex,
} from './converters'

describe('conversões de fio', () => {
  it('converte TEX 400 em 250 m/100 g', () => {
    expect(texToMetersPer100g(400)).toBe(250)
  })

  it('calcula TEX 400 para um novelo de 100 g e 250 m', () => {
    expect(yarnLabelToTex(100, 250)).toBe(400)
  })

  it('classifica TEX 400 como DK na tabela preliminar', () => {
    expect(resultFromTex(400).category.name).toBe('DK')
  })

  it('gera o mesmo resultado usando peso e metragem equivalentes', () => {
    const result = resultFromLabel(100, 250)
    expect(result.tex).toBe(400)
    expect(result.metersPer100g).toBe(250)
    expect(result.category.name).toBe('DK')
  })
})
