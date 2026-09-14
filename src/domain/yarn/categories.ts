import type { YarnCategory } from './types'

/**
 * Faixas preliminares do MVP.
 * Elas servem como heurística de produto e ainda precisam ser calibradas
 * com fontes técnicas e testes com fios brasileiros reais antes do lançamento.
 */
export const yarnCategories: YarnCategory[] = [
  { cyc: 0, name: 'Lace', aliases: ['Lace'], minMetersPer100g: 600, maxMetersPer100g: Number.POSITIVE_INFINITY },
  { cyc: 1, name: 'Fingering', aliases: ['Sock', 'Super Fine'], minMetersPer100g: 420, maxMetersPer100g: 599.999 },
  { cyc: 2, name: 'Sport', aliases: ['Baby', 'Fine'], minMetersPer100g: 260, maxMetersPer100g: 419.999 },
  { cyc: 3, name: 'DK', aliases: ['Light', 'Light Worsted'], minMetersPer100g: 210, maxMetersPer100g: 259.999 },
  { cyc: 4, name: 'Worsted', aliases: ['Aran', 'Medium'], minMetersPer100g: 130, maxMetersPer100g: 209.999 },
  { cyc: 5, name: 'Bulky', aliases: ['Chunky'], minMetersPer100g: 90, maxMetersPer100g: 129.999 },
  { cyc: 6, name: 'Super Bulky', aliases: ['Super Chunky'], minMetersPer100g: 40, maxMetersPer100g: 89.999 },
  { cyc: 7, name: 'Jumbo', aliases: ['Jumbo'], minMetersPer100g: 0, maxMetersPer100g: 39.999 },
]
