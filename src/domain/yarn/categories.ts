import type { YarnCategory } from './types'

/**
 * Faixas operacionais aproximadas do produto, em ordem do fio mais fino para
 * o mais grosso. O CYC padroniza nomes, números e gauge, mas não m/100 g ou TEX.
 * O critério e as fontes da heurística estão em docs/tabela-categorias.md.
 */
export const yarnCategories: YarnCategory[] = [
  {
    id: 'lace',
    cyc: 0,
    name: 'Lace',
    aliases: [],
    minMetersPer100g: 600,
    maxMetersPer100g: null,
    crochetHooks: [
      { label: 'aço', minMm: 1.4, maxMm: 1.6 },
      { label: 'comum', minMm: 2.25, maxMm: 2.25 },
    ],
  },
  {
    id: 'fingering',
    cyc: 1,
    name: 'Fingering / Sock',
    aliases: ['Super Fine'],
    minMetersPer100g: 360,
    maxMetersPer100g: 600,
    crochetHooks: [{ minMm: 2.25, maxMm: 3.5 }],
  },
  {
    id: 'sport',
    cyc: 2,
    name: 'Sport / Baby',
    aliases: ['Fine'],
    minMetersPer100g: 280,
    maxMetersPer100g: 360,
    crochetHooks: [{ minMm: 3.5, maxMm: 4.5 }],
  },
  {
    id: 'dk',
    cyc: 3,
    name: 'DK / Light',
    aliases: ['Light Worsted'],
    minMetersPer100g: 200,
    maxMetersPer100g: 280,
    crochetHooks: [{ minMm: 4.5, maxMm: 5.5 }],
  },
  {
    id: 'worsted',
    cyc: 4,
    name: 'Worsted / Aran / Medium',
    aliases: ['Afghan'],
    minMetersPer100g: 140,
    maxMetersPer100g: 200,
    crochetHooks: [{ minMm: 5.5, maxMm: 6.5 }],
  },
  {
    id: 'bulky',
    cyc: 5,
    name: 'Bulky / Chunky',
    aliases: ['Craft', 'Rug'],
    minMetersPer100g: 100,
    maxMetersPer100g: 140,
    crochetHooks: [{ minMm: 6.5, maxMm: 9 }],
  },
  {
    id: 'super-bulky',
    cyc: 6,
    name: 'Super Bulky',
    aliases: ['Super Chunky', 'Roving'],
    minMetersPer100g: 40,
    maxMetersPer100g: 100,
    crochetHooks: [{ minMm: 9, maxMm: 15 }],
  },
  {
    id: 'jumbo',
    cyc: 7,
    name: 'Jumbo',
    aliases: ['Roving'],
    minMetersPer100g: 0,
    maxMetersPer100g: 40,
    crochetHooks: [{ minMm: 15, maxMm: null }],
  },
]
