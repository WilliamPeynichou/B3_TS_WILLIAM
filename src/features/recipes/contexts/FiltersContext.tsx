import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { RecipeFilters } from '../domain/Recipe'

type Value = {
  filters: RecipeFilters
  setFilters: (filters: RecipeFilters) => void
}
const Context = createContext<Value | null>(null)
export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<RecipeFilters>({
    search: '',
    cuisine: '',
    difficulty: '',
  })
  const value = useMemo(() => ({ filters, setFilters }), [filters])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useFilters() {
  const value = useContext(Context)
  if (!value) throw new Error('FiltersProvider manquant')
  return value
}
export const useRecipeFilters = useFilters
