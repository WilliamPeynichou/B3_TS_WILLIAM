import { useCallback } from 'react'
import { createRecipe } from '../api/recipeApi'
import type { CreateRecipePayload } from '../api/recipeApi'
import type { Recipe } from '../domain/Recipe'

export function useCreateRecipe(
  setRecipes: (update: (recipes: Recipe[]) => Recipe[]) => void,
) {
  return useCallback(
    async (payload: CreateRecipePayload) => {
      const recipe = await createRecipe(payload)
      setRecipes((current) => [recipe, ...current])
      return recipe
    },
    [setRecipes],
  )
}
