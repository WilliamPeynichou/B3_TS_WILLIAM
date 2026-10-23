import { useCallback, useEffect, useState } from 'react'
import { createRecipe, getRecipes } from '../api/recipeApi'
import type { CreateRecipePayload } from '../api/recipeApi'
import type { Recipe } from '../domain/Recipe'

// Une seule logique pour charger les recettes et réessayer en cas d'erreur.
export function useRecipeData() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadRecipes = useCallback(() => {
    return getRecipes()
      .then(setRecipes)
      .catch((error: unknown) => {
        setError(
          error instanceof Error ? error.message : 'Une erreur est survenue.',
        )
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    void loadRecipes()
  }, [loadRecipes])

  function retry() {
    setLoading(true)
    setError('')
    void loadRecipes()
  }

  async function addRecipe(payload: CreateRecipePayload) {
    const recipe = await createRecipe(payload)
    setRecipes((current) => [recipe, ...current])
    return recipe
  }

  return { recipes, loading, error, retry, addRecipe }
}
