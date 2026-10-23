import type { Recipe } from '../domain/Recipe'

type RecipeResponse = {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}
const API = 'https://dummyjson.com/recipes'

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API}?limit=0`)
  if (!response.ok)
    throw new Error(
      'Impossible de récupérer les recettes. Vérifiez votre connexion.',
    )
  return ((await response.json()) as RecipeResponse).recipes
}

export async function getRecipe(id: number): Promise<Recipe> {
  const response = await fetch(`${API}/${id}`)
  if (!response.ok) throw new Error('Cette recette est introuvable.')
  return (await response.json()) as Recipe
}

export type CreateRecipePayload = Pick<
  Recipe,
  | 'name'
  | 'ingredients'
  | 'instructions'
  | 'prepTimeMinutes'
  | 'cookTimeMinutes'
  | 'servings'
  | 'difficulty'
  | 'cuisine'
  | 'image'
  | 'tags'
  | 'mealType'
>
export async function createRecipe(
  payload: CreateRecipePayload,
): Promise<Recipe> {
  const response = await fetch(`${API}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, userId: 1 }),
  })
  if (!response.ok)
    throw new Error('La recette n’a pas pu être publiée. Réessayez.')
  return (await response.json()) as Recipe
}
