import {
  adjacentCategories,
  classifyYarn,
  getYarnCategory,
  transitionCategoriesForMeters,
} from './classification'
import {
  getTexRangeFromMetersRange,
  texToMetersPer100g,
  yarnLabelToMetersPer100g,
  yarnLabelToTex,
} from './conversions'
import type {
  YarnCategoryId,
  YarnCategoryRangeResult,
  YarnResult,
} from './types'

export {
  classifyYarn,
  findYarnCategory,
  findYarnCategories,
  getYarnCategory,
} from './classification'
export {
  getTexRangeFromMetersRange,
  metersPer100gToTex,
  texToMetersPer100g,
  yarnLabelToMetersPer100g,
  yarnLabelToTex,
} from './conversions'

export function categoryToApproximateRange(
  categoryId: YarnCategoryId,
): YarnCategoryRangeResult {
  const category = getYarnCategory(categoryId)
  const metersPer100g = category.projectEstimates.metersPer100g

  return {
    category,
    metersPer100g,
    tex: getTexRangeFromMetersRange(metersPer100g),
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

export function resultFromLabel(
  weightGrams: number,
  lengthMeters: number,
): YarnResult {
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
