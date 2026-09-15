import type { YarnCategory } from './types'

/**
 * Faixas operacionais aproximadas do produto, em ordem do fio mais fino para
 * o mais grosso. O CYC padroniza nomes, números e gauge, mas não m/100 g ou TEX.
 * O critério e as fontes da heurística estão em docs/tabela-categorias.md.
 */
export const yarnCategories: YarnCategory[] = [
  { id: 'lace', cyc: 0, name: 'Lace', aliases: [], minMetersPer100g: 600, maxMetersPer100g: null },
  { id: 'fingering', cyc: 1, name: 'Fingering / Sock', aliases: ['Super Fine'], minMetersPer100g: 360, maxMetersPer100g: 600 },
  { id: 'sport', cyc: 2, name: 'Sport / Baby', aliases: ['Fine'], minMetersPer100g: 280, maxMetersPer100g: 360 },
  { id: 'dk', cyc: 3, name: 'DK / Light', aliases: ['Light Worsted'], minMetersPer100g: 200, maxMetersPer100g: 280 },
  { id: 'worsted', cyc: 4, name: 'Worsted / Aran / Medium', aliases: ['Afghan'], minMetersPer100g: 140, maxMetersPer100g: 200 },
  { id: 'bulky', cyc: 5, name: 'Bulky / Chunky', aliases: ['Craft', 'Rug'], minMetersPer100g: 100, maxMetersPer100g: 140 },
  { id: 'super-bulky', cyc: 6, name: 'Super Bulky', aliases: ['Super Chunky', 'Roving'], minMetersPer100g: 40, maxMetersPer100g: 100 },
  { id: 'jumbo', cyc: 7, name: 'Jumbo', aliases: ['Roving'], minMetersPer100g: 0, maxMetersPer100g: 40 },
]
