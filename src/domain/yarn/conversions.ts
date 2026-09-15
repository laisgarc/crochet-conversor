import type { Range } from './types'

function assertPositiveFinite(value: number, message: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(message)
  }
}

export function metersPer100gToTex(metersPer100g: number): number {
  assertPositiveFinite(
    metersPer100g,
    'Metros por 100 g deve ser maior que zero.',
  )

  return 100_000 / metersPer100g
}

export function texToMetersPer100g(tex: number): number {
  assertPositiveFinite(tex, 'TEX deve ser maior que zero.')

  return 100_000 / tex
}

export function getTexRangeFromMetersRange(metersRange: Range): Range {
  const { min, max } = metersRange

  if (
    min === null ||
    !Number.isFinite(min) ||
    min < 0 ||
    (max !== null &&
      (!Number.isFinite(max) || max <= 0 || max <= min))
  ) {
    throw new Error('Faixa de metros por 100 g inválida.')
  }

  return {
    min: max === null ? null : metersPer100gToTex(max),
    max: min === 0 ? null : metersPer100gToTex(min),
  }
}

export function yarnLabelToTex(
  weightGrams: number,
  lengthMeters: number,
): number {
  assertPositiveFinite(weightGrams, 'O peso deve ser maior que zero.')
  assertPositiveFinite(lengthMeters, 'A metragem deve ser maior que zero.')

  return (weightGrams * 1_000) / lengthMeters
}

export function yarnLabelToMetersPer100g(
  weightGrams: number,
  lengthMeters: number,
): number {
  assertPositiveFinite(weightGrams, 'O peso deve ser maior que zero.')
  assertPositiveFinite(lengthMeters, 'A metragem deve ser maior que zero.')

  return (lengthMeters / weightGrams) * 100
}
