import { Link } from '../../../app/router-context'
import { useFavorites } from '../contexts/FavoritesContext'
import type { Recipe } from '../domain/Recipe'

export function FavoritesTimeline({ recipes }: { recipes: Recipe[] }) {
  const { toggleFavorite } = useFavorites()

  return (
    <ol className="relative mx-4 my-5 border-s border-outline-variant sm:mx-6">
      {recipes.map((recipe) => (
        <li className="relative pb-6 ps-7 last:pb-0" key={recipe.id}>
          <span
            aria-hidden="true"
            className="absolute -start-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-primary ring-4 ring-surface"
          />
          <article className="rounded-xl border border-outline-variant/70 bg-surface-container-low p-4 shadow-sm transition hover:bg-surface-container sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img
                className="h-32 w-full rounded-lg object-cover sm:h-24 sm:w-32"
                src={recipe.image}
                alt={`Plat de ${recipe.name}`}
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                  {recipe.cuisine} · {recipe.difficulty}
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-on-surface">
                  <Link
                    className="rounded-sm hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    href={`/recipe/${recipe.id}`}
                  >
                    {recipe.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                  {recipe.ingredients.slice(0, 4).join(', ')}…
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  ★ {recipe.rating ?? '—'} ·{' '}
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min ·{' '}
                  {recipe.servings} portions
                </p>
              </div>
              <button
                className="shrink-0 self-start rounded-lg border border-outline-variant px-3 py-2 text-sm font-semibold text-on-surface-variant transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:self-center"
                aria-label={`Retirer ${recipe.name} des favoris`}
                onClick={() => toggleFavorite(recipe.id)}
              >
                Retirer le signet
              </button>
            </div>
          </article>
        </li>
      ))}
    </ol>
  )
}
