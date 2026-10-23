import { useEffect, useState } from 'react'
import { getRecipe } from '../api/recipeApi'
import type { Recipe } from '../domain/Recipe'
import { useRecipes } from '../contexts/RecipesContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { useNavigate } from '../../../app/router-context'
import { useParams } from '@tanstack/react-router'
import { Header } from '../../../layouts/Header'

export function RecipeDetailPage() {
  const { recipeId } = useParams({ from: '/_layout/recipe/$recipeId' })
  const id = Number(recipeId)
  const { recipes, loading } = useRecipes()
  const { favorites, toggleFavorite } = useFavorites()
  const navigate = useNavigate()
  const [remote, setRemote] = useState<Recipe | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    if (!recipes.some((r) => r.id === id)) {
      getRecipe(id)
        .then((r) => {
          if (active) setRemote(r)
        })
        .catch(() => {
          if (active) setFailed(true)
        })
    }
    return () => {
      active = false
    }
  }, [id, recipes])

  const recipe = recipes.find((r) => r.id === id) || remote

  if (loading && !recipe)
    return (
      <div className="p-6 text-center text-on-surface-variant">
        Chargement de la recette…
      </div>
    )

  if (!recipe)
    return (
      <div className="p-6 text-center text-on-surface-variant">
        {failed ? (
          <>
            <p role="alert">Recette introuvable.</p>
            <button
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-on-primary"
              onClick={() => {
                setFailed(false)
                void getRecipe(id)
                  .then(setRemote)
                  .catch(() => setFailed(true))
              }}
            >
              Réessayer
            </button>
          </>
        ) : (
          <p role="status">Chargement de la recette…</p>
        )}
        <div>
          <button
            className="mt-4 bg-primary text-white px-4 py-1.5 rounded-full"
            onClick={() => navigate('/')}
          >
            Retour au fil
          </button>
        </div>
      </div>
    )

  return (
    <>
      <Header title="Détail de la recette" showTabs={false} backHref="/" />
      <article className="p-4 border-b border-outline">
        <button
          className="mb-4 flex items-center gap-2 text-muted hover:text-on-surface-display"
          onClick={() => navigate('/')}
        >
          <span>←</span> Retour au fil
        </button>
        <div className="flex gap-3 mb-4">
          <img
            alt={`Plat de ${recipe.name}`}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-outline"
            src={recipe.image}
          />
          <div>
            <h1 className="font-bold text-xl text-on-surface-display font-serif">
              {recipe.name}
            </h1>
            <p className="text-muted text-sm">
              {recipe.cuisine} · {recipe.difficulty} · ★ {recipe.rating} ·{' '}
              {recipe.reviewCount} avis
            </p>
          </div>
        </div>
        <img
          alt={`Plat de ${recipe.name}`}
          className="w-full rounded-2xl mb-4 object-cover"
          src={recipe.image}
        />
        <div className="mb-4">
          <p className="text-on-surface-display mb-2">
            <strong>Préparation :</strong> {recipe.prepTimeMinutes} min ·{' '}
            <strong>Cuisson :</strong> {recipe.cookTimeMinutes} min ·{' '}
            <strong>Portions :</strong> {recipe.servings}
          </p>
          <p className="text-on-surface-display mb-2">
            <strong>Calories :</strong> {recipe.caloriesPerServing} kcal /
            portion
          </p>
          <button
            className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-full shadow-sm"
            onClick={() => toggleFavorite(recipe.id)}
          >
            {favorites.includes(recipe.id)
              ? '♥ Dans mon carnet'
              : '♡ Ajouter au carnet'}
          </button>
        </div>
        <section className="mb-4">
          <h2 className="font-bold text-lg text-on-surface-display font-serif mb-2">
            Ingrédients
          </h2>
          <ul className="list-disc list-inside text-on-surface-display space-y-1">
            {recipe.ingredients.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-lg text-on-surface-display font-serif mb-2">
            Préparation
          </h2>
          <ol className="list-decimal list-inside text-on-surface-display space-y-2">
            {recipe.instructions.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ol>
        </section>
      </article>
    </>
  )
}
