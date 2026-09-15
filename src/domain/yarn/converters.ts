import { yarnCategories } from './categories'
import type {
  ApproximateRange,
  YarnCategory,
  YarnCategoryId,
  YarnCategoryRangeResult,
  YarnResult,
} from './types'

const TRANSITION_MARGIN = 0.05

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
  if (!Number.isFinite(metersPer100g) || metersPer100g <= 0) {
    throw new Error('Metros por 100 g deve ser maior que zero.')
  }

  const category = yarnCategories.find(
    ({ minMetersPer100g, maxMetersPer100g }) =>
      metersPer100g >= minMetersPer100g &&
      (maxMetersPer100g === null || metersPer100g < maxMetersPer100g),
  )

  if (!category) {
    throw new Error('Não foi possível classificar o fio.')
  }

  return category
}

function adjacentCategories(category: YarnCategory): YarnCategory[] {
  const categoryIndex = yarnCategories.findIndex(({ id }) => id === category.id)

  return [yarnCategories[categoryIndex - 1], yarnCategories[categoryIndex + 1]].filter(
    (neighbor): neighbor is YarnCategory => Boolean(neighbor),
  )
}

function transitionCategoriesForMeters(
  metersPer100g: number,
  category: YarnCategory,
): YarnCategory[] {
  return adjacentCategories(category).filter((neighbor) => {
    const sharedBoundary =
      neighbor.minMetersPer100g === category.maxMetersPer100g
        ? neighbor.minMetersPer100g
        : category.minMetersPer100g

    return (
      sharedBoundary > 0 &&
      Math.abs(metersPer100g - sharedBoundary) / sharedBoundary <= TRANSITION_MARGIN
    )
  })
}

function texRangeFromCategory(category: YarnCategory): ApproximateRange {
  return {
    min:
      category.maxMetersPer100g === null
        ? null
        : 100_000 / category.maxMetersPer100g,
    max:
      category.minMetersPer100g === 0
        ? null
        : 100_000 / category.minMetersPer100g,
  }
}

export function categoryToApproximateRange(
  categoryId: YarnCategoryId,
): YarnCategoryRangeResult {
  const category = yarnCategories.find(({ id }) => id === categoryId)

  if (!category) {
    throw new Error('Selecione uma categoria de fio.')
  }

  return {
    category,
    metersPer100g: {
      min: category.minMetersPer100g,
      max: category.maxMetersPer100g,
    },
    tex: texRangeFromCategory(category),
    transitionCategories: adjacentCategories(category),
  }
}

export function resultFromTex(tex: number): YarnResult {
  const metersPer100g = texToMetersPer100g(tex)
  const category = classifyYarn(metersPer100g)

  return {
    tex,
    metersPer100g,
    category,
    transitionCategories: transitionCategoriesForMeters(metersPer100g, category),
  }
}

export function resultFromLabel(weightGrams: number, lengthMeters: number): YarnResult {
  const tex = yarnLabelToTex(weightGrams, lengthMeters)
  const metersPer100g = yarnLabelToMetersPer100g(weightGrams, lengthMeters)
  const category = classifyYarn(metersPer100g)

  return {
    tex,
    metersPer100g,
    category,
    transitionCategories: transitionCategoriesForMeters(metersPer100g, category),
  }
}
