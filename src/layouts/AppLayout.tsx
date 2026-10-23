import type { ReactNode } from 'react'
import { Link } from '../app/router-context'
import { useFilters } from '../features/recipes/contexts/FiltersContext'
import { Footer } from './Footer'
import { useRecipes } from '../features/recipes/contexts/RecipesContext'

export function Sidebar() {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-30 flex h-16 shrink-0 flex-col justify-center border-t border-outline bg-surface px-3 py-2 md:sticky md:inset-auto md:top-0 md:h-screen md:w-[88px] md:justify-between md:border-r md:border-t-0 md:py-3 xl:w-[275px] xl:px-4">
      <div className="flex flex-col gap-1 items-center xl:items-stretch w-full">
        <Link
          className="hidden md:flex items-center gap-3 p-3 w-fit rounded-full hover:bg-surface-raised transition-colors group"
          href="/"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9c340b] to-[#BD4B23] flex items-center justify-center shadow-md shadow-[#BD4B23]/20 group-hover:scale-105 transition-transform">
            <span className="text-white text-[24px]">🍲</span>
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none text-on-surface-display font-serif">
              La Tablée
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-muted uppercase mt-0.5">
              Réseau Culinaire
            </span>
          </div>
        </Link>
        <nav className="flex flex-row justify-around md:flex-col gap-1 w-full">
          <Link
            className="flex items-center gap-4 p-3 rounded-full bg-surface-raised transition-colors text-primary font-bold text-[18px] group"
            href="/"
          >
            <span
              className="text-[26px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              🍲
            </span>
            <span className="hidden xl:inline font-bold">Le Fil</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 rounded-full hover:bg-surface-raised transition-colors text-on-surface hover:text-on-surface-display font-medium text-[18px] group"
            href="/favorites"
          >
            <span className="text-[26px] text-muted group-hover:text-primary transition-colors">
              🔖
            </span>
            <span className="hidden xl:inline">Mes Recettes & Signets</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 rounded-full hover:bg-surface-raised transition-colors text-on-surface hover:text-on-surface-display font-medium text-[18px] group"
            href="/create"
          >
            <span className="text-[26px] text-muted group-hover:text-primary transition-colors">
              ✍️
            </span>
            <span className="hidden xl:inline">Tours de Main</span>
          </Link>
        </nav>
        <Link
          className="hidden md:flex mt-4 w-12 h-12 xl:w-full xl:h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-full items-center justify-center shadow-md shadow-[#BD4B23]/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          href="/create"
        >
          <span className="xl:hidden">✍️</span>
          <span className="hidden xl:inline text-[16px] tracking-wide">
            + Mijoter une recette
          </span>
        </Link>
        <div className="hidden md:flex p-2.5 w-full rounded-full hover:bg-surface-raised transition-colors cursor-pointer items-center justify-between group border border-transparent hover:border-outline">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9c340b] to-[#BD4B23] flex items-center justify-center shadow-md shadow-[#BD4B23]/20">
              <span className="text-white text-[20px]">👤</span>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="font-bold text-[15px] text-on-surface-display leading-tight flex items-center gap-1">
                Utilisateur
                <span
                  className="text-[15px] text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  🔥
                </span>
              </span>
              <span className="text-muted text-[13px] leading-tight">
                @utilisateur
              </span>
            </div>
          </div>
          <span className="hidden xl:block text-muted group-hover:text-on-surface-display">
            ⋯
          </span>
        </div>
      </div>
    </aside>
  )
}

export function DiscoveryPanel() {
  const { recipes } = useRecipes()
  const { filters, setFilters } = useFilters()
  const cuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))].slice(
    0,
    4,
  )
  return (
    <aside className="sticky top-0 hidden h-screen w-[350px] shrink-0 flex-col gap-4 overflow-y-auto bg-surface px-5 py-3 lg:flex">
      <label className="relative block">
        <span className="sr-only">Rechercher une recette</span>
        <span
          aria-hidden="true"
          className="absolute left-3.5 top-2.5 text-muted"
        >
          ⌕
        </span>
        <input
          className="w-full rounded-full border border-outline bg-surface-card py-2.5 pl-10 pr-4 text-sm text-on-surface-display placeholder-[#9E9088] focus:border-[#BD4B23] focus:outline-none focus:ring-2 focus:ring-[#BD4B23]/20"
          placeholder="Rechercher un plat, un ingrédient…"
          type="search"
          value={filters.search}
          onChange={(event) =>
            setFilters({ ...filters, search: event.target.value })
          }
        />
      </label>
      <section className="rounded-2xl border border-outline bg-surface-card p-4 shadow-sm">
        <h2 className="mb-3 font-serif text-lg font-bold text-on-surface-display">
          Tendances aux fourneaux
        </h2>
        <div className="divide-y divide-outline">
          {cuisines.map((cuisine) => {
            const count = recipes.filter(
              (recipe) => recipe.cuisine === cuisine,
            ).length
            return (
              <button
                key={cuisine}
                onClick={() => setFilters({ ...filters, cuisine })}
                className="block w-full py-2.5 text-left hover:bg-surface"
                aria-label={`Filtrer par cuisine ${cuisine}`}
              >
                <span className="block text-xs text-muted">
                  Cuisine présente dans le catalogue
                </span>
                <span className="mt-0.5 block font-bold text-on-surface-display">
                  #{cuisine}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {count} recettes dans le catalogue
                </span>
              </button>
            )
          })}
        </div>
      </section>
      <section className="rounded-2xl border border-outline bg-surface-card p-4 shadow-sm">
        <h2 className="mb-2 font-serif text-lg font-bold text-on-surface-display">
          Cuisiniers & artisans
        </h2>
        <p className="text-sm leading-6 text-on-surface">
          La communauté artisanale arrive bientôt. Les recettes affichées
          proviennent du catalogue DummyJSON.
        </p>
        <span className="mt-3 inline-flex rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-muted">
          Espace de démonstration
        </span>
      </section>
      <section className="rounded-2xl border border-outline bg-gradient-to-b bg-surface-subtle p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          Défi communautaire · démonstration
        </p>
        <h2 className="mt-1 font-serif text-base font-bold text-on-surface-display">
          La soupe qui répare les lundis brumeux
        </h2>
        <p className="mt-2 text-sm leading-5 text-on-surface">
          Un thème pour cuisiner et partager vos idées. Les participations et
          compteurs communautaires ne sont pas disponibles dans cette version.
        </p>
      </section>
    </aside>
  )
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1280px] mx-auto min-h-screen flex justify-center pb-20 md:pb-0">
      <Sidebar />
      <main className="w-full min-w-0 max-w-[620px] min-h-screen border-r border-outline bg-surface-card flex flex-col">
        {children}
        <Footer />
      </main>
      <DiscoveryPanel />
    </div>
  )
}
