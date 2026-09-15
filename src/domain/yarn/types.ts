export type YarnCategoryId =
  | 'lace'
  | 'super-fine'
  | 'fine'
  | 'light'
  | 'medium'
  | 'bulky'
  | 'super-bulky'
  | 'jumbo'

export type CycNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type Range = Readonly<{
  min: number | null
  max: number | null
}>

export type HookRecommendation = Readonly<{
  type: 'steel' | 'regular'
  minMm: number
  maxMm: number | null
}>

export type CycCategoryStandard = Readonly<{
  cycNumber: CycNumber
  standardName: string
  displayName: string
  aliases: readonly string[]
  crochet: Readonly<{
    hooks: readonly HookRecommendation[]
    gaugeStitchesPer10cm?: Range
  }>
}>

export type YarnCategory = Readonly<{
  id: YarnCategoryId
  standard: CycCategoryStandard
  projectEstimates: Readonly<{
    metersPer100g: Range
  }>
}>

export type YarnResult = Readonly<{
  tex: number
  metersPer100g: number
  category: YarnCategory
  transitionCategories: readonly YarnCategory[]
}>

export type YarnCategoryRangeResult = Readonly<{
  category: YarnCategory
  metersPer100g: Range
  tex: Range
  transitionCategories: readonly YarnCategory[]
}>
