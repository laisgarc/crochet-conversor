import { describe, expect, it } from 'vitest'
import {
  categoryToApproximateRange,
  classifyYarn,
  resultFromLabel,
  resultFromTex,
  texToMetersPer100g,
  yarnLabelToTex,
} from './converters'
import { yarnCategories } from './categories'

describe('conversões de fio', () => {
  it('converte TEX 400 em 250 m/100 g', () => {
    expect(texToMetersPer100g(400)).toBe(250)
  })

  it('calcula TEX 400 para um novelo de 100 g e 250 m', () => {
    expect(yarnLabelToTex(100, 250)).toBe(400)
  })

  it('classifica TEX 400 como DK / Light', () => {
    expect(resultFromTex(400).category.name).toBe('DK / Light')
  })

  it('gera o mesmo resultado usando peso e metragem equivalentes', () => {
    const result = resultFromLabel(100, 250)
    expect(result.tex).toBe(400)
    expect(result.metersPer100g).toBe(250)
    expect(result.category.name).toBe('DK / Light')
  })

  it('sinaliza um valor próximo ao limite como zona de transição', () => {
    const result = resultFromTex(100_000 / 205)

    expect(result.category.id).toBe('dk')
    expect(result.transitionCategories.map(({ id }) => id)).toContain('worsted')
  })
})

describe('categoria internacional para faixa aproximada', () => {
  it('converte DK / Light em faixas de m/100 g e TEX', () => {
    const result = categoryToApproximateRange('dk')

    expect(result.category.cyc).toBe(3)
    expect(result.metersPer100g).toEqual({ min: 200, max: 280 })
    expect(result.tex.min).toBeCloseTo(357.14, 2)
    expect(result.tex.max).toBe(500)
    expect(result.category.crochetHooks).toEqual([{ minMm: 4.5, maxMm: 5.5 }])
    expect(result.transitionCategories.map(({ id }) => id)).toEqual([
      'sport',
      'worsted',
    ])
  })

  it('mantém o limite fino de Lace aberto', () => {
    const result = categoryToApproximateRange('lace')

    expect(result.metersPer100g).toEqual({ min: 600, max: null })
    expect(result.tex.min).toBeNull()
    expect(result.tex.max).toBeCloseTo(166.67, 2)
  })

  it('mantém o limite grosso de Jumbo aberto', () => {
    const result = categoryToApproximateRange('jumbo')

    expect(result.metersPer100g).toEqual({ min: 0, max: 40 })
    expect(result.tex.min).toBe(2500)
    expect(result.tex.max).toBeNull()
  })

  it.each([
    ['fingering', 166.67, 277.78],
    ['sport', 277.78, 357.14],
    ['dk', 357.14, 500],
    ['worsted', 500, 714.29],
    ['bulky', 714.29, 1000],
    ['super-bulky', 1000, 2500],
  ] as const)('calcula a faixa TEX de %s pela mesma fonte de dados', (categoryId, minTex, maxTex) => {
    const result = categoryToApproximateRange(categoryId)

    expect(result.tex.min).toBeCloseTo(minTex, 2)
    expect(result.tex.max).toBeCloseTo(maxTex, 2)
  })

  it('mantém as recomendações de agulha CYC junto de todas as categorias', () => {
    expect(
      yarnCategories.map(({ id, crochetHooks }) => [id, crochetHooks]),
    ).toEqual([
      [
        'lace',
        [
          { label: 'aço', minMm: 1.4, maxMm: 1.6 },
          { label: 'comum', minMm: 2.25, maxMm: 2.25 },
        ],
      ],
      ['fingering', [{ minMm: 2.25, maxMm: 3.5 }]],
      ['sport', [{ minMm: 3.5, maxMm: 4.5 }]],
      ['dk', [{ minMm: 4.5, maxMm: 5.5 }]],
      ['worsted', [{ minMm: 5.5, maxMm: 6.5 }]],
      ['bulky', [{ minMm: 6.5, maxMm: 9 }]],
      ['super-bulky', [{ minMm: 9, maxMm: 15 }]],
      ['jumbo', [{ minMm: 15, maxMm: null }]],
    ])
  })

  it.each(yarnCategories)('reutiliza a faixa de $name na classificação direta', (category) => {
    const representativeMeters =
      category.maxMetersPer100g === null
        ? category.minMetersPer100g * 1.25
        : category.minMetersPer100g === 0
          ? category.maxMetersPer100g / 2
          : (category.minMetersPer100g + category.maxMetersPer100g) / 2

    expect(classifyYarn(representativeMeters).id).toBe(category.id)
  })
})
