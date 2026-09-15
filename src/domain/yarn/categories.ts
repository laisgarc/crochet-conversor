import type { YarnCategory } from './types'

/**
 * Fonte única de categorias, em ordem do fio mais fino para o mais grosso.
 *
 * `standard` reúne dados externos padronizados pelo CYC. `projectEstimates`
 * reúne as aproximações operacionais do Crochê Conversor. O CYC não define
 * faixas de m/100 g ou TEX; TEX é sempre derivado da faixa de m/100 g.
 */
export const yarnCategories = [
  {
    id: 'lace',
    standard: {
      cycNumber: 0,
      standardName: 'Lace',
      displayName: 'Lace',
      aliases: [],
      crochet: {
        hooks: [
          { type: 'steel', minMm: 1.4, maxMm: 1.6 },
          { type: 'regular', minMm: 2.25, maxMm: 2.25 },
        ],
      },
    },
    projectEstimates: { metersPer100g: { min: 600, max: null } },
  },
  {
    id: 'super-fine',
    standard: {
      cycNumber: 1,
      standardName: 'Super Fine',
      displayName: 'Fingering / Sock',
      aliases: ['Fingering', 'Sock'],
      crochet: {
        hooks: [{ type: 'regular', minMm: 2.25, maxMm: 3.5 }],
      },
    },
    projectEstimates: { metersPer100g: { min: 360, max: 600 } },
  },
  {
    id: 'fine',
    standard: {
      cycNumber: 2,
      standardName: 'Fine',
      displayName: 'Sport / Baby',
      aliases: ['Sport', 'Baby'],
      crochet: {
        hooks: [{ type: 'regular', minMm: 3.5, maxMm: 4.5 }],
      },
    },
    projectEstimates: { metersPer100g: { min: 280, max: 360 } },
  },
  {
    id: 'light',
    standard: {
      cycNumber: 3,
      standardName: 'Light',
      displayName: 'DK / Light',
      aliases: ['DK', 'Light Worsted'],
      crochet: {
        hooks: [{ type: 'regular', minMm: 4.5, maxMm: 5.5 }],
      },
    },
    projectEstimates: { metersPer100g: { min: 200, max: 280 } },
  },
  {
    id: 'medium',
    standard: {
      cycNumber: 4,
      standardName: 'Medium',
      displayName: 'Worsted / Aran / Medium',
      aliases: ['Worsted', 'Aran', 'Afghan'],
      crochet: {
        hooks: [{ type: 'regular', minMm: 5.5, maxMm: 6.5 }],
      },
    },
    projectEstimates: { metersPer100g: { min: 140, max: 200 } },
  },
  {
    id: 'bulky',
    standard: {
      cycNumber: 5,
      standardName: 'Bulky',
      displayName: 'Bulky / Chunky',
      aliases: ['Chunky', 'Craft', 'Rug'],
      crochet: {
        hooks: [{ type: 'regular', minMm: 6.5, maxMm: 9 }],
      },
    },
    projectEstimates: { metersPer100g: { min: 100, max: 140 } },
  },
  {
    id: 'super-bulky',
    standard: {
      cycNumber: 6,
      standardName: 'Super Bulky',
      displayName: 'Super Bulky',
      aliases: ['Super Chunky', 'Roving'],
      crochet: {
        hooks: [{ type: 'regular', minMm: 9, maxMm: 15 }],
      },
    },
    projectEstimates: { metersPer100g: { min: 40, max: 100 } },
  },
  {
    id: 'jumbo',
    standard: {
      cycNumber: 7,
      standardName: 'Jumbo',
      displayName: 'Jumbo',
      aliases: ['Roving'],
      crochet: {
        hooks: [{ type: 'regular', minMm: 15, maxMm: null }],
      },
    },
    projectEstimates: { metersPer100g: { min: 0, max: 40 } },
  },
] as const satisfies readonly YarnCategory[]

/** Aproximação própria do produto, não publicada pelo CYC. */
export const transitionMarginRatio = 0.05
