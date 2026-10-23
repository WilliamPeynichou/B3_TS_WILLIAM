import { useCallback, useEffect, useState } from 'react'
import { getRecipes } from '../api/recipeApi'
import type { Recipe } from '../domain/Recipe'

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

  return { recipes, loading, error, retry, setRecipes }
}
