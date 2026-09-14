import type { YarnResult } from '../domain/yarn/types'

type ResultCardProps = {
  result: YarnResult
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <section
      aria-live="polite"
      aria-labelledby="resultado-titulo"
      className="rounded-[2rem] border-2 border-brand-charcoal bg-brand-green p-6 shadow-[6px_6px_0_0_#2D2D2D] sm:p-8"
    >
      <p className="text-sm font-bold uppercase tracking-[0.18em]">Seu fio provavelmente é</p>
      <h2 id="resultado-titulo" className="mt-2 text-5xl font-black tracking-tight sm:text-6xl">
        {result.category.name}
      </h2>
      <p className="mt-2 text-lg font-bold">CYC {result.category.cyc}</p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-cream p-4">
          <dt className="text-sm font-bold">TEX estimado</dt>
          <dd className="mt-1 text-2xl font-black">{Math.round(result.tex)}</dd>
        </div>
        <div className="rounded-2xl bg-brand-cream p-4">
          <dt className="text-sm font-bold">Metros por 100 g</dt>
          <dd className="mt-1 text-2xl font-black">{Math.round(result.metersPer100g)} m</dd>
        </div>
      </dl>

      <p className="mt-5 max-w-prose text-sm leading-6">
        Esta é uma estimativa inicial. Fibra, torção, estrutura do fio e tensão do ponto podem mudar o comportamento na peça. Faça uma amostra antes de substituir o fio de uma receita.
      </p>
    </section>
  )
}
