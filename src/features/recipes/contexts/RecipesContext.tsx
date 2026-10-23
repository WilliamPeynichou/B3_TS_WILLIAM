import { createContext, useContext, type ReactNode } from 'react'
import { useRecipeData } from '../hooks/useRecipeData'
import { useCreateRecipe } from '../hooks/useCreateRecipe'

import type { Recipe } from '../domain/Recipe'
import type { CreateRecipePayload } from '../api/recipeApi'

// Le contexte décrit simplement les données et actions partagées avec les pages.
type RecipesContextValue = {
  recipes: Recipe[]
  loading: boolean
  error: string
  retry: () => void
  addRecipe: (payload: CreateRecipePayload) => Promise<Recipe>
}

const RecipesContext = createContext<RecipesContextValue | null>(null)

export function RecipesProvider({ children }: { children: ReactNode }) {
  const data = useRecipeData()
  const addRecipe = useCreateRecipe(data.setRecipes)
  const value = { recipes: data.recipes, loading: data.loading, error: data.error, retry: data.retry, addRecipe }
  return (
    <RecipesContext.Provider value={value}>
      {children}
    </RecipesContext.Provider>
  )
}

export function useRecipes() {
  const recipes = useContext(RecipesContext)
  if (!recipes) throw new Error('RecipesProvider manquant')
  return recipes
}
