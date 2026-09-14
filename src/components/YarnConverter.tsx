import { FormEvent, useId, useState } from 'react'
import { resultFromLabel, resultFromTex } from '../domain/yarn/converters'
import type { YarnResult } from '../domain/yarn/types'
import { ResultCard } from './ResultCard'

type InputMode = 'tex' | 'label'

const numberInputClass =
  'mt-2 min-h-12 w-full rounded-2xl border-2 border-brand-charcoal bg-brand-cream px-4 py-3 text-lg font-bold outline-none transition focus-visible:ring-4 focus-visible:ring-brand-lilac disabled:cursor-not-allowed disabled:opacity-60'

export function YarnConverter() {
  const [mode, setMode] = useState<InputMode>('tex')
  const [tex, setTex] = useState('')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')
  const [result, setResult] = useState<YarnResult | null>(null)
  const [error, setError] = useState('')

  const texId = useId()
  const weightId = useId()
  const lengthId = useId()
  const errorId = useId()

  function handleModeChange(nextMode: InputMode) {
    setMode(nextMode)
    setResult(null)
    setError('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    try {
      if (mode === 'tex') {
        const value = Number(tex.replace(',', '.'))
        setResult(resultFromTex(value))
        return
      }

      const weightValue = Number(weight.replace(',', '.'))
      const lengthValue = Number(length.replace(',', '.'))
      setResult(resultFromLabel(weightValue, lengthValue))
    } catch (caughtError) {
      setResult(null)
      setError(caughtError instanceof Error ? caughtError.message : 'Confira os valores informados.')
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-start">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border-2 border-brand-charcoal bg-white/70 p-5 shadow-[6px_6px_0_0_#2D2D2D] sm:p-8"
        aria-describedby={error ? errorId : undefined}
      >
        <fieldset>
          <legend className="text-xl font-black sm:text-2xl">O que aparece na etiqueta do seu fio?</legend>
          <p className="mt-2 max-w-prose text-sm leading-6">
            Você pode usar o TEX ou informar o peso e a metragem do novelo.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-brand-lilac p-1.5" role="radiogroup" aria-label="Tipo de informação disponível">
            <label className="cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                name="input-mode"
                value="tex"
                checked={mode === 'tex'}
                onChange={() => handleModeChange('tex')}
              />
              <span className="flex min-h-11 items-center justify-center rounded-xl px-3 py-2 text-center font-black outline-none peer-checked:bg-brand-charcoal peer-checked:text-brand-cream peer-focus-visible:ring-4 peer-focus-visible:ring-brand-pink">
                Tenho o TEX
              </span>
            </label>
            <label className="cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                name="input-mode"
                value="label"
                checked={mode === 'label'}
                onChange={() => handleModeChange('label')}
              />
              <span className="flex min-h-11 items-center justify-center rounded-xl px-3 py-2 text-center font-black outline-none peer-checked:bg-brand-charcoal peer-checked:text-brand-cream peer-focus-visible:ring-4 peer-focus-visible:ring-brand-pink">
                Peso + metragem
              </span>
            </label>
          </div>
        </fieldset>

        {mode === 'tex' ? (
          <div className="mt-6">
            <label htmlFor={texId} className="font-black">
              TEX
            </label>
            <p id={`${texId}-hint`} className="mt-1 text-sm">
              Ex.: 400. TEX indica quantos gramas pesam 1.000 metros do fio.
            </p>
            <input
              id={texId}
              className={numberInputClass}
              inputMode="decimal"
              type="text"
              value={tex}
              onChange={(event) => setTex(event.target.value)}
              aria-describedby={`${texId}-hint`}
              placeholder="400"
              autoComplete="off"
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={weightId} className="font-black">
                Peso do novelo
              </label>
              <div className="relative">
                <input
                  id={weightId}
                  className={`${numberInputClass} pr-14`}
                  inputMode="decimal"
                  type="text"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  placeholder="100"
                  autoComplete="off"
                />
                <span className="pointer-events-none absolute bottom-3.5 right-4 font-black" aria-hidden="true">
                  g
                </span>
              </div>
            </div>
            <div>
              <label htmlFor={lengthId} className="font-black">
                Metragem
              </label>
              <div className="relative">
                <input
                  id={lengthId}
                  className={`${numberInputClass} pr-14`}
                  inputMode="decimal"
                  type="text"
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                  placeholder="250"
                  autoComplete="off"
                />
                <span className="pointer-events-none absolute bottom-3.5 right-4 font-black" aria-hidden="true">
                  m
                </span>
              </div>
            </div>
          </div>
        )}

        {error ? (
          <p id={errorId} role="alert" className="mt-5 rounded-2xl border-2 border-brand-charcoal bg-brand-peach p-4 font-bold">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-6 min-h-12 w-full rounded-2xl border-2 border-brand-charcoal bg-brand-pink px-5 py-3 text-lg font-black shadow-[4px_4px_0_0_#2D2D2D] outline-none transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#2D2D2D] focus-visible:ring-4 focus-visible:ring-brand-lilac active:translate-y-0 active:shadow-[2px_2px_0_0_#2D2D2D] sm:w-auto"
        >
          Descobrir categoria
        </button>
      </form>

      <div className="lg:sticky lg:top-6">
        {result ? (
          <ResultCard result={result} />
        ) : (
          <aside className="rounded-[2rem] bg-brand-lilac p-6 sm:p-8" aria-label="Ajuda sobre o resultado">
            <p className="text-sm font-bold uppercase tracking-[0.18em]">Resultado</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">A categoria aparece aqui ✨</h2>
            <p className="mt-4 max-w-prose leading-7">
              Vamos normalizar o fio em metros por 100 g e estimar se ele está mais próximo de Lace, Fingering, Sport, DK, Worsted, Bulky ou outra categoria.
            </p>
          </aside>
        )}
      </div>
    </div>
  )
}
