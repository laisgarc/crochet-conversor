export function Header() {
  return (
    <header className="border-b border-brand-charcoal/10 bg-brand-cream/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="rounded-xl text-lg font-black tracking-tight text-brand-charcoal outline-none focus-visible:ring-4 focus-visible:ring-brand-lilac"
        >
          Crochê Conversor
        </a>
        <a
          href="#como-funciona"
          className="rounded-xl px-3 py-2 text-sm font-bold underline decoration-2 underline-offset-4 outline-none hover:no-underline focus-visible:ring-4 focus-visible:ring-brand-lilac"
        >
          Como funciona
        </a>
      </div>
    </header>
  )
}
