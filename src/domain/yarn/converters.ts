import { yarnCategories } from './categories'
import type { YarnCategory, YarnResult } from './types'

export function texToMetersPer100g(tex: number): number {
  if (!Number.isFinite(tex) || tex <= 0) {
    throw new Error('TEX deve ser maior que zero.')
  }

  return 100_000 / tex
}

export function yarnLabelToTex(weightGrams: number, lengthMeters: number): number {
  if (!Number.isFinite(weightGrams) || weightGrams <= 0) {
    throw new Error('O peso deve ser maior que zero.')
  }

  if (!Number.isFinite(lengthMeters) || lengthMeters <= 0) {
    throw new Error('A metragem deve ser maior que zero.')
  }

  return (weightGrams * 1_000) / lengthMeters
}

export function yarnLabelToMetersPer100g(weightGrams: number, lengthMeters: number): number {
  return (lengthMeters / weightGrams) * 100
}

export function classifyYarn(metersPer100g: number): YarnCategory {
  const category = yarnCategories.find(
    ({ minMetersPer100g, maxMetersPer100g }) =>
      metersPer100g >= minMetersPer100g && metersPer100g <= maxMetersPer100g,
  )

  if (!category) {
    throw new Error('Não foi possível classificar o fio.')
  }

  return category
}

export function resultFromTex(tex: number): YarnResult {
  const metersPer100g = texToMetersPer100g(tex)

  return {
    tex,
    metersPer100g,
    category: classifyYarn(metersPer100g),
  }
}

export function resultFromLabel(weightGrams: number, lengthMeters: number): YarnResult {
  const tex = yarnLabelToTex(weightGrams, lengthMeters)
  const metersPer100g = yarnLabelToMetersPer100g(weightGrams, lengthMeters)

  return {
    tex,
    metersPer100g,
    category: classifyYarn(metersPer100g),
  }
}
