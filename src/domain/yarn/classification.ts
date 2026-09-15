import { transitionMarginRatio, yarnCategories } from './categories'
import type { YarnCategory, YarnCategoryId } from './types'

function normalizeLookupValue(value: string) {
  return value.trim().toLocaleLowerCase('en-US').replace(/\s+/g, ' ')
}

export function findYarnCategories(value: string): readonly YarnCategory[] {
  const normalizedValue = normalizeLookupValue(value)

  if (!normalizedValue) {
    return []
  }

  return yarnCategories.filter((category) => {
    const names = [
      category.id,
      category.standard.standardName,
      category.standard.displayName,
      ...category.standard.aliases,
    ]

    return names.some((name) => normalizeLookupValue(name) === normalizedValue)
  })
}

export function findYarnCategory(value: string): YarnCategory | undefined {
  return findYarnCategories(value)[0]
}

export function getYarnCategory(categoryId: YarnCategoryId): YarnCategory {
  const category = yarnCategories.find(({ id }) => id === categoryId)

  if (!category) {
    throw new Error('Selecione uma categoria de fio.')
  }

  return category
}

export function classifyYarn(metersPer100g: number): YarnCategory {
  if (!Number.isFinite(metersPer100g) || metersPer100g <= 0) {
    throw new Error('Metros por 100 g deve ser maior que zero.')
  }

  const category = yarnCategories.find(({ projectEstimates }) => {
    const { min, max } = projectEstimates.metersPer100g

    return metersPer100g >= (min ?? 0) && (max === null || metersPer100g < max)
  })

  if (!category) {
    throw new Error('Não foi possível classificar o fio.')
  }

  return category
}

export function adjacentCategories(
  category: YarnCategory,
): readonly YarnCategory[] {
  const categoryIndex = yarnCategories.findIndex(({ id }) => id === category.id)
  const neighbors: YarnCategory[] = []
  const previousCategory: YarnCategory | undefined = yarnCategories[categoryIndex - 1]
  const nextCategory: YarnCategory | undefined = yarnCategories[categoryIndex + 1]

  if (previousCategory) neighbors.push(previousCategory)
  if (nextCategory) neighbors.push(nextCategory)

  return neighbors
}

export function transitionCategoriesForMeters(
  metersPer100g: number,
  category: YarnCategory,
): readonly YarnCategory[] {
  return adjacentCategories(category).filter((neighbor) => {
    const categoryRange = category.projectEstimates.metersPer100g
    const neighborRange = neighbor.projectEstimates.metersPer100g
    const sharedBoundary =
      neighborRange.min === categoryRange.max
        ? neighborRange.min
        : categoryRange.min

    return (
      sharedBoundary !== null &&
      sharedBoundary > 0 &&
      Math.abs(metersPer100g - sharedBoundary) / sharedBoundary <=
        transitionMarginRatio
    )
  })
}
