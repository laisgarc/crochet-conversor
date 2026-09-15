export type YarnCategoryId =
  | 'lace'
  | 'fingering'
  | 'sport'
  | 'dk'
  | 'worsted'
  | 'bulky'
  | 'super-bulky'
  | 'jumbo'

export type CrochetHookRecommendation = {
  label?: 'aço' | 'comum'
  minMm: number
  maxMm: number | null
}

export type YarnCategory = {
  id: YarnCategoryId
  cyc: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  name: string
  aliases: string[]
  minMetersPer100g: number
  maxMetersPer100g: number | null
  crochetHooks: CrochetHookRecommendation[]
}

export type YarnResult = {
  tex: number
  metersPer100g: number
  category: YarnCategory
  transitionCategories: YarnCategory[]
}

export type ApproximateRange = {
  min: number | null
  max: number | null
}

export type YarnCategoryRangeResult = {
  category: YarnCategory
  metersPer100g: ApproximateRange
  tex: ApproximateRange
  transitionCategories: YarnCategory[]
}
