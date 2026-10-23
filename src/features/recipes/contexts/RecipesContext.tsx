import { createContext, useContext, type ReactNode } from 'react'
import { useRecipeData } from '../hooks/useRecipeData'

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
  const recipes = useRecipeData()
  return (
    <RecipesContext.Provider value={recipes}>
      {children}
    </RecipesContext.Provider>
  )
}

export function useRecipes() {
  const recipes = useContext(RecipesContext)
  if (!recipes) throw new Error('RecipesProvider manquant')
  return recipes
}
