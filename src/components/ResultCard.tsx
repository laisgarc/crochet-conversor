import type {
  ApproximateRange,
  CrochetHookRecommendation,
  YarnCategory,
  YarnCategoryRangeResult,
  YarnResult,
} from '../domain/yarn/types'

type ResultCardProps =
  | { result: YarnResult; categoryRange?: never }
  | { result?: never; categoryRange: YarnCategoryRangeResult }

const resultCardClass =
  'rounded-[2rem] border-2 border-brand-charcoal bg-brand-green p-6 shadow-[6px_6px_0_0_#2D2D2D] sm:p-8'

const decimalFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
})

function categoryList(categories: YarnCategory[]) {
  return categories.map(({ name }) => name).join(' ou ')
}

function formatRange(range: ApproximateRange) {
  if (range.min === null || range.min === 0) {
    return `até ${Math.round(range.max ?? 0)}`
  }

  if (range.max === null) {
    return `${Math.round(range.min)} ou mais`
  }

  return `${Math.round(range.min)}–${Math.round(range.max)}`
}

function formatHookRange(recommendation: CrochetHookRecommendation) {
  const prefix = recommendation.label ? `${recommendation.label} ` : ''

  if (recommendation.maxMm === null) {
    return `${prefix}${decimalFormatter.format(recommendation.minMm)} mm ou mais`
  }

  if (recommendation.minMm === recommendation.maxMm) {
    return `${prefix}${decimalFormatter.format(recommendation.minMm)} mm`
  }

  return `${prefix}${decimalFormatter.format(recommendation.minMm)}–${decimalFormatter.format(recommendation.maxMm)} mm`
}

function HookRecommendation({ category }: { category: YarnCategory }) {
  return (
    <div className="rounded-2xl bg-brand-peach p-4 sm:col-span-2">
      <dt className="text-sm font-bold">Agulha de crochê indicada</dt>
      <dd className="mt-1 text-xl font-black">
        {category.crochetHooks.map(formatHookRange).join(' ou ')}
      </dd>
      <dd className="mt-1 text-sm">Referência CYC; ajuste para alcançar o gauge da receita.</dd>
    </div>
  )
}

function EstimateNotice() {
  return (
    <p className="mt-5 max-w-prose text-sm leading-6">
      Estes valores são estimados. Fibra, torção e estrutura do fio podem mudar o
      resultado; confira e faça a amostra (gauge) indicada pela receita antes de
      começar a peça.
    </p>
  )
}

export function ResultCard(props: ResultCardProps) {
  if (props.categoryRange) {
    const { category, metersPer100g, tex, transitionCategories } =
      props.categoryRange

    return (
      <section aria-labelledby="resultado-faixa-titulo" className={resultCardClass}>
        <p className="text-sm font-bold uppercase tracking-[0.18em]">
          Faixa aproximada para
        </p>
        <h2
          id="resultado-faixa-titulo"
          className="mt-2 text-4xl font-black tracking-tight sm:text-5xl"
        >
          {category.name}
        </h2>
        <p className="mt-2 text-lg font-bold">Categoria CYC {category.cyc}</p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-brand-cream p-4">
            <dt className="text-sm font-bold">Faixa aproximada de TEX</dt>
            <dd className="mt-1 text-2xl font-black">
              TEX {formatRange(tex)}
            </dd>
          </div>
          <div className="rounded-2xl bg-brand-cream p-4">
            <dt className="text-sm font-bold">Faixa aproximada de metros por 100 g</dt>
            <dd className="mt-1 text-2xl font-black">
              {formatRange(metersPer100g)} m
            </dd>
          </div>
          <HookRecommendation category={category} />
        </dl>

        <div className="mt-4 rounded-2xl border-2 border-brand-charcoal bg-brand-lilac p-4">
          <p className="font-black">Zonas de transição</p>
          <p className="mt-1 text-sm leading-6">
            Nas bordas desta faixa, o fio também pode se comportar como{' '}
            {categoryList(transitionCategories)}. Compare a etiqueta e a amostra —
            a categoria não é uma equivalência absoluta.
          </p>
        </div>

        <EstimateNotice />
      </section>
    )
  }

  const { result } = props

  return (
    <section aria-labelledby="resultado-titulo" className={resultCardClass}>
      <p className="text-sm font-bold uppercase tracking-[0.18em]">
        Seu fio provavelmente é
      </p>
      <h2
        id="resultado-titulo"
        className="mt-2 text-4xl font-black tracking-tight sm:text-5xl"
      >
        {result.category.name}
      </h2>
      <p className="mt-2 text-lg font-bold">Categoria CYC {result.category.cyc}</p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-cream p-4">
          <dt className="text-sm font-bold">TEX estimado</dt>
          <dd className="mt-1 text-2xl font-black">{Math.round(result.tex)}</dd>
        </div>
        <div className="rounded-2xl bg-brand-cream p-4">
          <dt className="text-sm font-bold">Metros por 100 g</dt>
          <dd className="mt-1 text-2xl font-black">
            {Math.round(result.metersPer100g)} m
          </dd>
        </div>
        <HookRecommendation category={result.category} />
      </dl>

      {result.transitionCategories.length > 0 ? (
        <div className="mt-4 rounded-2xl border-2 border-brand-charcoal bg-brand-lilac p-4">
          <p className="font-black">Zona de transição</p>
          <p className="mt-1 text-sm leading-6">
            Este valor está perto de {categoryList(result.transitionCategories)}.
            Confira a amostra antes de escolher o fio.
          </p>
        </div>
      ) : null}

      <EstimateNotice />
    </section>
  )
}
