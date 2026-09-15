import { describe, expect, it } from 'vitest'
import { yarnCategories } from './categories'
import {
  categoryToApproximateRange,
  classifyYarn,
  findYarnCategories,
  findYarnCategory,
  getTexRangeFromMetersRange,
  metersPer100gToTex,
  resultFromLabel,
  resultFromTex,
  texToMetersPer100g,
  yarnLabelToMetersPer100g,
  yarnLabelToTex,
} from './converters'
import type { YarnCategoryId } from './types'

describe('conversões básicas', () => {
  it('converte TEX e metros por 100 g nos dois sentidos', () => {
    expect(texToMetersPer100g(400)).toBe(250)
    expect(metersPer100gToTex(250)).toBe(400)
    expect(metersPer100gToTex(texToMetersPer100g(378))).toBeCloseTo(378)
  })

  it('normaliza peso e metragem da etiqueta', () => {
    expect(yarnLabelToTex(100, 250)).toBe(400)
    expect(yarnLabelToMetersPer100g(50, 125)).toBe(250)
  })

  it.each([
    ['tex', () => texToMetersPer100g(0)],
    ['metros por 100 g', () => metersPer100gToTex(Number.NaN)],
    ['peso', () => yarnLabelToTex(-1, 100)],
    ['metragem', () => yarnLabelToMetersPer100g(100, Number.POSITIVE_INFINITY)],
  ])('rejeita %s inválido', (_field, conversion) => {
    expect(conversion).toThrow()
  })
})

describe('fonte única das categorias', () => {
  it('usa os nomes padronizados CYC 0–7 em ordem', () => {
    expect(
      yarnCategories.map(({ standard }) => [
        standard.cycNumber,
        standard.standardName,
      ]),
    ).toEqual([
      [0, 'Lace'],
      [1, 'Super Fine'],
      [2, 'Fine'],
      [3, 'Light'],
      [4, 'Medium'],
      [5, 'Bulky'],
      [6, 'Super Bulky'],
      [7, 'Jumbo'],
    ])
  })

  it.each([
    ['Lace', 'lace'],
    ['fingering', 'super-fine'],
    [' SOCK ', 'super-fine'],
    ['Baby', 'fine'],
    ['DK', 'light'],
    ['Light Worsted', 'light'],
    ['Worsted', 'medium'],
    ['Aran', 'medium'],
    ['Chunky', 'bulky'],
    ['Super Chunky', 'super-bulky'],
    ['Jumbo', 'jumbo'],
  ] as const)('resolve o nome ou alias %s', (alias, categoryId) => {
    expect(findYarnCategory(alias)?.id).toBe(categoryId)
  })

  it('preserva o alias Roving compartilhado pelas categorias CYC 6 e 7', () => {
    expect(findYarnCategories('Roving').map(({ id }) => id)).toEqual([
      'super-bulky',
      'jumbo',
    ])
  })

  it('mantém as recomendações de agulha junto dos dados CYC', () => {
    expect(
      yarnCategories.map(({ standard }) => standard.crochet.hooks),
    ).toEqual([
      [
        { type: 'steel', minMm: 1.4, maxMm: 1.6 },
        { type: 'regular', minMm: 2.25, maxMm: 2.25 },
      ],
      [{ type: 'regular', minMm: 2.25, maxMm: 3.5 }],
      [{ type: 'regular', minMm: 3.5, maxMm: 4.5 }],
      [{ type: 'regular', minMm: 4.5, maxMm: 5.5 }],
      [{ type: 'regular', minMm: 5.5, maxMm: 6.5 }],
      [{ type: 'regular', minMm: 6.5, maxMm: 9 }],
      [{ type: 'regular', minMm: 9, maxMm: 15 }],
      [{ type: 'regular', minMm: 15, maxMm: null }],
    ])
  })
})

describe('faixas derivadas', () => {
  it.each(yarnCategories)(
    'deriva a faixa TEX de $standard.displayName invertendo os limites em metros',
    (category) => {
      const metersRange = category.projectEstimates.metersPer100g
      const result = categoryToApproximateRange(category.id)

      expect(result.metersPer100g).toBe(metersRange)
      expect(result.tex.min).toBe(
        metersRange.max === null ? null : 100_000 / metersRange.max,
      )
      expect(result.tex.max).toBe(
        metersRange.min === 0 ? null : 100_000 / metersRange.min,
      )
    },
  )

  it('mantém os extremos abertos de Lace e Jumbo', () => {
    expect(categoryToApproximateRange('lace').tex).toEqual({
      min: null,
      max: 100_000 / 600,
    })
    expect(categoryToApproximateRange('jumbo').tex).toEqual({
      min: 100_000 / 40,
      max: null,
    })
  })

  it.each([
    { min: null, max: 100 },
    { min: -1, max: 100 },
    { min: 100, max: 100 },
    { min: 100, max: 90 },
  ])('rejeita a faixa inválida $min–$max', (range) => {
    expect(() => getTexRangeFromMetersRange(range)).toThrow(
      'Faixa de metros por 100 g inválida.',
    )
  })
})

describe('classificação e fluxos funcionais', () => {
  it('gera o mesmo resultado com TEX e etiqueta equivalentes', () => {
    const fromTex = resultFromTex(400)
    const fromLabel = resultFromLabel(100, 250)

    expect(fromTex.category.id).toBe('light')
    expect(fromLabel).toEqual(fromTex)
    expect(fromTex.category.standard.displayName).toBe('DK / Light')
  })

  it.each([
    [600, 'lace'],
    [599.99, 'super-fine'],
    [360, 'super-fine'],
    [359.99, 'fine'],
    [280, 'fine'],
    [279.99, 'light'],
    [200, 'light'],
    [199.99, 'medium'],
    [140, 'medium'],
    [139.99, 'bulky'],
    [100, 'bulky'],
    [99.99, 'super-bulky'],
    [40, 'super-bulky'],
    [39.99, 'jumbo'],
  ] as const)('classifica o limite %s em %s', (meters, categoryId) => {
    expect(classifyYarn(meters).id).toBe(categoryId)
  })

  it('sinaliza valores próximos de uma borda como transição', () => {
    expect(resultFromTex(100_000 / 205).transitionCategories.map(({ id }) => id)).toContain(
      'medium',
    )
  })

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejeita classificação inválida para %s',
    (meters) => {
      expect(() => classifyYarn(meters)).toThrow()
    },
  )

  it('rejeita uma categoria inexistente', () => {
    expect(() => categoryToApproximateRange('unknown' as YarnCategoryId)).toThrow(
      'Selecione uma categoria de fio.',
    )
  })
})
