export type YarnCategory = {
  cyc: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  name: string
  aliases: string[]
  minMetersPer100g: number
  maxMetersPer100g: number
}

export type YarnResult = {
  tex: number
  metersPer100g: number
  category: YarnCategory
}
