import { Button } from '../../../components/ui'
import { Header } from '../../../layouts/Header'
import { useMemo, useState } from 'react'
import { useFilters } from '../contexts/FiltersContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { useRecipes } from '../contexts/RecipesContext'
import type { Recipe } from '../domain/Recipe'
import { Link, useNavigate } from '../../../app/router-context'
import { RecipeFilters } from '../components/RecipeFilters'
import { FavoritesTimeline } from '../components/FavoritesTimeline'

const PAGE_SIZE = 12
const buttonClass =
  'rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-50'

function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  const { favorites, toggleFavorite } = useFavorites()
  const navigate = useNavigate()

  return (
    <div className="divide-y divide-outline-variant">
      {recipes.map((recipe) => (
        <article
          className="relative bg-surface p-4 transition hover:bg-surface-container-low sm:p-5"
          key={recipe.id}
        >
          <div className="flex items-center gap-3 pr-10">
            <img
              className="h-11 w-11 shrink-0 rounded-full object-cover"
              src={recipe.image}
              alt={`Plat de ${recipe.name}`}
              loading="lazy"
            />
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <strong className="text-on-surface">Recette partagée</strong>
              <span className="rounded-full bg-tertiary-container/30 px-2 py-0.5 text-xs font-semibold">
                {recipe.difficulty}
              </span>
              <span className="rounded-full bg-tertiary-container/30 px-2 py-0.5 text-xs font-semibold">Hello World</span>
              <span className="text-on-surface-variant">{recipe.cuisine}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="absolute right-5 top-5 px-2 py-1 text-2xl leading-none"
            aria-label={
              favorites.includes(recipe.id)
                ? 'Retirer des favoris'
                : 'Ajouter aux favoris'
            }
            onClick={() => toggleFavorite(recipe.id)}
          >
            {favorites.includes(recipe.id) ? '♥' : '♡'}
          </Button>

            <Button
              variant="ghost"
              className="mt-3 grid w-full gap-3 rounded-none px-0 py-0 text-left font-normal sm:grid-cols-[1fr_180px]"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          >
            <div>
              <h3 className="font-serif text-xl font-semibold text-on-surface">
                {recipe.name}
              </h3>
              <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                {recipe.ingredients.slice(0, 4).join(', ')}…
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">
                {recipe.cuisine} · {recipe.difficulty} · {recipe.servings}{' '}
                portions
              </p>
              <p> 
              Hello World 
              </p>
              <p className="mt-1 text-sm text-on-surface-variant">
                ★ {recipe.rating ?? '—'} ·{' '}
                {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
              </p>
            </div>
            <img
              className="h-44 w-full rounded-xl object-cover sm:h-32"
              src={recipe.image}
              alt={`Plat de ${recipe.name}`}
              loading="lazy"
            />
            </Button>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-3 text-sm text-on-surface-variant">
            <Link
              className="font-semibold text-primary hover:underline"
              href={`/recipe/${recipe.id}`}
            >
              ☷ Voir la recette
            </Link>
            <span>★ {recipe.reviewCount ?? 0} avis</span>
            <Button
              variant="ghost"
              className="font-semibold text-secondary hover:underline"
              aria-pressed={favorites.includes(recipe.id)}
              onClick={() => toggleFavorite(recipe.id)}
            >
              {favorites.includes(recipe.id)
                ? '♥ Sauvegardée'
                : '♡ Sauvegarder'}
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}

export function RecipesPage({
  favoritesOnly = false,
}: {
  favoritesOnly?: boolean
}) {
  const { recipes, loading, error, retry } = useRecipes()
  const { favorites } = useFavorites()
  const { filters } = useFilters()
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const items = useMemo(
    () =>
      recipes.filter((recipe) => {
        const text = [recipe.name, ...recipe.ingredients, ...recipe.tags]
          .join(' ')
          .toLowerCase()
        const matchesFavorite = !favoritesOnly || favorites.includes(recipe.id)
        const matchesSearch = text.includes(filters.search.toLowerCase())
        const matchesCuisine =
          !filters.cuisine || recipe.cuisine === filters.cuisine
        const matchesDifficulty =
          !filters.difficulty || recipe.difficulty === filters.difficulty
        return (
          matchesFavorite &&
          matchesSearch &&
          matchesCuisine &&
          matchesDifficulty
        )
      }),
    [recipes, favoritesOnly, favorites, filters],
  )

  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const shown = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <Header title={favoritesOnly ? 'Mon carnet' : 'Le Fil des Casseroles'} />
      {!favoritesOnly && (
        <>
          <section className="flex gap-3 border-b border-outline-variant bg-surface p-4 sm:p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-lg font-bold text-on-primary">
              M
            </span>
            <div className="min-w-0 flex-1">
              <Link
                className="block rounded-lg border border-outline-variant px-4 py-3 text-on-surface-variant hover:bg-surface-container-low"
                href="/create"
              >
                Qu’est-ce qui mijote dans votre cuisine ?
              </Link>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container">
                  Une recette à transmettre
                </span>
                <Button
                  className="rounded-lg px-4 py-2 text-sm"
                  onClick={() => navigate('/create')}
                >
                  ＋ Mijoter
                </Button>
              </div>
            </div>
          </section>
          <RecipeFilters reset={() => setPage(1)} />
        </>
      )}
      <section>
        <h2 className="border-b border-outline-variant bg-surface px-4 py-4 font-serif text-xl font-semibold text-on-surface">
          {favoritesOnly ? 'Mon carnet' : 'À la table'}
        </h2>
        {loading ? (
          <p className="p-6 text-center text-on-surface-variant" role="status">
            Les recettes mijotent…
          </p>
        ) : error ? (
          <div className="p-6 text-center text-on-surface-variant" role="alert">
            <p>{error}</p>
            <Button
              variant="secondary"
              className={`${buttonClass} mt-3`}
              onClick={retry}
            >
              Réessayer
            </Button>
          </div>
        ) : shown.length === 0 ? (
          <p className="p-6 text-center text-on-surface-variant">
            {favoritesOnly
              ? 'Votre carnet est encore vide. Sauvegardez une recette pour la retrouver ici.'
              : 'Aucune recette ne correspond à votre recherche.'}
          </p>
        ) : (
          <>
            {favoritesOnly ? (
              <FavoritesTimeline recipes={shown} />
            ) : (
              <RecipeGrid recipes={shown} />
            )}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant bg-surface p-4">
              <Button
                variant="secondary"
                className={buttonClass}
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                ← Précédent
              </Button>
              <span className="text-sm text-on-surface-variant">
                Page {page} sur {pages}
              </span>
              <Button
                variant="secondary"
                className={buttonClass}
                disabled={page >= pages}
                onClick={() => setPage(page + 1)}
              >
                Suivant →
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export const FavoritesPage = () => <RecipesPage favoritesOnly />
