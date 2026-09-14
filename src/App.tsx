import { Header } from './components/Header'
import { YarnConverter } from './components/YarnConverter'

function App() {
  return (
    <div id="top" className="min-h-screen overflow-hidden bg-brand-cream text-brand-charcoal">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-xl bg-brand-charcoal px-4 py-3 font-bold text-brand-cream outline-none transition focus:translate-y-0 focus:ring-4 focus:ring-brand-pink"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="main-content">
        <section className="relative isolate">
          <div aria-hidden="true" className="absolute -right-20 top-12 -z-10 h-72 w-72 rounded-full bg-brand-lilac/70 blur-2xl sm:h-96 sm:w-96" />
          <div aria-hidden="true" className="absolute -left-24 top-72 -z-10 h-64 w-64 rounded-full bg-brand-pink/45 blur-2xl" />

          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border-2 border-brand-charcoal bg-brand-green px-4 py-2 text-sm font-black">
                Feito para quem usa fios brasileiros
              </p>
              <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Qual fio brasileiro combina com a sua receita?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
                Converta TEX, peso e metragem para categorias usadas em receitas internacionais, como DK, Worsted e Sport.
              </p>
            </div>

            <div className="mt-10 sm:mt-12">
              <YarnConverter />
            </div>
          </div>
        </section>

        <section id="como-funciona" className="bg-brand-pink">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.18em]">Como funciona</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Da etiqueta para uma linguagem que a receita entende.</h2>
            </div>

            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ['1', 'Veja a etiqueta', 'Encontre o TEX ou o peso e a metragem do novelo.'],
                ['2', 'Digite os dados', 'A ferramenta normaliza as informações para metros por 100 g.'],
                ['3', 'Compare a categoria', 'Você recebe uma estimativa de categoria e os números usados no cálculo.'],
              ].map(([number, title, text]) => (
                <li key={number} className="rounded-[2rem] border-2 border-brand-charcoal bg-brand-cream p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-lilac text-lg font-black" aria-hidden="true">
                    {number}
                  </span>
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-2 leading-7">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="bg-brand-charcoal text-brand-cream">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm sm:px-6 lg:px-8">
          <p className="font-bold">Crochê Conversor — base inicial do projeto.</p>
          <p className="max-w-2xl text-brand-cream/80">
            As categorias exibidas no protótipo são estimativas preliminares e serão calibradas antes do lançamento.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
